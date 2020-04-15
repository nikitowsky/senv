/**
 * Simply adds given file extension to filename
 */
export const withExtension = (extension: string) => (name: string): string => {
  if (extension[0] !== '.') {
    return `${name}.${extension}`;
  }

  return `${name}${extension}`;
};
