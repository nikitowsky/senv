import { isFileNameValid } from './isFileNameValid';

export const TEMPORARY_FILE_EXTENSION = '.tmp';

/**
 * Simply adds .tmp extension to given filename
 */
export const generateTemporaryName = (name: string): string => {
  const isNameVaild = isFileNameValid(name);

  if (isNameVaild && name.endsWith(TEMPORARY_FILE_EXTENSION)) {
    return name;
  }

  return name + TEMPORARY_FILE_EXTENSION;
};
