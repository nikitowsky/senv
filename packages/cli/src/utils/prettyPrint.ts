import chalk from 'chalk';

/**
 * Prints object in key=value format
 *
 * @param object Object
 */
export const prettyPrint = (object: { [key: string]: string }) => {
  for (const key in object) {
    const prettyKey = chalk.yellow(key);
    const prettyValue = chalk.green(object[key]);

    console.log(`${prettyKey}=${prettyValue}`);
  }
};
