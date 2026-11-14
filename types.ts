export enum AgeGroup {
  YOUNG = '18-25',
  MIDDLE = '35-45',
  MATURE = '45+',
}

export enum Ethnicity {
  WHITE = 'White',
  BLACK = 'Black',
  ASIAN = 'Asian',
  MIXED = 'Mixed',
  OTHER = 'Other',
}

export interface FormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  ageGroup: AgeGroup | '';
  ethnicity: Ethnicity | '';
  
  // Physical Characteristics
  measurements: {
    height: string;
    weight: string;
    hairColour: string;
    eyeColour: string;
    skinTone: string;
  };

  // Skills & Experience
  experience: string;
  castingRole: string;
  drivingLicense: boolean;
  ownCar: boolean;

  // Availability
  availableFromDate: string;
  
  // Content Comfort
  contentComfort: {
    nude: boolean;
    underwear: boolean;
    violent: boolean;
    romantic: boolean;
    alcohol: boolean;
  };

  // Portfolio Files
  portfolio: {
    headshot: File[];
    fullBody: File[];
    profileVideo: File[];
  };

  additionalInfo: string;
  termsAccepted: boolean;
}

export type UploadProgress = {
  [key in keyof FormData['portfolio']]?: number;
};

export const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  ageGroup: '',
  ethnicity: '',
  
  measurements: {
    height: '',
    weight: '',
    hairColour: '',
    eyeColour: '',
    skinTone: '',
  },

  experience: '',
  castingRole: '',
  drivingLicense: false,
  ownCar: false,

  availableFromDate: '',
  
  contentComfort: {
    nude: false,
    underwear: false,
    violent: false,
    romantic: false,
    alcohol: false,
  },

  portfolio: {
    headshot: [],
    fullBody: [],
    profileVideo: [],
  },

  additionalInfo: '',
  termsAccepted: false,
};