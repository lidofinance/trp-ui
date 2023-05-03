import { Container } from '@lidofinance/lido-ui';
import Link from 'next/link';
import styled, { css } from 'styled-components';

export const NAV_MOBILE_MAX_WIDTH = 880;
export const NAV_MOBILE_MEDIA = `@media screen and (max-width: ${NAV_MOBILE_MAX_WIDTH}px)`;
export const NAV_MOBILE_HEIGHT = 60;

export const desktopCss = css`
  margin: 0 46px;
  display: flex;

  svg {
    margin-right: 12px;
  }
`;

const mobileCss = css`
  margin: 0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  background-color: var(--lido-color-foreground);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid var(--lido-color-border);
  height: ${NAV_MOBILE_HEIGHT}px;

  svg {
    margin-right: 0;
    margin-bottom: 7px;
  }
`;

export const Nav = styled.div`
  ${desktopCss}
  // mobile kicks in on a bit higher width for nav
  ${NAV_MOBILE_MEDIA} {
    ${mobileCss}
  }
  z-index: 6;
`;

export const NavLink = styled(Link)<{ $active?: boolean }>`
  color: var(--lido-color-secondary);
  font-size: ${({ theme }) => theme.fontSizesMap.xxxs}px;
  line-height: 1.7em;
  font-weight: 800;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  text-decoration: none !important;
  letter-spacing: 0.04em;
  opacity: ${(props) => (props.$active ? 1 : 0.8)};

  :hover {
    opacity: 1;
    color: var(--lido-color-secondary);
  }

  :visited {
    color: var(--lido-color-secondary);
  }

  :not(:last-of-type) {
    margin-right: 32px;
  }

  svg {
    fill: ${({ $active }) =>
      $active ? `var(--lido-color-primary)` : `var(--lido-color-secondary)`};
  }

  ${NAV_MOBILE_MEDIA} {
    flex-direction: column;
    text-transform: none;
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSizesMap.xxxs}px;
    line-height: 1.2em;
    letter-spacing: 0;
  }
`;

export const HeaderStyle = styled(Container)`
  padding-top: 18px;
  padding-bottom: 18px;
  display: flex;
  align-items: center;
`;

export const HeaderLogoStyle = styled.div`
  overflow: hidden;
  flex-shrink: 0;
  margin-right: ${({ theme }) => theme.spaceMap.xxl}px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 14px;
  }
`;

export const HeaderActionsStyle = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-shrink: 1;
  overflow: hidden;
`;
