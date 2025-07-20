export const COLOR_SCHEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const MODE = {
  ADD: 'add',
  EDIT: 'edit'
} as const;


export const UPLOAD_CONSTANTS = {
  MAX_FILE_SIZE_MB: 5,
  MAX_FILE_SIZE_BYTES: 5 * 1024 * 1024, // 5MB in bytes
  ACCEPTED_FILE_TYPES: 'image/*',
  PREVIEW_DIMENSIONS: { width: 300, height: 200 },
} as const;

export const ERROR_MESSAGES = {
  INVALID_FILE_TYPE: 'Please select a valid image file',
  FILE_TOO_LARGE: 'File size must be less than 5MB',
} as const;


export type ColorScheme = (typeof COLOR_SCHEMES)[keyof typeof COLOR_SCHEMES];
export type Mode = (typeof MODE)[keyof typeof MODE];
export type UploadConstants = typeof UPLOAD_CONSTANTS[keyof typeof UPLOAD_CONSTANTS];
export type ErrorMessages = typeof ERROR_MESSAGES[keyof typeof ERROR_MESSAGES];