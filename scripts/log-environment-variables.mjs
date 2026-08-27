export const openKeys = [
  'CHAIN_ID',
  'SUPPORTED_CHAINS',

  'CSP_TRUSTED_HOSTS',
  'CSP_REPORT_ONLY',
  'CSP_REPORT_URI',

  'RATE_LIMIT',
  'RATE_LIMIT_TIME_FRAME',

  'VALIDATION_FILE_PATH',
  'MATOMO_HOST',
  'WALLETCONNECT_PROJECT_ID',
];

export const secretKeys = ['EL_RPC_URLS', 'VALIDATION_SERVICE_BASE_PATH'];

/* eslint-disable no-console */

export const logOpenEnvironmentVariables = () => {
  console.log('---------------------------------------------');
  console.log('Log environment variables (without secrets):');
  console.log('---------------------------------------------');

  for (const key of openKeys) {
    if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
      console.error(`${key} - ERROR (not exist in process.env)`);
      continue;
    }

    console.info(`${key} = ${process.env[key]}`);
  }

  console.log('---------------------------------------------');
  console.log('');
};

export const logSecretEnvironmentVariables = () => {
  console.log('---------------------------------------------');
  console.log('Log secret environment variables:');
  console.log('---------------------------------------------');

  for (const key of secretKeys) {
    if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
      console.error(`Secret ${key} - ERROR (not exist in process.env)`);
      continue;
    }

    if (process.env[key].length > 0) {
      console.info(`Secret ${key} - OK (exist and not empty)`);
    } else {
      console.warn(`Secret ${key} - WARN (exist but empty)`);
    }
  }

  console.log('---------------------------------------------');
};

export const logEnvironmentVariables = () => {
  logOpenEnvironmentVariables();
  logSecretEnvironmentVariables();
};
