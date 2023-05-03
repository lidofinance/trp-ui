import { rateLimitWrapper as rateLimitWrapperFactory } from '@lidofinance/next-ip-rate-limit';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export const rateLimitWrapper = rateLimitWrapperFactory({
  rateLimit: serverRuntimeConfig.rateLimit,
  rateLimitTimeFrame: serverRuntimeConfig.rateLimitTimeFrame,
});
