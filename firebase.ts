import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, AuthError } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FormData } from './types';

const firebaseConfig = {
  apiKey: "AIzaSyCVm-Lo2zLSbFfX5deExD_ZS47NElFHg1Y",
  authDomain: "genlux-ai.firebaseapp.com",
  projectId: "genlux-ai",
  storageBucket: "genlux-ai.firebasestorage.app",
  messagingSenderId: "1072235208709",
  appId: "1:1072235208709:web:94d7d4d007da4798f03c6c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export class FirebaseConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FirebaseConfigError';
  }
}

export const initializeFirebaseAndAuth = async () => {
  try {
    if (!auth.currentUser) {
      await signInAnonymously(auth);
    }
  } catch (error) {
    const authError = error as AuthError;
    if (authError.code === 'auth/admin-restricted-operation') {
      console.error("Firebase Anonymous Sign-in is not enabled.", authError);
      throw new FirebaseConfigError(
        'Your Firebase project is not configured to allow anonymous sign-in. This is required for users to upload files without creating an account.'
      );
    }
    console.error("Anonymous sign-in failed:", authError);
    throw error;
  }
};

const transformDataForFirestore = (formData: FormData) => {
  return {
    aim: formData.aim,
    personalDetails: {
      fullName: formData.fullName,
      familyDetails: formData.familyDetails,
      maritalStatus: formData.maritalStatus,
      age: Number(formData.age),
    },
    costumeComfort: formData.costumeComfort,
    bodyMeasurements: {
      height: Number(formData.measurements.height),
      weight: Number(formData.measurements.weight),
      skinColour: formData.measurements.skinColour,
      bust: Number(formData.measurements.bust),
      waist: Number(formData.measurements.waist),
      hip: Number(formData.measurements.hip),
      backShape: formData.measurements.backShape,
      thighs: Number(formData.measurements.thighs),
      eyeColour: formData.measurements.eyeColour,
      hairColour: formData.measurements.hairColour,
    },
    dressCode: {
      ethnicWear: formData.dressCodePortfolio.ethnic,
      westernWear: formData.dressCodePortfolio.western,
      swimSuit: formData.dressCodePortfolio.swimSuit,
      bikini: formData.dressCodePortfolio.bikini,
      lingerie: formData.dressCodePortfolio.lingerie,
      shorts: formData.dressCodePortfolio.shorts,
    },
    sceneComfort: {
      emotionalScenes: formData.sceneComfort.emotional,
      dancing: formData.sceneComfort.dancing,
      onScreenKiss: formData.sceneComfort.kiss,
      onScreenSmooch: formData.sceneComfort.smooch,
      loveMaking: formData.sceneComfort.loveMaking,
      boldScene: formData.sceneComfort.bold,
    },
    additionalInfo: formData.additionalInfo,
    portfolioFiles: {}, // To be filled with URLs after upload
    status: "pending",
    timestamp: serverTimestamp(),
  };
};

const uploadFile = (file: File, path: string, onProgress: (progress: number) => void): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
      },
      (error) => {
        console.error(`Upload failed for ${path}`, error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
      }
    );
  });
};

type ProgressCallback = (field: keyof FormData['portfolio'], progress: number) => void;

export const submitApplication = async (formData: FormData, onProgress: ProgressCallback): Promise<string> => {
  const applicantRef = await addDoc(collection(db, 'applicants'), {
    status: 'uploading',
    timestamp: serverTimestamp(),
  });
  const applicantId = applicantRef.id;

  try {
    const transformedData = transformDataForFirestore(formData);
    const portfolioFiles: Record<string, string | string[]> = {};

    const allUploads = Object.entries(formData.portfolio).flatMap(([field, files]) =>
      files.map(file => ({ field: field as keyof FormData['portfolio'], file }))
    );

    const progressMap = new Map<File, number>();
    allUploads.forEach(({ file }) => progressMap.set(file, 0));

    const uploadPromises = allUploads.map(async ({ field, file }) => {
      const path = `applicants/${applicantId}/${field}/${Date.now()}_${file.name}`;
      const url = await uploadFile(file, path, (p) => {
        progressMap.set(file, p);

        const fieldFiles = formData.portfolio[field];
        const fieldProgress = fieldFiles.reduce((acc, f) => acc + (progressMap.get(f) || 0), 0) / fieldFiles.length;
        onProgress(field, fieldProgress);
      });
      return { field, url };
    });

    const results = await Promise.all(uploadPromises);

    results.forEach(({ field, url }) => {
      if (formData.portfolio[field].length === 1) {
        portfolioFiles[field] = url;
      } else {
        if (!portfolioFiles[field]) {
          portfolioFiles[field] = [];
        }
        (portfolioFiles[field] as string[]).push(url);
      }
    });

    transformedData.portfolioFiles = portfolioFiles;
    transformedData.status = 'pending';

    await updateDoc(doc(db, 'applicants', applicantId), transformedData);
    return applicantId;
  } catch (error) {
    console.error("Submission failed:", error);
    await updateDoc(doc(db, 'applicants', applicantId), { status: 'failed' });
    throw error;
  }
};