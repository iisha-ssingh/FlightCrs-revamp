import { Identify, identify, track } from '@amplitude/analytics-browser';

const loggingServices = {
  AMPLITUDE: 'AMPLITUDE',
} as const;

type LoggingServiceKeys = keyof typeof loggingServices;
type LoggingServiceValues = typeof loggingServices[LoggingServiceKeys];

const allServices: Record<LoggingServiceValues, boolean> = Object.keys(loggingServices)
  .reduce((acc, key) => {
    acc[loggingServices[key as LoggingServiceKeys]] = true;
    return acc;
  }, {} as Record<LoggingServiceValues, boolean>);

export type ObjectType = {
  [key: string | number]:
    | string
    | number
    | boolean
    | Array<any>
    | FunctionType
    | ObjectType
    | undefined
    | null;
};

export type FunctionType = (...args: any[]) => any;

export function events(
  event: string,
  args?: ObjectType,
  logTo: Record<LoggingServiceValues, boolean> = allServices
): void {
  args = filterNonNull(args ?? { timestamp: Date.now() });
  if (logTo[loggingServices.AMPLITUDE]) {
    try {
      track(event?.toLowerCase(), args);
    } catch (error) {
      console.log('An error occurred in dataLayer event push: ', error);
    }
  }
}

function filterNonNull(object: ObjectType): ObjectType {
  const filteredEntries = Object.entries(object).filter(
    ([, value]) => value != null,
  );
  return Object.fromEntries(filteredEntries);
}
