import { FC, useCallback, useEffect, useState } from 'react';
import {
  useVestingClaim,
  useVestingsContext,
  useVestingUnclaimed,
} from 'features/vesting';
import { Button, Input, Link } from '@lidofinance/lido-ui';
import { useWeb3 } from 'reef-knot';
import {
  InputGroupStyled,
  validateAddressInput,
  validateNumericInput,
  EtherscanLink,
} from 'shared/ui';
import { useForm } from 'react-hook-form';
import { BigNumber } from 'ethers';
import { FormControls } from './claimFormStyles';
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
    formState: { isDirty, isValid, errors },
  } = useForm<ClaimFormData>({ mode: 'onChange' });

  const { account } = useWeb3();
  const [showCustomAddress, setShowCustomAddress] = useState(false);
  const { activeVesting, resetCache } = useVestingsContext();
  const unclaimedSWR = useVestingUnclaimed(activeVesting?.escrow);
  const claim = useVestingClaim(activeVesting?.escrow);

  // Initialize address value with current account
  useEffect(() => {
    if (account != null) {
      setValue('address', account);
    }
  }, [setValue, account]);

  // Validate form if vestings changes
  useEffect(() => {
    if (isDirty) {
      setValue('amount', '');
    }
  }, [setValue, isDirty, activeVesting]);

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
      resetCache();
    },
    [claim, resetCache],
  );

  const handleUseCustomAddress = useCallback(() => {
    setValue('address', '');
    setShowCustomAddress(true);
  }, [setValue]);

  const handleUseMyAddress = useCallback(() => {
    setValue('address', account ?? '', { shouldValidate: true });
    setShowCustomAddress(false);
  }, [setValue, account]);

  const handleMaxClick = useCallback(() => {
    setValue('amount', formatBalance(unclaimedSWR.data), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [setValue, unclaimedSWR.data]);

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

      <Button fullwidth type="submit" disabled={!isValid}>
        Claim
      </Button>
    </form>
  );
};
