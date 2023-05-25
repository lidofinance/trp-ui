import { Link } from '@lidofinance/lido-ui';
import { FC, PropsWithChildren, memo, useEffect, useState } from 'react';
import { validateNumericInput } from 'shared/ui';

const getVotingOrigin = (hostname: string) => {
  if (hostname === 'localhost' || hostname.endsWith('.testnet.fi')) {
    return 'https://vote.testnet.fi';
  }
  if (hostname.endsWith('.infra-staging.org')) {
    return 'https://vote.infra-staging.org';
  }
  return 'https://vote.lido.fi';
};

export const VotingLink: FC<PropsWithChildren<{ voteId?: string }>> = memo(
  ({ voteId, children }) => {
    const [href, setHref] = useState('https://vote.lido.fi');

    useEffect(() => {
      const url = new URL(window.location.href);
      const votingOrigin = getVotingOrigin(url.hostname);
      const votingPath =
        voteId == null ||
        voteId === '' ||
        validateNumericInput(voteId, '_internal_') !== true
          ? ''
          : `/vote/${voteId}`;
      setHref(`${votingOrigin}${votingPath}`);
    }, [voteId]);

    return <Link href={href}>{children}</Link>;
  },
);
VotingLink.displayName = 'EtherscanLink';
