import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { Fonts, LidoUIHead } from '@lidofinance/lido-ui';
import { ServerStyleSheet } from 'styled-components';
import { dynamics } from '../config';

const metaTitle = 'TRP UI | Lido';
const metaDescription = 'Lido Token Rewards Plan for the contributors.';

const CustomDocument = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="favicon-512x512.svg" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="194x194"
          href="/favicon-194x194.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <link rel="manifest" href="/manifest.json" />

        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="currentChain" content={String(dynamics.defaultChain)} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:site" content="@lidofinance" />
        <meta name="twitter:creator" content="@lidofinance" />

        <Fonts />
        <LidoUIHead />
        <script src="/runtime/window-env.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

CustomDocument.getInitialProps = async (
  ctx: DocumentContext,
): Promise<DocumentInitialProps> => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    sheet.seal();
  }
};

export default CustomDocument;
