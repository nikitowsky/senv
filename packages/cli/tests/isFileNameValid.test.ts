import { isFileNameValid, InvalidFileNameError } from '../src/utils';

it('Should pass valid (or expected to be vaild in case of package) filenames', () => {
  const givenFileNames = ['.env', 'foo', 'foo.env', 'bar.env.tmp'];

  for (const fileName of givenFileNames) {
    expect(isFileNameValid(fileName)).toBe(true);
  }
});

it('Should throw an error when given filename is invalid', () => {
  const givenFileNames = ['', ',', '!', ' '];

  for (const fileName of givenFileNames) {
    expect(() => isFileNameValid(fileName)).toThrowError(InvalidFileNameError);
  }
});
