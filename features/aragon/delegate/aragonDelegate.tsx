import { Main } from 'shared/ui';
import { AragonWallet } from '../aragonWallet';
import { AragonDelegateForm } from './aragonDelegateForm';
import { InlineLoader } from '@lidofinance/lido-ui';
import { VestingCarousel, VestingSummarySlide } from 'features/vesting';
import { AragonDelegateFormDisconnected } from './aragonDelegateFormDisconnected';
import { AragonDelegateFormError } from './aragonDelegateFormError';
type AragonDelegateProps = {
  active: boolean;
  vestings?: {
    creator: string;
    recipient: string;
    escrow: string;
  }[];
  isLoading: boolean;
  walletError?: string;
};

export const AragonDelegate = (props: AragonDelegateProps) => {
  const { active, vestings, isLoading, walletError } = props;
  if (isLoading) {
    return <InlineLoader style={{ height: '50px' }} />;
  }

  if (walletError != null) {
    return (
      <Main>
        <Main.ErrorWallet>{walletError}</Main.ErrorWallet>
        <AragonDelegateFormError />
      </Main>
    );
  }

  if (!active) {
    return (
      <Main>
        <AragonDelegateFormDisconnected />
      </Main>
    );
  }

  if (vestings?.length === 0) {
    return (
      <Main>
        <Main.ErrorWallet>You don&apos;t have active programs</Main.ErrorWallet>
        <AragonDelegateFormError text="No program" />
      </Main>
    );
  }

  return (
    <Main>
      <AragonWallet />

      <Main.Card>
        <VestingCarousel
          slide={
            <VestingSummarySlide
              title="Available to delegate"
              showDelegation="aragon"
            />
          }
        />
        <AragonDelegateForm />
      </Main.Card>
    </Main>
  );
};
