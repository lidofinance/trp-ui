import getConfig from 'next/config';
export const { serverRuntimeConfig } = getConfig();
export { default as dynamics } from './dynamics';
export * from './locale';
export * from './rpc';
export * from './contracts';
export * from './metrics';
export * from './tokens';
