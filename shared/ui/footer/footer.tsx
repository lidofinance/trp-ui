import { FC } from 'react';
import { Link } from '@lidofinance/lido-ui';
import {
  FooterStyle,
  FooterItemStyle,
  PrivacyNoticeContainer,
  PrivacyNoticeText,
} from './styles';

export const Footer: FC = () => (
  <footer>
    <PrivacyNoticeContainer size="full">
      <PrivacyNoticeText>
        Your privacy matters. We use cookieless analytics and collect only
        anonymized data for improvements. Cookies are used for functionality
        only. For more info read{' '}
        <Link href="https://lido.fi/privacy-notice">Privacy Notice</Link>.
      </PrivacyNoticeText>
    </PrivacyNoticeContainer>
    <FooterStyle size="full">
      <FooterItemStyle>
        <Link href="https://lido.fi/privacy-notice">Privacy Notice</Link>
      </FooterItemStyle>
      <FooterItemStyle>
        <Link href="https://lido.fi/terms-of-use">Terms of Use</Link>
      </FooterItemStyle>
    </FooterStyle>
  </footer>
);
