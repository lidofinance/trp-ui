import styled from 'styled-components';

import { LocalLink } from 'shared/ui/local-link';

export const SwitchWrapper = styled.div`
  width: 208px;
  height: 44px;
  background-color: var(--lido-color-backgroundDarken);
  border-radius: 22px;
  position: relative;
  :hover {
    cursor: pointer;
  }
  display: flex;
  justify-content: space-around;
  align-items: center;
  user-select: none;
  margin: 0 auto 24px auto;
`;

export const Handle = styled.div<{ $checked: boolean }>`
  width: 102px;
  height: 40px;
  background-color: var(--lido-color-foreground);
  border-radius: 20px;
  position: absolute;
  left: ${({ $checked }) => ($checked ? 'calc(100% - 104px)' : '2px')};
  transition: left 0.3s ease;
  top: 2px;
  z-index: 1;
`;

// see: https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#link-component
export const SwitchItemStyled = styled(LocalLink)<{ $active: boolean }>`
  z-index: 2;
  margin: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  transition: opacity 0.3s ease;
  line-height: 1.6em;
  text-decoration: none;
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;

  color: var(--lido-color-text);

  &:hover {
    color: var(--lido-color-text);
    opacity: 1;
  }

  &:visited {
    color: var(--lido-color-text);
  }
`;
