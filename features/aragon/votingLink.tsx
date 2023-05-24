import { Link } from '@lidofinance/lido-ui';
import { FC, PropsWithChildren, memo, useEffect, useState } from 'react';
import { validateNumericInput } from '../../shared/ui/inputValidators';

export const VotingLink: FC<PropsWithChildren<{ voteId?: string }>> = memo(
  ({ voteId, children }) => {
    const [href, setHref] = useState('https://vote.lido.fi');

    useEffect(() => {
      const url = new URL(window.location.href);
      const tld =
        url.hostname === 'localhost'
          ? 'lido.fi'
          : url.hostname.split('.').slice(-2).join('.');
      const path =
        voteId == null ||
        voteId === '' ||
        validateNumericInput(voteId, '_internal_') !== true
          ? ''
          : `/vote/${voteId}`;
      setHref(`https://vote.${tld}${path}`);
    }, [voteId]);

    return <Link href={href}>{children}</Link>;
  },
);
VotingLink.displayName = 'EtherscanLink';
