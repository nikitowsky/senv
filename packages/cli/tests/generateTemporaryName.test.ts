import { generateTemporaryName, InvalidFileNameError } from '../src/utils';

it('Should throw an error if given filename has incorrect format', () => {
  const givenFileName = '';

  expect(() => generateTemporaryName(givenFileName)).toThrowError(
    InvalidFileNameError,
  );
});

it('Should add .tmp extension to given filename', () => {
  const givenFileName = '.env';
  const expectedFileName = '.env.tmp';

  expect(generateTemporaryName(givenFileName)).toBe(expectedFileName);
});

it('Should not add .tmp extension to given filename, if it already have .tmp extension', () => {
  const givenFileName = '.env.tmp';
  const expectedFileName = '.env.tmp';

  expect(generateTemporaryName(givenFileName)).toBe(expectedFileName);
});
