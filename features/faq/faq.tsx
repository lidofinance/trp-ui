import { Accordion } from '@lidofinance/lido-ui';
import { memo } from 'react';

export const FAQ = memo(() => {
  return (
    <>
      <Accordion defaultExpanded summary="What is TRP?">
        <p>
          Lido Token Rewards Plan (TRP) is aimed at awarding Lido DAO
          contributors with Lido Governance tokens (LDO) for their efforts and
          long game with Lido DAO. Learn more{' '}
          <a
            href="https://research.lido.fi/t/lidodao-token-rewards-plan-trp/3364"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>
      </Accordion>
    </>
  );
});

FAQ.displayName = 'FAQ';
