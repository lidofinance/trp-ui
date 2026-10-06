import { Container } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const FooterStyle = styled((props) => <Container {...props} />)`
  color: var(--lido-color-text);
  display: flex;
  flex-wrap: wrap;
  padding-top: 25px;
  padding-bottom: 25px;
  height: 70px;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 60px;
  }
`;

export const FooterItemStyle = styled.span`
  font-size: ${({ theme }) => theme.fontSizesMap.xxs}px;
  line-height: 20px;
  color: var(--lido-color-textSecondary);
  font-weight: 400;

  a,
  a:visited {
    text-decoration: none;
    color: var(--lido-color-textSecondary);

    &:hover {
      color: var(--lido-color-text);
      opacity: 1;
    }
  }

  &:not(:last-of-type):after {
    content: '|';
    padding: 0 8px;
  }
`;

export const PrivacyNoticeContainer = styled((props) => (
  <Container {...props} />
))`
  padding-top: 24px;
`;

export const PrivacyNoticeText = styled.p`
  margin: 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizesMap.xxs}px;
  line-height: 20px;
  color: var(--lido-color-textSecondary);

  a,
  a:visited {
    color: var(--lido-color-textSecondary);
    text-decoration: underline;

    &:hover {
      color: var(--lido-color-text);
    }
  }
`;
