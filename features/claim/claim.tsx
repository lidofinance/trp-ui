import { Block } from '@lidofinance/lido-ui';
import { Wallet } from 'features/wallet';
import { ClaimForm } from './claimForm';
import { SelectVesting } from './selectVesting';

export const Claim = () => {
  return (
    <>
      <Wallet />
      <Block>
        <SelectVesting />
        <ClaimForm />
      </Block>
    </>
  );
};
