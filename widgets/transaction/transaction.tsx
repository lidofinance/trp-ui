import {
  TransactionResponse,
  TransactionReceipt,
} from '@ethersproject/abstract-provider';
import {
  toast,
  ToastError,
  ToastPending,
  ToastSuccess,
} from '@lidofinance/lido-ui';
import { CHAINS } from 'shared/ui/chains';
import { runWithTransactionLogger } from 'shared/ui/logger';
import {
  TransactionToast,
  TransactionToastEtherscan,
} from './transactionToast';
import { errors } from 'ethers';

interface EthersError extends Error {
  action: string;
  code: errors;
  reason: string;
  transaction: Record<string, unknown>;
}

const isEthersError = (error: Error): error is EthersError => {
  return error instanceof Error && (error as EthersError)?.code != null;
};

const showError = (error: Error | string | unknown) => {
  if (error instanceof Error && isEthersError(error)) {
    switch (error.code) {
      // Cases with empty body will be handeled by fallback
      case errors.UNKNOWN_ERROR:
      case errors.NOT_IMPLEMENTED:
      case errors.UNSUPPORTED_OPERATION:
        break;
      case errors.NETWORK_ERROR:
        ToastError(
          'There are some networking issues, try again in a few minutes',
        );
        return;
      case errors.SERVER_ERROR:
        break;
      case errors.TIMEOUT:
        ToastError('Operation timed out, try again in a few minutes');
        return;
      case errors.BUFFER_OVERRUN:
      case errors.NUMERIC_FAULT:
      case errors.MISSING_NEW:
        break;
      case errors.INVALID_ARGUMENT:
        ToastError('Provided arguments are incorrect, check all inputs');
        return;
      case errors.UNEXPECTED_ARGUMENT:
        // Probably some issue with code 🤔
        break;
      case errors.CALL_EXCEPTION:
        break;
      case errors.INSUFFICIENT_FUNDS:
        ToastError('Trasnaction was rejected because of insufficient funds');
        return;
      case errors.NONCE_EXPIRED:
      case errors.REPLACEMENT_UNDERPRICED:
        break;
      case errors.UNPREDICTABLE_GAS_LIMIT:
        ToastError("Can't estimate gas limit, try again in a few minutes");
        return;
      case errors.ACTION_REJECTED:
        ToastError('Transaction was aborted by the wallet');
        return;
    }
  }
  if (error instanceof String) {
    ToastError(error);
    return;
  }
  ToastError('Transaction error');
};

export const transaction = async <T extends TransactionReceipt>(
  name: string,
  chainId: CHAINS,
  callback: () => Promise<TransactionResponse>,
): Promise<T | undefined> => {
  let pendingToastId = null;
  let result: T | undefined = undefined;

  try {
    pendingToastId = ToastPending(
      <TransactionToast title="Awaiting signing">
        Confirm this transaction in your wallet
      </TransactionToast>,
    );

    const transaction = await runWithTransactionLogger(
      `${name} signing`,
      callback,
    );

    toast.dismiss(pendingToastId);

    pendingToastId = ToastPending(
      <TransactionToastEtherscan
        title="Awaiting block confirmation"
        chainId={chainId}
        hash={transaction.hash}
      />,
    );

    result = (await runWithTransactionLogger(`${name} block confirmation`, () =>
      transaction.wait(),
    )) as T;

    toast.dismiss(pendingToastId);

    ToastSuccess(
      <TransactionToastEtherscan
        title="Block confirmation received"
        chainId={chainId}
        hash={transaction.hash}
      />,
    );
  } catch (error) {
    if (pendingToastId) toast.dismiss(pendingToastId);
    showError(error);
  }

  return result;
};
