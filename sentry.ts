import * as Sentry from '@sentry/react';

Sentry.init({
  //TODO: Add sentry dsn to .env file
  dsn: 'https://b8f18dfd61547b140e4117cb682f7b40@o137260.ingest.us.sentry.io/4507707798454272',
  integrations: [
    // See docs for support of different versions of variation of react router
    // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
    Sentry.replayIntegration(),
  ],

  tracesSampleRate: 0.7,

  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
