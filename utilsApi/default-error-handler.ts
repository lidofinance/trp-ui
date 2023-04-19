import { defaultErrorHandler } from '@lidofinance/next-api-wrapper';
import { serverLogger } from './serverLogger';

export const defaultErrorWrapper = defaultErrorHandler({ serverLogger });
