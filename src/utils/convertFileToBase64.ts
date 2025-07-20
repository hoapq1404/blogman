/**
 * Converts a File object to a base64 string.
 * @param file File to be converted to base64
 * @returns A promise that resolves to the base64 string representation of the file
 */
export default function convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            resolve(result);
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
    });
}
