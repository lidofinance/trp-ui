import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useVestingClaim, useVestingUnclaimed } from '../../../hooks';
import { validateNumericInput } from './validators/validate-numeric-input';
import { validateAddressInput } from './validators/validate-address-input';
import { useVestingsContext } from '../hooks';
import { SelectVesting } from './inputs/select-vesting';
import { InputUnvestAmount } from './inputs/input-unvest-amount';
import { InputCustomAddress } from './inputs/input-custom-address';
import { Button } from '@lidofinance/lido-ui';

export const ExistingClaimForm = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => unknown;
  options: string[];
}) => {
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

  const onSelectVesting = useCallback(
    (newValue: string) => {
      if (newValue === value) {
        return;
      }
      setAmount('');
      setAddress('');
      setAmountTouched(false);
      setAddressTouched(false);
      onChange(newValue);
    },
    [onChange, value],
  );

  const unclaimed = useVestingUnclaimed(value);
  const { error: amountError } = validateNumericInput(amount, 'Token amount', {
    limit: unclaimed.data,
  });
  const { error: addressError } = validateAddressInput(address, {
    allowEmpty: true,
  });

  const disabled =
    amount === '' || unclaimed.loading || !!amountError || !!addressError;

  const claim = useVestingClaim(value);
  const { setIsClaiming } = useVestingsContext();

  const onClaim: FormEventHandler = useCallback(
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

  return (
    <form onSubmit={onClaim}>
      <SelectVesting
        value={value}
        onChange={onSelectVesting}
        options={options}
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
        onClick={onClaim}
      >
        Claim
      </Button>
    </form>
  );
};
