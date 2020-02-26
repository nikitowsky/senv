const VAILD_FILENAME_REGEX = /^[\w\-. ]+$/;

export class InvalidFileNameError extends Error {
  constructor() {
    super();

    this.message = 'Incorrect filename';
  }
}

export const isFileNameValid = (name: string): boolean => {
  const isValid = VAILD_FILENAME_REGEX.test(name.trim());

  if (isValid) {
    return isValid;
  } else {
    throw new InvalidFileNameError();
  }
};
