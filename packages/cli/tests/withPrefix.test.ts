import { withPrefix } from '../src/utils';

const withDotenvFilename = withPrefix('.env');

it('Should add .env prefix to given filename', () => {
  const givenFileName = 'stage';
  const expectedFileName = '.env.stage';

  expect(withDotenvFilename(givenFileName)).toBe(expectedFileName);
});

it('Should add .env prefix to given empty filename', () => {
  const givenFileName = '';
  const expectedFileName = '.env';

  expect(withDotenvFilename(givenFileName)).toBe(expectedFileName);
});

it('Should work correctly with extension passed without dot', () => {
  const withDotenvFilenameWithoutDot = withPrefix('env');

  const givenFileName = 'stage';
  const expectedFileName = '.env.stage';

  expect(withDotenvFilenameWithoutDot(givenFileName)).toBe(expectedFileName);
});
