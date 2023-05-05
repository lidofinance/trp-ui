import { Wallet } from './wallet';
import { ClaimForm } from './claimForm';
import { VestingCarousel } from './vestingCarousel';
import { Main } from 'shared/ui';

export const Claim = () => {
  return (
    <Main>
      <Wallet />
      <Main.Card>
        <VestingCarousel />
        <ClaimForm />
      </Main.Card>
    </Main>
  );
};
