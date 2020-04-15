import { parseKeyValuePair } from '../src/utils';

it('Should correctly parse key-value pair', () => {
  const givenKeyValuePair = 'NODE_ENV=production';

  expect(parseKeyValuePair(givenKeyValuePair)).toStrictEqual([
    'NODE_ENV',
    'production',
  ]);
});

it('Should correctly parse key-value pair with quoted value', () => {
  const givenKeyValuePairWithQuotes = 'NODE_ENV="production"';

  expect(parseKeyValuePair(givenKeyValuePairWithQuotes)).toStrictEqual([
    'NODE_ENV',
    '"production"',
  ]);
});

it('Should correctly parse key-value pair with empty value', () => {
  const givenKeyValuePair = 'NODE_ENV=';

  expect(parseKeyValuePair(givenKeyValuePair)).toStrictEqual(['NODE_ENV', '']);
});
