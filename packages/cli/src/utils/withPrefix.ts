/**
 * Simply adds given file extension to filename
 */
export const withPrefix = (prefix: string) => (name: string): string => {
  if (!Boolean(prefix)) {
    return name;
  }

  if (!Boolean(name)) {
    return prefix;
  }

  return `${prefix}.${name}`;
};
