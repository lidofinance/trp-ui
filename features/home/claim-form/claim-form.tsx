import {
  FC,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useVestingClaim, useVestingUnclaimed } from 'hooks';
import { validateNumericInput } from './validators/validate-numeric-input';
import { validateAddressInput } from './validators/validate-address-input';
import { useClaimingContext, useVestingsContext } from '../providers';
import { SelectVesting } from './inputs/select-vesting';
import { InputUnvestAmount } from './inputs/input-unvest-amount';
import { InputCustomAddress } from './inputs/input-custom-address';
import { Button, Loader } from '@lidofinance/lido-ui';
import { LoaderWrapperStyled, NoProgramStyled } from './styles';

export const ClaimForm: FC = () => {
  const { vestings, currentVesting, isVestingsLoading, setCurrentVesting } =
    useVestingsContext();

  const [amountTouched, setAmountTouched] = useState(false);
  const [amount, setAmount] = useState('');
  const [addressTouched, setAddressTouched] = useState(false);
  const [address, setAddress] = useState('');
  const [isPending, setIsPending] = useState(false);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) setAmountTouched(true);
  }, [amount]);
  useEffect(() => {
    if (didMountRef.current) setAddressTouched(true);
  }, [address]);

  // skipping first render
  useEffect(() => {
    didMountRef.current = true;
  }, []);

  const handleVestingSelect = useCallback(
    (newValue: string) => {
      if (newValue === currentVesting) {
        return;
      }
      setAmount('');
      setAddress('');
      setAmountTouched(false);
      setAddressTouched(false);
      setCurrentVesting(newValue);
    },
    [currentVesting, setCurrentVesting],
  );

  const unclaimed = useVestingUnclaimed(currentVesting);
  const { error: amountError } = validateNumericInput(amount, 'Token amount', {
    limit: unclaimed.data,
  });
  const { error: addressError } = validateAddressInput(address, {
    allowEmpty: true,
  });

  const disabled =
    amount === '' || unclaimed.loading || !!amountError || !!addressError;

  const claim = useVestingClaim(currentVesting);
  const { setIsClaiming } = useClaimingContext();

  const handleClaim: FormEventHandler = useCallback(
    async (event) => {
      event.preventDefault();
      setIsPending(true);
      setIsClaiming(true);

      try {
        await claim(amount, address);
      } finally {
        setIsPending(false);
        setIsClaiming(false);
        setAmount('');
      }
    },
    [claim, amount, setIsClaiming, address],
  );

  const amountRenderedError = amountTouched ? amountError : null;
  const addressRenderedError = addressTouched ? addressError : null;

  if (isVestingsLoading) {
    return (
      <LoaderWrapperStyled>
        <Loader />
      </LoaderWrapperStyled>
    );
  }

  if (currentVesting == null) {
    return <NoProgramStyled>Don&apos;t have program</NoProgramStyled>;
  }

  return (
    <form onSubmit={handleClaim}>
      <SelectVesting
        value={currentVesting}
        onChange={handleVestingSelect}
        options={vestings}
        error={amountRenderedError}
      >
        <InputUnvestAmount
          value={amount}
          onChange={setAmount}
          maxValue={unclaimed}
          error={amountRenderedError}
        />
      </SelectVesting>
      <InputCustomAddress
        value={address}
        onChange={setAddress}
        error={addressRenderedError}
      />
      <Button
        fullwidth
        loading={isPending}
        disabled={disabled}
        onClick={handleClaim}
      >
        Claim
      </Button>
    </form>
  );
};
