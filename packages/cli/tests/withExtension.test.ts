import { withExtension, InvalidFileNameError } from '../src/utils';

const generateTemporaryFileName = withExtension('.tmp');

it('Should throw an error if given filename has incorrect format', () => {
  const givenFileName = '';

  expect(() => generateTemporaryFileName(givenFileName)).toThrowError(
    InvalidFileNameError,
  );
});

it('Should add .tmp extension to given filename', () => {
  const givenFileName = '.env';
  const expectedFileName = '.env.tmp';

  expect(generateTemporaryFileName(givenFileName)).toBe(expectedFileName);
});

it('Should not add .tmp extension to given filename, if it already have .tmp extension', () => {
  const givenFileName = '.env.tmp';
  const expectedFileName = '.env.tmp';

  expect(generateTemporaryFileName(givenFileName)).toBe(expectedFileName);
});

it('Should work correctly with extension passed without dot', () => {
  const generateOMFGFileName = withExtension('omfg');

  const givenFileName = '.env';
  const expectedFileName = '.env.omfg';

  expect(generateOMFGFileName(givenFileName)).toBe(expectedFileName);
});
