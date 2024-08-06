/*eslint-disable no-console */

enum LogLevel {
  OFF,
  ERROR,
  WARN,
  INFO,
  LOG,
}

function setLogLevel(logLevel: LogLevel) {
  const error = console.error;
  console.error = function () {
    if (logLevel >= LogLevel.ERROR) {
      error.apply(console, Array.from(arguments)); //eslint-disable-line prefer-rest-params
    }
  };

  const warn = console.warn;
  console.warn = function () {
    if (logLevel >= LogLevel.WARN) {
      warn.apply(console, Array.from(arguments)); //eslint-disable-line prefer-rest-params
    }
  };

  const info = console.info;
  console.info = function () {
    if (logLevel >= LogLevel.INFO) {
      info.apply(console, Array.from(arguments)); //eslint-disable-line prefer-rest-params
    }
  };

  const log = console.log;
  console.log = function () {
    if (logLevel >= LogLevel.LOG) {
      log.apply(console, Array.from(arguments)); //eslint-disable-line prefer-rest-params
    }
  };
}

const logError = (msg: string, error: any) => {
  console.error(msg, error);
  // TODO: report error somewhere (Sentry)
};

export { setLogLevel, LogLevel, logError };
