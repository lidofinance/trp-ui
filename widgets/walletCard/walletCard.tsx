import {
  WalletCardStyle,
  WalletCardRowStyle,
  WalletCardBalanceStyle,
  WalletCardTitleStyle,
  WalletCardValueStyle,
  WalletCardExtraStyle,
  WalletCardContentStyle,
} from './walletCardStyles';
import { InlineLoader } from '@lidofinance/lido-ui';
import {
  WalletCardBalanceComponent,
  WalletCardComponent,
  WalletCardRowComponent,
} from './types';

export const WalletCard: WalletCardComponent = (props) => {
  return <WalletCardStyle color="accent" {...props} />;
};

export const WalletCardRow: WalletCardRowComponent = (props) => {
  return <WalletCardRowStyle {...props} />;
};

export const WalletCardBalance: WalletCardBalanceComponent = (props) => {
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
    <WalletCardBalanceStyle {...rest}>
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
};
