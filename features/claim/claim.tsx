import { Wallet } from './wallet';
import { ClaimForm } from './claimForm';
import { VestingCarousel } from './vestingCarousel';
import { ClaimBlock } from './claimStyles';

export const Claim = () => {
  return (
    <>
      <Wallet />
      <ClaimBlock>
        <VestingCarousel />
        <ClaimForm />
      </ClaimBlock>
    </>
  );
};
