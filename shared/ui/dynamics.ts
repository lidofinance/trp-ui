import * as systemDynamics from '../../env-dynamics.mjs';

declare global {
  interface Window {
    __env__: typeof systemDynamics;
  }
}

const browserDynamics =
  typeof window !== 'undefined' ? window.__env__ : undefined;

export const dynamics = browserDynamics ?? systemDynamics;
