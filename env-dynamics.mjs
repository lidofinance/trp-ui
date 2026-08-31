/**
 * Convert to bool:
 * - true to true
 * - 'true' to true
 * - 1 to true
 * - '1' to true
 * - another values to false
 * @returns {Boolean}
 */
const toBoolean = (val) => {
  return !!(
    val?.toLowerCase?.() === 'true' ||
    val === true ||
    Number.parseInt(val, 10) === 1
  );
};

/** @type boolean */
export const isProd = toBoolean(process.env.IS_PROD);

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
