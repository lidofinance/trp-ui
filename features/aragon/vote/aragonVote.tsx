import { Main } from 'shared/ui';
import { AragonWallet } from '../aragonWallet';
import { AragonVoteForm } from './aragonVoteForm';
import { InlineLoader } from '@lidofinance/lido-ui';
import { VestingCarousel, VestingSummarySlide } from 'features/vesting';
import { AragonVoteFormDisconnected } from './aragonVoteFormDisconnected';
import { AragonVoteFormError } from './aragonVoteFormError';
type AragonVoteProps = {
  active: boolean;
  vestings?: {
    creator: string;
    recipient: string;
    escrow: string;
  }[];
  isLoading: boolean;
  walletError?: string;
};
export const AragonVote = (props: AragonVoteProps) => {
  const { active, vestings, isLoading, walletError } = props;
  if (isLoading) {
    return <InlineLoader style={{ height: '50px' }} />;
  }

  if (walletError != null) {
    return (
      <Main>
        <Main.ErrorWallet>{walletError}</Main.ErrorWallet>
        <AragonVoteFormError />
      </Main>
    );
  }

  if (!active) {
    return (
      <Main>
        <AragonVoteFormDisconnected />
      </Main>
    );
  }

  if (vestings?.length === 0) {
    return (
      <Main>
        <Main.ErrorWallet>You don&apos;t have active programs</Main.ErrorWallet>
        <AragonVoteFormError text="No program" />
      </Main>
    );
  }

  return (
    <Main>
      <AragonWallet />

      <Main.Card>
        <VestingCarousel
          slide={<VestingSummarySlide title="Available to vote" />}
        />
        <AragonVoteForm />
      </Main.Card>
    </Main>
  );
};
