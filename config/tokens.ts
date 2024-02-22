// Must be lowercase
const TOKENS_BY_ADDRESS: Record<string, string> = {
  '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0': 'WSTETH', // mainnet
  '0x6320cd32aa674d2898a68ec82e869385fc5f7e2f': 'WSTETH', // goerli
  '0x8d09a4502Cc8Cf1547aD300E066060D043f6982D': 'WSTETH', // holesky
  '0xae7ab96520de3a18e5e111b5eaab095312d7fe84': 'STETH', // mainnet
  '0x1643e812ae58766192cf7d2cf9567df2c37e9b7f': 'STETH', // goerli
  '0x3F1c547b21f65e10480dE3ad8E19fAAC46C95034': 'STETH', // holesky
  '0x5a98fcbea516cf06857215779fd812ca3bef1b32': 'LDO', // mainnet
  '0x56340274fb5a72af1a3c6609061c451de7961bd4': 'TESTLDO', // goerli
  '0x14ae7daeecdf57034f3E9db8564e46Dba8D97344': 'TESTLDO', // holesky
};

export const getTokenByAddress = (address: string): string => {
  return TOKENS_BY_ADDRESS[address.toLowerCase()] ?? '';
};
