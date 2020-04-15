import { parseKeyValuePair } from './parseKeyValuePair';

export const parseDotenv = (data: string) => {
  const parsedData = {};

  // Parse each line
  const lines = data.split('\n');

  lines.forEach((line) => {
    const parsedLine = parseKeyValuePair(line);

    if (parsedLine !== null) {
      const [key, value] = parsedLine;
      parsedData[key] = value;
    }
  });

  return parsedData;
};
