import { Container } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const MainStyle = styled(Container)`
  position: relative;
  margin-top: ${({ theme }) => theme.spaceMap.sm}px;
  margin-bottom: ${({ theme }) => theme.spaceMap.sm}px;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  alight-items: center;
`;
