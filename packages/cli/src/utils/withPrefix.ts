import { isFileNameValid } from './isFileNameValid';

/**
 * Simply adds given file extension to filename
 */
export const withPrefix = (prefix: string) => (name: string): string => {
  isFileNameValid(name);
  let normalizedPrefix = prefix;

  if (prefix[0] !== '.') {
    normalizedPrefix = '.' + prefix;
  }

  if (name === '') {
    return normalizedPrefix;
  }

  return `${normalizedPrefix}.${name}`;
};
