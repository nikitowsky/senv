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

it('Should add not add anthing with given empty prefix', () => {
  const withEmptyPrefix = withPrefix('');
  const givenFileName = 'master.key';

  expect(withEmptyPrefix(givenFileName)).toBe(givenFileName);
});
