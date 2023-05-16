import getConfig from 'next/config';
import { satanizer, commonPatterns } from '@lidofinance/satanizer';

const { serverRuntimeConfig } = getConfig();
const { infuraApiKey, alchemyApiKey } = serverRuntimeConfig;

export const mask = satanizer([...commonPatterns, infuraApiKey, alchemyApiKey]);
