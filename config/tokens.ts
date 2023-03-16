import { TOKENS, CHAINS } from '@lido-sdk/constants';

export const TOKENS_BY_NETWORK: {
  [key in CHAINS]?: { [key in TOKENS]?: string };
} = {
  [CHAINS.Mainnet]: {
    [TOKENS.WSTETH]: '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
    [TOKENS.STETH]: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
    [TOKENS.LDO]: '0x5a98fcbea516cf06857215779fd812ca3bef1b32',
  },
  [CHAINS.Goerli]: {
    [TOKENS.WSTETH]: '0x6320cD32aA674d2898A68ec82e869385Fc5f7E2f',
    [TOKENS.STETH]: '0x1643e812ae58766192cf7d2cf9567df2c37e9b7f',
    [TOKENS.LDO]: '0x56340274fB5a72af1A3C6609061c451De7961Bd4',
  },
};

export const getTokenNameByAddress = (address: string, chainId: CHAINS) => {
  const tokensByChainId = TOKENS_BY_NETWORK[chainId];
  if (tokensByChainId == null) {
    return undefined;
  }

  return Object.keys(tokensByChainId).find((token) => token === address);
};
