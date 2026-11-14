import React, { useState, useCallback } from 'react';

interface FileUploadProps {
  label: string;
  accept: string;
  multiple: boolean;
  files: File[];
  onFilesSelect: (files: File[]) => void;
  progress?: number;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ 
  label, 
  accept, 
  multiple, 
  files, 
  onFilesSelect, 
  progress, 
  disabled = false 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  React.useEffect(() => {
    const newPreviews: string[] = [];
    if (files.length === 0) {
      setPreviews([]);
      return;
    }

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === files.length) {
            setPreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }, [files]);

  const handleFileChange = (newFiles: FileList | null) => {
    if (newFiles) {
      const fileArray = Array.from(newFiles);
      if (multiple) {
        onFilesSelect([...files, ...fileArray]);
      } else {
        onFilesSelect(fileArray.slice(0, 1));
      }
    }
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(false);
  };
  
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [files, disabled, multiple]);

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesSelect(newFiles);
  };

  const inputId = `file-input-${Math.random()}`;

  return (
    <div className="w-full">
      <div
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-50' : 'cursor-pointer'}
          ${isDragging ? 'border-primary bg-blue-50 scale-105' : 'border-gray-300 hover:border-primary hover:bg-blue-50'}
        `}
        onClick={() => !disabled && document.getElementById(inputId)?.click()}
      >
        <input
          type="file"
          id={inputId}
          multiple={multiple}
          accept={accept}
          onChange={(e) => handleFileChange(e.target.files)}
          className="hidden"
          disabled={disabled}
        />
        <div className="flex flex-col items-center">
          <svg className="w-12 h-12 text-primary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <p className="text-sm text-text-light">
            <span className="font-semibold text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-400 mt-1">{label}</p>
        </div>
      </div>
      
      {progress !== undefined && progress > 0 && progress < 100 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gold h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{progress}% uploaded</p>
        </div>
      )}
      
      {files.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-text-primary mb-3">Files selected:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                {file.type.startsWith('image/') ? (
                  <img src={previews[index]} alt={file.name} className="w-full h-24 object-cover rounded-lg border-2 border-gray-200" />
                ) : (
                  <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center p-2 border-2 border-gray-200">
                    <div className="text-center">
                      <svg className="w-6 h-6 text-gray-400 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"></path>
                      </svg>
                      <p className="text-xs text-center break-all text-gray-600">{file.name}</p>
                    </div>
                  </div>
                )}
                {!disabled && (
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    title="Remove file"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};