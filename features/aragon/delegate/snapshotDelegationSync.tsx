import { Button, ToastError } from '@lidofinance/lido-ui';
import { AddressZero } from '@ethersproject/constants';
import { useCallback, useState } from 'react';
import {
  useAragonDelegateAddress,
  useSnapshotDelegate,
  useSnapshotDelegateAddress,
  useVestingsContext,
} from 'features/vesting';
import { VestingDelegateBadge } from 'features/vesting/vestingDelegateBadge';
import { useEncodeSnapshotCalldata } from 'features/votingAdapter';
import {
  SnapshotSync,
  SnapshotSyncNote,
  SnapshotSyncRow,
} from '../aragonFormStyles';

// Snapshot's DelegateRegistry rejects 0x0 and the voting adapter can't call
// clearDelegate, so a legacy Snapshot delegation is aligned rather than cleared
export const SnapshotDelegationSync = () => {
  const { activeVesting } = useVestingsContext();
  const { data: snapshotDelegate, mutate } = useSnapshotDelegateAddress(
    activeVesting?.escrow,
  );
  const { data: aragonDelegate } = useAragonDelegateAddress(
    activeVesting?.escrow,
  );
  const encodeCalldata = useEncodeSnapshotCalldata();
  const snapshotSetDelegate = useSnapshotDelegate(activeVesting?.escrow);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasAragonDelegate =
    aragonDelegate != null && aragonDelegate !== AddressZero;

  const syncWithAragon = useCallback(async () => {
    if (!hasAragonDelegate) return;
    setIsSubmitting(true);
    try {
      const callData = await encodeCalldata(aragonDelegate);
      await snapshotSetDelegate(callData);
      await mutate();
    } catch (err) {
      ToastError('Transaction error');
    } finally {
      setIsSubmitting(false);
    }
  }, [
    hasAragonDelegate,
    aragonDelegate,
    encodeCalldata,
    snapshotSetDelegate,
    mutate,
  ]);

  if (
    snapshotDelegate == null ||
    aragonDelegate == null ||
    snapshotDelegate === AddressZero ||
    snapshotDelegate.toLowerCase() === aragonDelegate.toLowerCase()
  ) {
    return null;
  }

  return (
    <SnapshotSync>
      <SnapshotSyncRow>
        <span>Delegated on Snapshot</span>
        <VestingDelegateBadge delegateAddress={snapshotDelegate} />
      </SnapshotSyncRow>
      <SnapshotSyncNote>
        Aragon delegation now applies to Snapshot too, but this separate
        Snapshot delegation takes priority there. Set it to your Aragon delegate
        so both votes go to the same place.
      </SnapshotSyncNote>
      <Button
        variant="outlined"
        fullwidth
        loading={isSubmitting}
        disabled={!hasAragonDelegate}
        onClick={syncWithAragon}
      >
        {hasAragonDelegate
          ? 'Use Aragon delegate on Snapshot'
          : 'Delegate on Aragon first'}
      </Button>
    </SnapshotSync>
  );
};
