/** @type number */
export const defaultChain = parseInt(process.env.CHAIN_ID, 10) || 1;
/** @type number[] */
export const supportedChains = process.env?.SUPPORTED_CHAINS?.split(',').map(
  (chainId) => parseInt(chainId, 10),
) ?? [1, 5];

/** @type string **/
export const walletconnectProjectId = process.env.WALLETCONNECT_PROJECT_ID;

/** @type boolean */
export const addressApiValidationEnabled =
  !!process.env.VALIDATION_SERVICE_BASE_PATH;

/** @type string */
export const validationFilePath = process.env.VALIDATION_FILE_PATH;

/** @type string */
export const matomoHost = process.env.MATOMO_HOST;
