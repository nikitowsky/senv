import { isFileNameValid } from './isFileNameValid';

/**
 * Simply adds given file extension to filename
 */
export const withExtension = (extension: string) => (name: string): string => {
  const isNameVaild = isFileNameValid(name);

  if (isNameVaild && name.endsWith(extension)) {
    return name;
  }

  if (extension[0] !== '.') {
    return `${name}.${extension}`;
  }

  return `${name}${extension}`;
};
