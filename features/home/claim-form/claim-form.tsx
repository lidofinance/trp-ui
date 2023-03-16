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
import { Button } from '@lidofinance/lido-ui';
import { NoProgramStyled } from './styles';
import { useWeb3 } from 'reef-knot';
import { WalletConnect } from 'components/walletConnect';

export const ClaimForm: FC = () => {
  const { vestings, currentVesting, isLoading, setCurrentVesting } =
    useVestingsContext();
  const { isClaiming, setIsClaiming } = useClaimingContext();

  const [amountTouched, setAmountTouched] = useState(false);
  const [amount, setAmount] = useState('');

  const [addressTouched, setAddressTouched] = useState(false);
  const [address, setAddress] = useState('');

  const claim = useVestingClaim(currentVesting);
  const unclaimed = useVestingUnclaimed(currentVesting);

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

  const handleClaim: FormEventHandler = useCallback(
    async (event) => {
      event.preventDefault();
      setIsClaiming(true);

      try {
        await claim(amount, address);
      } catch (e) {
        // do nothing, we already shown error
        // TODO: error handling should be made here
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
          maxDisabled={account == null}
        />
      </SelectVesting>
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
