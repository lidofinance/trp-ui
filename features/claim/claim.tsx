import { Wallet } from './wallet';
import { ClaimForm } from './claimForm';
import { VestingCarousel } from '../vesting/vestingCarousel';
import { Main, useWalletError } from 'shared/ui';
import { useWeb3 } from 'reef-knot';
import { ClaimFormDisconnected } from './claimFormDisconnected';
import { VestingDetailedSlide, useAccountVestings } from 'features/vesting';
import { ClaimFormError } from './claimFormError';
import { InlineLoader } from '@lidofinance/lido-ui';

export const Claim = () => {
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
        <ClaimFormError />
      </Main>
    );
  }

  if (!active) {
    return (
      <Main>
        <ClaimFormDisconnected />
      </Main>
    );
  }

  if (vestings?.length === 0) {
    return (
      <Main>
        <Main.ErrorWallet>You don&apos;t have active programs</Main.ErrorWallet>
        <ClaimFormError text="No programs" />
      </Main>
    );
  }

  return (
    <Main>
      <Wallet />
      <Main.Card>
        <VestingCarousel slide={<VestingDetailedSlide />} />
        <ClaimForm />
      </Main.Card>
    </Main>
  );
};
