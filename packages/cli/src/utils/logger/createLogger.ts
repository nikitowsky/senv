import { Chalk } from 'chalk';

export const createLogger = (type: string, color: Chalk) => (
  message: string,
) => {
  console.log(color(type), message);
};
