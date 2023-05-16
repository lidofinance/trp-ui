import { Main } from 'shared/ui';
import styled from 'styled-components';

export const AragonWalletStyle = styled(Main.Wallet)`
  background: radial-gradient(
      79% 79% at 23.39% 93.6%,
      #526fff 0%,
      rgba(92, 118, 243, 0) 100%
    ),
    linear-gradient(303.88deg, #01dcfa 30.03%, #010a0a 94.79%);
`;

export const AddressBadgeWrapper = styled.div`
  margin-left: auto;
  cursor: pointer;
`;
