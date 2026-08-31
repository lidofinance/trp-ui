import { TestEnvBanner as LidoTestEnvBanner } from '@lidofinance/lido-app-ui';
import dynamics from 'config/dynamics';

export const TestEnvBanner = () => {
  // `!== false`, not `!isProd`: a window-env.js cached before IS_PROD
  // existed leaves it undefined, which must not show the banner on prod
  if (dynamics.isProd !== false) {
    return null;
  }
  return <LidoTestEnvBanner />;
};
