import { Main, useWalletError } from 'shared/ui';
import { AragonWallet } from './aragonWallet';
import { AragonForm } from './aragonForm';
import { VestingCarousel } from './vestingsCarousel';
import { InlineLoader } from '@lidofinance/lido-ui';
import { useAccountVestings } from 'features/vesting';
import { AragonFormDisconnected } from './aragonFormDisconnected';
import { useWeb3 } from 'reef-knot/web3-react';
import { AragonFormError } from './aragonFormError';

export const Aragon = () => {
  const { active } = useWeb3();
  const { data: vestings, isLoading } = useAccountVestings();
  const walletError = useWalletError();

  if (isLoading) {
    return <InlineLoader style={{ height: '50px' }} />;
  }

  if (walletError != null) {
    return (
      <Main>
        <Main.ErrorWallet>{walletError}</Main.ErrorWallet>
        <AragonFormError />
      </Main>
    );
  }

  if (!active) {
    return (
      <Main>
        <AragonFormDisconnected />
      </Main>
    );
  }

  if (vestings?.length === 0) {
    return (
      <Main>
        <Main.ErrorWallet>You don&apos;t have active programs</Main.ErrorWallet>
        <AragonFormError text="No program" />
      </Main>
    );
  }

  return (
    <Main>
      <AragonWallet />

      <Main.Card>
        <VestingCarousel />
        <AragonForm />
      </Main.Card>
    </Main>
  );
};
