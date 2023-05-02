import {
  WalletCardBalanceStyle,
  WalletCardTitleStyle,
  WalletCardValueStyle,
  WalletCardExtraStyle,
  WalletCardContentStyle,
} from './walletCardStyles';
import { InlineLoader } from '@lidofinance/lido-ui';
import { ComponentProps, forwardRef } from 'react';

export type WalletCardBalanceProps = Omit<ComponentProps<'div'>, 'title'> & {
  title: React.ReactNode;
  value: React.ReactNode;
  small?: boolean;
  loading?: boolean;
  extra?: React.ReactNode;
};

export const WalletCardBalance = forwardRef<
  HTMLDivElement,
  WalletCardBalanceProps
>((props, ref) => {
  const {
    title,
    small = false,
    extra,
    loading = false,
    children,
    value,
    ...rest
  } = props;

  const hasExtra = !!extra;
  const hasChildren = !!children;

  return (
    <WalletCardBalanceStyle {...rest} ref={ref}>
      <WalletCardTitleStyle>{title}</WalletCardTitleStyle>
      <WalletCardValueStyle $small={small}>
        {loading ? <InlineLoader /> : value}
      </WalletCardValueStyle>
      {hasExtra && (
        <WalletCardExtraStyle>
          {loading ? <InlineLoader /> : extra}
        </WalletCardExtraStyle>
      )}
      {hasChildren && (
        <WalletCardContentStyle $hidden={loading}>
          {children}
        </WalletCardContentStyle>
      )}
    </WalletCardBalanceStyle>
  );
});
WalletCardBalance.displayName = 'WalletCardBalance';
