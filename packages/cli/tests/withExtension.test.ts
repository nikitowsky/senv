import { withExtension } from '../src/utils';

const generateTemporaryFileName = withExtension('.tmp');

it('Should add .tmp extension to given filename', () => {
  const givenFileName = '.env.stage';
  const expectedFileName = '.env.stage.tmp';

  expect(generateTemporaryFileName(givenFileName)).toBe(expectedFileName);
});

it('Should work correctly with extension passed without dot', () => {
  const generateOMFGFileName = withExtension('omfg');

  const givenFileName = '.env.stage';
  const expectedFileName = '.env.stage.omfg';

  expect(generateOMFGFileName(givenFileName)).toBe(expectedFileName);
});
