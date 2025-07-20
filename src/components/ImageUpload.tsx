import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import validateFile from '@/utils/validateFile';
import convertFileToBase64 from '@/utils/convertFileToBase64';
import { ERROR_MESSAGES, UPLOAD_CONSTANTS } from '@/constants/common';

/**
 * Props for the ImageUpload component.
 *
 * @property value - The current image value, which can be a base64 string or a URL. Optional.
 * @property onChange - Callback function invoked when the image is changed or removed. Receives the new image URL or null.
 * @property disabled - Optional. If true, disables the upload and remove actions. Defaults to false.
 * @property placeholder - Optional. Placeholder text shown when no image is selected. Defaults to 'Choose an image...'.
 */
export interface ImageUploadProps {
  value?: string | null;
  onChange: (imageUrl: string | null) => void;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * ImageUpload component for uploading and previewing images.
 *
 * Allows users to select an image file via file input or drag-and-drop.
 * Validates the file type and size, converts the image to a base64 string for preview,
 * and provides a remove button to clear the selection.
 *
 * @param value - The current image value (base64 string or URL).
 * @param onChange - Callback invoked when the image is changed or removed.
 * @param disabled - Optional. Disables the upload and remove actions if true. Defaults to false.
 * @param placeholder - Optional. Placeholder text shown when no image is selected. Defaults to 'Choose an image...'.
 *
 * @returns A React component for image upload and preview.
 */
export default function ImageUpload({
  value,
  onChange,
  disabled = false,
  placeholder = 'Choose an image...',
}: ImageUploadProps) {
  const [, setIsDragOver] = useState(false);

  const handleFileChange = useCallback(
    function (file: File | null) {
      if (!file) {
        onChange(null);
        return;
      }

      // Validate file type
      const error = validateFile(file);
      if (error) {
        alert(error);
        return;
      }

      // Convert to base64 for preview
      convertFileToBase64(file)
        .then((base64) => {
          onChange(base64);
        })
        .catch((err) => {
          console.error(ERROR_MESSAGES.FILE_TOO_LARGE, err);
          alert(ERROR_MESSAGES.FILE_TOO_LARGE);
        });
    },
    [onChange]
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);

    if (disabled) return;

    const [file] = e.dataTransfer.files;
    if (file) {
      handleFileChange(file);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
  }

  function handleRemove() {
    onChange(null);
  }

  return (
    <div>
      {value ? (
        <div>
          <Image
            src={value}
            alt="Preview"
            width={UPLOAD_CONSTANTS.PREVIEW_DIMENSIONS.width}
            height={UPLOAD_CONSTANTS.PREVIEW_DIMENSIONS.height}
            unoptimized={value.startsWith('data:')}
          />
          <div>
            <button type="button" onClick={handleRemove} disabled={disabled}>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            id="image-upload-input"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            disabled={disabled}
          />
          <label htmlFor="image-upload-input">
            <div>Drag and drop or click to select (Max {UPLOAD_CONSTANTS.MAX_FILE_SIZE_MB}MB)</div>
            <div>{placeholder}</div>
            <div>Drag and drop or click to select (Max {UPLOAD_CONSTANTS.MAX_FILE_SIZE_MB}MB)</div>
          </label>
        </div>
      )}
    </div>
  );
}
