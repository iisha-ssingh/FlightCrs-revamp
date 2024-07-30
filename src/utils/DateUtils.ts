import { date, DateFormat, DateUnit, ExcludeDateUnit, FDate } from './Date';

/**
 * Here there is a special handling of format, if the date is null emptyString is returned
 * Used in UI
 */

function formattedDate(dateObj?: string, format = DateFormat.STANDARD_FORMAT) {
  return dateObj ? date(dateObj)?.format(format) : '';
} // example output: "15 Jul, 2023"


//function to be used to format date to send in the API
function getApiDateFormat(dateObj: string, isMonth = false) {
  return date(dateObj)?.format(
    isMonth ? DateFormat.API_FORMAT_WITHOUT_DAY : DateFormat.API_FORMAT
  );
} // example output : "2023-07-15"

const DeviceTimeFormat = (() => {
  const is24HourEnabled = false; // fixme
  return {
    updateStatus: () => {
      //todo: this handling needs to be reverted for inconsistencies
      // is24HourEnabled = uses24HourClock();
    },
    is24Hour: () => {
      return is24HourEnabled;
    },
    getFormat: () => {
      return is24HourEnabled
        ? DateFormat.TIME_FORMAT_24
        : DateFormat.TIME_FORMAT_12;
    },
  };
})();

function getApiTimeFormat(
  time: string | null,
  localeTimeFormat = DeviceTimeFormat.getFormat()
) {
  return time
    ? date(time, localeTimeFormat)?.format(DateFormat.API_TIME_FORMAT)
    : null;
}

function formattedTime(
  time: string,
  timeFormat = DateFormat.TIME_FORMAT_12,
  localeTimeFormat = DeviceTimeFormat.getFormat()
) {
  return time ? date(time, timeFormat)?.format(localeTimeFormat) : '';
}

const getTimeStamp = (
  dateObj: string,
  dateFormat: DateFormat,
  time: string,
  timeFormat: DateFormat,
  nextDay: boolean,
  addTimeZone = true
) => {
  if (dateObj && dateFormat && time && timeFormat) {
    const dayCount = nextDay ? 1 : 0;
    const dateObject = date(
      `${dateObj} ${time}`,
      `${dateFormat} ${timeFormat}`
    )?.add(dayCount, DateUnit.DAY);
    return addTimeZone
      ? dateObject?.utcOffset('+05:30', true)?.format()
      : dateObject?.format(DateFormat.YYYY_MM_DD_T_HH_MM_SS);
  }
  return null;
};

type GetDateRangeType = {
  start: FDate;
  end: FDate;
  step?: number;
  unit?: ExcludeDateUnit;
  dateFormat?: DateFormat;
  d?: '()' | '[]' | '[)' | '(]';
};

const getDateRange = ({
  start,
  end,
  step = 1,
  unit = DateUnit.DAY,
  dateFormat = DateFormat.API_FORMAT,
  d = '[]',
}: GetDateRangeType): Array<string> => {
  if (!start || !end) {
    throw new Error('Please enter a start and end date to calculate the range');
  }
  const range: string[] = [];
  const currentValue = start.clone();
  while (currentValue.isSameOrBefore(end)) {
    if (currentValue.isBetween(start, end, unit, d)) {
      range.push(currentValue.format(dateFormat));
    }
    currentValue.add(step, unit);
  }
  return range;
};

const DateUtil = {
  formattedDate,
  formattedTime,
  getApiDateFormat,
  getApiTimeFormat,
  getTimeStamp,
  getDateRange,
};

export { DateUtil, DeviceTimeFormat };
