import styled from 'styled-components';

export const AddressBadgeWrapper = styled.div`
  margin-left: auto;
  cursor: pointer;
`;

export const AmountTitle = styled.div`
  margin-bottom: 2px;
`;

export const SecondaryText = styled.span`
  opacity: 50%;
`;

export const TokensAmount = styled.span`
  font-size: ${({ theme }) => theme.fontSizesMap.sm}px;
  font-weight: 700;
`;
