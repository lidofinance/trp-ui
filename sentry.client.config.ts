// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { mask } from 'features/sanitizer';

const allowedIntegrations = [
  'InboundFilters',
  'FunctionToString',
  'TryCatch',
  // "Breadcrumbs" will be configured later 👇
  'GlobalHandlers',
  'LinkedErrors',
  // "HttpContext" must be disabled
  'Dedupe',
  // "RequestData" must be disabled
];

Sentry.init({
  dsn: 'https://aa336f6d740f4ed5a7ca4e8c9d4bde1a@o1007086.ingest.sentry.io/4505193744564224',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  integrations: (integrations) => [
    ...integrations.filter((integration) =>
      allowedIntegrations.includes(integration.name),
    ),
    new Sentry.Integrations.Breadcrumbs({
      console: false, // must be disabled
      dom: true,
      fetch: true,
      history: true,
      sentry: true,
      xhr: true,
    }),
  ],
  /*
   * We can only mask exact properties,
   * because there are circular references in event,
   * which breaks satanizer.
   */
  beforeSend: (event) => {
    return {
      ...event,
      exception: mask(event.exception),
      breadcrumbs: mask(event.breadcrumbs),
      tags: mask(event.tags),
    };
  },
  beforeSendTransaction: (event) => {
    return {
      ...event,
      spans: event.spans?.map((span) => {
        span.description = mask(span.description);
        span.data = mask(span.data);
        return span;
      }),
      breadcrumbs: mask(event.breadcrumbs),
      tags: mask(event.tags),
    };
  },
});
