import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  svg {
    box-sizing: content-box;
  }

  html,
  body {
    width: 100%;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    position: relative;
    box-sizing: border-box;
    font-size: ${({ theme }) => theme.fontSizesMap.xs}px;
    line-height: 150%;
    text-size-adjust: none;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
    }

    &:visited {
      color: ${({ theme }) => theme.colors.primaryVisited};
    }
  }

  input:-webkit-autofill{
    -webkit-text-fill-color: var(--lido-color-text) !important;
  }

`;
