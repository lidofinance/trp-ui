import styled from 'styled-components';
import { InputGroup } from '@lidofinance/lido-ui';

export const InputGroupStyled = styled(InputGroup)`
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;

  span:nth-of-type(2) {
    // hack for tooltip
    z-index: 1;
  }

  label > span {
    // hack for old ui lib
    border-bottom-left-radius: ${({ theme }) =>
      theme.borderRadiusesMap.lg}px !important;
    border-bottom-right-radius: ${({ theme }) =>
      theme.borderRadiusesMap.lg}px !important;
    border-top-right-radius: ${({ theme }) =>
      theme.borderRadiusesMap.lg}px !important;
    border-top-left-radius: ${({ theme }) =>
      theme.borderRadiusesMap.lg}px !important;
  }
`;
