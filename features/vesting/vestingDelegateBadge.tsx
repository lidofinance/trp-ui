import { FC, memo } from 'react';
import { AddressZero } from '@ethersproject/constants';

import { encodeAddress, useENS } from '../addressModal';
import { useModal } from '../walletModal';
import { InlineLoader } from '@lidofinance/lido-ui';
import { Badge, BadgeContainer } from './vestingSlideStyles';

type Props = {
  delegateAddress: string | undefined;
};

export const VestingDelegateBadge: FC<Props> = memo(({ delegateAddress }) => {
  const { data: ensName, isLoading } = useENS(delegateAddress);

  const delegateNameToShow = ensName ?? delegateAddress;

  const { openModal } = useModal(encodeAddress(delegateAddress, 'delegate'));

  if (isLoading) {
    return <InlineLoader />;
  }

  if (!delegateAddress || delegateAddress === AddressZero) {
    return <>Not delegated</>;
  }

  return (
    <BadgeContainer>
      <Badge
        address={delegateNameToShow}
        title={delegateNameToShow}
        onClick={openModal}
      />
    </BadgeContainer>
  );
});

VestingDelegateBadge.displayName = 'VestingDelegateBadge';
