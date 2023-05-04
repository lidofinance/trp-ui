import { Block } from '@lidofinance/lido-ui';
import { Wallet } from './wallet';
import { ClaimForm } from './claimForm';
import { VestingCarousel } from './vestingCarousel';

export const Claim = () => {
  return (
    <>
      <Wallet />
      <Block>
        <VestingCarousel />
        <ClaimForm />
      </Block>
    </>
  );
};
