import { defaultErrorHandler } from '@lidofinance/next-api-wrapper';
import { serverLogger } from 'features/loggers';

export const defaultErrorWrapper = defaultErrorHandler({ serverLogger });
