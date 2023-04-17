import {
  FC,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  useVestingClaim,
  useVestingsContext,
  useVestingUnclaimed,
} from 'features/vesting';
import { validateNumericInput } from './validateNumericInput';
import { validateAddressInput } from './validateAddressInput';
import { InputCustomAddress } from './inputCustomAddress';
import { Button } from '@lidofinance/lido-ui';
import { NoProgramStyled } from './styles';
import { useWeb3 } from 'reef-knot';
import { WalletConnect } from 'features/wallet';
import { useClaimingContext } from './claimingProvider';
import { SelectVesting } from 'features/vesting/selectVesting';
import { InputGroupStyled } from 'shared/ui';
import { InputAmount } from 'shared/ui/inputAmount';

export const ClaimForm: FC = () => {
  const { currentVesting, isLoading } = useVestingsContext();
  const { isClaiming, setIsClaiming } = useClaimingContext();

  const [amountTouched, setAmountTouched] = useState(false);
  const [amount, setAmount] = useState('');

  const [addressTouched, setAddressTouched] = useState(false);
  const [address, setAddress] = useState('');

  const claim = useVestingClaim();
  const unclaimed = useVestingUnclaimed();

  const { active, account } = useWeb3();

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

  const handleClaim: FormEventHandler = useCallback(
    async (event) => {
      event.preventDefault();
      setIsClaiming(true);

      try {
        await claim(amount, address);
      } finally {
        setIsClaiming(false);
      }
    },
    [claim, amount, setIsClaiming, address],
  );

  const { error: amountError } = validateNumericInput(amount, 'Token amount', {
    limit: unclaimed.data,
  });
  const { error: addressError } = validateAddressInput(address, {
    allowEmpty: true,
  });

  const disabled =
    amount === '' || unclaimed.loading || !!amountError || !!addressError;

  const amountRenderedError = amountTouched ? amountError : null;
  const addressRenderedError = addressTouched ? addressError : null;

  if (account != null && active && !isLoading && currentVesting == null) {
    return <NoProgramStyled>You don&apos;t have a program</NoProgramStyled>;
  }

  return (
    <form onSubmit={handleClaim}>
      <InputGroupStyled fullwidth error={amountRenderedError}>
        <SelectVesting error={amountRenderedError} />
        <InputAmount
          fullwidth
          label="Token amount"
          value={amount}
          onChange={setAmount}
          maxValue={unclaimed}
          error={amountRenderedError}
          maxDisabled={account == null}
        />
      </InputGroupStyled>
      <InputCustomAddress
        value={address}
        onChange={setAddress}
        error={addressRenderedError}
      />
      {active ? (
        <Button
          fullwidth
          loading={isClaiming}
          disabled={disabled}
          onClick={handleClaim}
        >
          Claim
        </Button>
      ) : (
        <WalletConnect fullwidth />
      )}
    </form>
  );
};
