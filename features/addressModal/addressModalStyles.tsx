import styled from 'styled-components';

export const AddressModalAccountStyle = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 0;
  padding-right: 4px;
  text-align: center;
  margin: ${({ theme }) => theme.spaceMap.xs}px 0;
  background: var(--lido-color-background);
  color: var(--lido-color-textSecondary);
  border-radius: ${({ theme }) => theme.borderRadiusesMap.xl}px;
`;

export const AddressModalAddressStyle = styled.div`
  margin-left: ${({ theme }) => theme.spaceMap.xs}px;
  font-size: ${({ theme }) => theme.fontSizesMap.xs}px;
  line-height: 1.2em;
  font-weight: 400;
  width: 100%;
`;

export const AddressModalActionsStyle = styled.div`
  margin: 0 ${({ theme }) => -theme.spaceMap.sm}px;
  margin-top: ${({ theme }) => theme.spaceMap.md}px;

  button {
    padding-left: ${({ theme }) => theme.spaceMap.sm}px;
    padding-right: ${({ theme }) => theme.spaceMap.sm}px;
    margin-right: ${({ theme }) => theme.spaceMap.sm}px;
  }
`;
