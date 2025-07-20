import { ERROR_MESSAGES, UPLOAD_CONSTANTS } from '@/constants/common';

/**
 * Validates the uploaded file.
 * @param file File to validate
 * @returns Returns an error message if validation fails, otherwise returns null
 */
export default function validateFile(file: File): string | null {
    if (!file.type.startsWith('image/')) {
        return ERROR_MESSAGES.INVALID_FILE_TYPE;
    }
    
    if (file.size > UPLOAD_CONSTANTS.MAX_FILE_SIZE_BYTES) {
        return ERROR_MESSAGES.FILE_TOO_LARGE;
    }
    
    return null;
}