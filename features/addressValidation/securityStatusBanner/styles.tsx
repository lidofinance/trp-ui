import styled from 'styled-components';
import { Text } from '@lidofinance/lido-ui';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  padding: 0px;

  button {
    white-space: unset;
  }

  a {
    align-self: stretch;
    width: 100%;
  }
`;

export const WarningText = styled(Text).attrs({
  weight: 700,
})`
  font-size: 26px;
  text-align: center;
  margin: 12px 0 28px;
  text-wrap: balance;
`;

export const WarningBlock = styled.p`
  text-align: center;
  margin: 12px 0 28px;
`;
