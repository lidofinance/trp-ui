import packageJson from 'package.json';
import { metrics } from 'features/metrics';

const NETWORK_ERROR_STATUS = 'network_error';
export const USER_AGENT = `${packageJson.name}/${packageJson.version}`;

// headers narrowed to a plain record: spreading a Headers instance yields {}
type FetchExternalParams = Omit<RequestInit, 'headers'> & {
  headers?: Record<string, string>;
};

export const fetchExternal = async (
  url: string,
  params?: FetchExternalParams,
): Promise<Response> => {
  const { hostname } = new URL(url);
  const endTimer = metrics.request.apiTimingsExternal.startTimer({ hostname });

  try {
    const response = await fetch(url, {
      ...params,
      headers: { 'User-Agent': USER_AGENT, ...params?.headers },
    });
    endTimer({ status: response.status });
    metrics.request.externalRequestCounter.inc({
      hostname,
      status: response.status,
    });
    return response;
  } catch (error) {
    endTimer({ status: NETWORK_ERROR_STATUS });
    metrics.request.externalRequestCounter.inc({
      hostname,
      status: NETWORK_ERROR_STATUS,
    });
    throw error;
  }
};
