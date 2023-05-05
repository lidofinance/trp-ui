import { FC, useCallback, useEffect, useState } from 'react';
import {
  useVestingClaim,
  useVestingsContext,
  useVestingUnclaimed,
} from 'features/vesting';
import { Button, Input, Link } from '@lidofinance/lido-ui';
import { useWeb3 } from 'reef-knot';
import { WalletConnect } from 'features/walletModal';
import {
  InputGroupStyled,
  validateAddressInput,
  validateNumericInput,
  EtherscanLink,
} from 'shared/ui';
import { useForm } from 'react-hook-form';
import { BigNumber } from 'ethers';
import { FormControls, NoProgramStyled } from './claimFormStyles';
import { formatBalance } from 'shared/lib';

type ClaimFormData = {
  amount: string;
  address: string;
};

export const ClaimForm: FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { isDirty, isValid, errors },
  } = useForm<ClaimFormData>({ mode: 'onChange' });

  const { active, account } = useWeb3();

  useEffect(() => {
    if (account != null) {
      setValue('address', account);
    }
  }, [setValue, account]);

  const [showCustomAddress, setShowCustomAddress] = useState(false);

  const { activeVesting, isLoading } = useVestingsContext();

  useEffect(() => {
    if (isDirty) {
      trigger();
    }
  }, [isDirty, trigger, activeVesting]);

  const unclaimedSWR = useVestingUnclaimed(activeVesting?.escrow);
  const claim = useVestingClaim(activeVesting?.escrow);

  const validateAmount = useCallback(
    (data: string) =>
      validateNumericInput(data, 'Amount', {
        maximum: unclaimedSWR.data,
        minimum: BigNumber.from(0),
      }),
    [unclaimedSWR.data],
  );

  const handleClaim = useCallback(
    async (data: ClaimFormData) => {
      const { amount, address } = data;
      await claim(amount, address);
    },
    [claim],
  );

  const handleUseCustomAddress = useCallback(() => {
    setShowCustomAddress(true);
  }, [setShowCustomAddress]);

  const handleUseMyAddress = useCallback(() => {
    setValue('address', account ?? '', { shouldValidate: true });
    setShowCustomAddress(false);
  }, [setValue, account, setShowCustomAddress]);

  const handleMaxClick = useCallback(() => {
    setValue('amount', formatBalance(unclaimedSWR.data), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [setValue, unclaimedSWR.data]);

  if (account != null && active && !isLoading && activeVesting == null) {
    return <NoProgramStyled>You don&apos;t have a program</NoProgramStyled>;
  }

  return (
    <form onSubmit={handleSubmit(handleClaim)}>
      <InputGroupStyled fullwidth error={errors.amount?.message?.toString()}>
        <Input
          rightDecorator={
            <Button
              size="xxs"
              variant="translucent"
              disabled={unclaimedSWR.data == null}
              onClick={handleMaxClick}
            >
              Max
            </Button>
          }
          fullwidth
          label="Token amount"
          error={errors.amount != null}
          placeholder="0"
          {...register('amount', {
            required: true,
            validate: validateAmount,
          })}
        />
      </InputGroupStyled>

      {showCustomAddress && (
        <InputGroupStyled fullwidth error={errors.address?.message?.toString()}>
          <Input
            fullwidth
            placeholder="0x0"
            label="Claim to address"
            error={errors.address != null}
            {...register('address', {
              required: true,
              validate: validateAddressInput(false),
            })}
          />
        </InputGroupStyled>
      )}

      <FormControls>
        <div>
          See program on{' '}
          <EtherscanLink address={activeVesting?.escrow}>
            Etherscan
          </EtherscanLink>
        </div>
        <div>
          {!showCustomAddress ? (
            <Link
              style={{ textAlign: 'right', cursor: 'pointer' }}
              onClick={handleUseCustomAddress}
            >
              Claim to another address
            </Link>
          ) : (
            <Link
              style={{ textAlign: 'right', cursor: 'pointer' }}
              onClick={handleUseMyAddress}
            >
              Use my address
            </Link>
          )}
        </div>
      </FormControls>

      {active ? (
        <Button fullwidth type="submit" disabled={!isValid}>
          Claim
        </Button>
      ) : (
        <WalletConnect fullwidth />
      )}
    </form>
  );
};
