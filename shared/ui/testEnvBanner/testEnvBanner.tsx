import { TestEnvBanner as LidoTestEnvBanner } from '@lidofinance/lido-app-ui';
import dynamics from 'config/dynamics';

export const TestEnvBanner = () => {
  if (dynamics.isProd) {
    return null;
  }
  return <LidoTestEnvBanner />;
};
