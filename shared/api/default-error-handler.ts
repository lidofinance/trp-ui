import { defaultErrorHandler } from '@lidofinance/next-api-wrapper';

export const defaultErrorWrapper = defaultErrorHandler({
  serverLogger: console,
});
