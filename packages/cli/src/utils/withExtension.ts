import { isFileNameValid } from './isFileNameValid';

/**
 * Simply adds given file extension to filename
 */
export const withExtension = (extension: string) => (name: string): string => {
  isFileNameValid(name);

  if (extension[0] !== '.') {
    return `${name}.${extension}`;
  }

  return `${name}${extension}`;
};
