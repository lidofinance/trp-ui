import { FC } from 'react';
import { CHAINS, getChainColor } from '@lido-sdk/constants';
import { useSDK } from '@lido-sdk/react';
import { useWeb3 } from '@reef-knot/web3-react';
import {
  WalletButton,
  WalletConnectButton,
} from '@lidofinance/eth-ui-wallet-modal';

import { HeaderWalletChainStyle } from './headerActionsStyles';

export const HeaderActions: FC = () => {
  const { active } = useWeb3();
  const { chainId } = useSDK();

  const chainName = CHAINS[chainId];
  const testNet = chainId !== CHAINS.Mainnet;
  const showNet = testNet && active;

  return (
    <>
      {showNet && (
        <HeaderWalletChainStyle $color={getChainColor(chainId)}>
          {chainName}
        </HeaderWalletChainStyle>
      )}
      {active ? <WalletButton /> : <WalletConnectButton size="sm" />}
    </>
  );
};
