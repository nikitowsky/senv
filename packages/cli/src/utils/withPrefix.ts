import { isFileNameValid } from './isFileNameValid';

/**
 * Simply adds given file extension to filename
 */
export const withPrefix = (prefix: string) => (name: string): string => {
  isFileNameValid(name);

  if (!Boolean(prefix)) {
    return name;
  }

  if (!Boolean(name)) {
    return prefix;
  }

  return `${prefix}.${name}`;
};
