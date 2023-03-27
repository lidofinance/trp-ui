import getConfig from 'next/config';
import { serverLoggerFactory } from '@lidofinance/api-logger';

const { serverRuntimeConfig } = getConfig();
const { infuraApiKey, alchemyApiKey } = serverRuntimeConfig;

export const serverLogger = serverLoggerFactory([infuraApiKey, alchemyApiKey]);
