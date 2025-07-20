import React, { useCallback, useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string;
  onChange: (imageUrl: string | null) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  disabled = false,
  placeholder = 'Choose an image...'
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = useCallback((file: File | null) => {
    if (!file) {
      onChange(null);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('File size must be less than 5MB');
      return;
    }

    // Convert to base64 for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
    };
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;
    
    const [file] = e.dataTransfer.files;
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <div className="image-upload-container">
      {value ? (
        <div className="image-preview">
          <div style={{ 
            position: 'relative', 
            maxWidth: '300px', 
            maxHeight: '200px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <Image 
              src={value} 
              alt="Preview"
              width={300}
              height={200}
              style={{
                objectFit: 'contain',
                width: '100%',
                height: 'auto'
              }}
              unoptimized={value.startsWith('data:')} // For base64 images
            />
          </div>
          <div className="image-actions">
            <button 
              type="button" 
              onClick={handleRemove}
              disabled={disabled}
              style={{
                padding: '4px 8px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: disabled ? 'not-allowed' : 'pointer'
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`image-dropzone ${isDragOver ? 'drag-over' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            border: `2px dashed ${isDragOver ? '#007bff' : '#ddd'}`,
            borderRadius: '4px',
            padding: '20px',
            textAlign: 'center',
            backgroundColor: isDragOver ? '#f8f9fa' : 'transparent',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            disabled={disabled}
           
            id="image-upload-input"
          />
          <label 
            htmlFor="image-upload-input" 
            style={{ 
              cursor: disabled ? 'not-allowed' : 'pointer',
              display: 'block'
            }}
          >
            <div>
              📷
            </div>
            <div>{placeholder}</div>
            <div>
              Drag and drop or click to select (Max 5MB)
            </div>
          </label>
        </div>
      )}
    </div>
  );
};
