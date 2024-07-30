import dayjs, { Dayjs, OpUnitType } from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

enum DateUnit {
  MILLI_SECOND = "millisecond",
  SECOND = "second",
  MINUTE = "minute",
  HOUR = "hour",
  DAY = "day",
  MONTH = "month",
  YEAR = "year",
  DATE = "date",
}

export type ExcludeDateUnit = Exclude<DateUnit, DateUnit.DATE>;

enum DateFormat {
  STANDARD_FORMAT = "DD MMM, YYYY",
  API_FORMAT = "YYYY-MM-DD",
  API_FORMAT_WITHOUT_DAY = "YYYY-MM",
  DATE_FORMAT_FOR_TRIPS = "DD MMM'YY",
  HOTEL_CHECK_IN_DATE_FORMAT = "ddd, DD MMM",
  FULL_MONTH_NAME = "MMMM",
  MONTH_YEAR = "MMMM YYYY",
  TIME_FORMAT_24 = "HH:mm",
  TIME_FORMAT_12 = "hh:mm A",
  API_TIME_FORMAT = "hh:mm A",
  MONTH_WITH_YEAR = "MMM 'YY",
  CANCELLATION_DATE_FORMAT = "DD MMM YYYY",
  DATE = "DD",
  MONTH = "MMM",
  YEAR = "YY",
  H_A = "h A",
  DD_MMM = "DD MMM",
  DD_MMM_YY = "DD MMM YY",
  WW_DD_MMM = "ddd, DD MMM",
  WW_DD_MMM_YY = "ddd, DD MMM'YY",
  YYYY_MM_DD_T_HH_MM = "YYYY-MM-DDTHH:mm",
  YYYY_MM_DD_T_HH_MM_SS = "YYYY-MM-DDTHH:mm:ss",
}

/**
 * Wrapper class for the date library being used, currently - dayjs
 */
class FDate {
  private dateObject: Dayjs;

  constructor(date?: string | number | Date, format?: string) {
    this.dateObject = dayjs(date, format);
  }

  /**
   * return new object of the current object.
   */
  clone(): FDate {
    return new FDate(this.dateObject.clone().toDate());
  }

  /**
   * Returns the date string formatted with the given format
   */
  format(format?: DateFormat): string {
    return this.dateObject.format(format);
  }

  utcOffset(time: number | string, keepLocalTime?: boolean): this {
    this.dateObject = this.dateObject.utcOffset(time, keepLocalTime);
    return this;
  }

  unix(): number {
    return this.dateObject.unix();
  }

  toDate(): Date {
    return this.dateObject.toDate();
  }

  /**
   * @returns {FDate} same object with the unit subtracted
   */
  subtract(interval: number, dateUnit: ExcludeDateUnit): this {
    this.dateObject = this.dateObject.subtract(interval, dateUnit);
    return this;
  }

  /**
   * @returns {FDate} same object with the unit added
   */
  add(interval: number, dateUnit: ExcludeDateUnit): this {
    this.dateObject = this.dateObject.add(interval, dateUnit);
    return this;
  }

  isSame(date: FDate | string | number | Date, dateUnit?: DateUnit): boolean {
    if (date instanceof FDate) {
      return this.dateObject.isSame(date.dateObject, dateUnit);
    }
    return this.dateObject.isSame(date, dateUnit);
  }

  isAfter(date: FDate | string | number | Date, dateUnit?: DateUnit): boolean {
    if (date instanceof FDate) {
      return this.dateObject.isAfter(date.dateObject, dateUnit);
    }
    return this.dateObject.isAfter(date, dateUnit);
  }

  isBefore(date: FDate | string | number | Date, dateUnit?: DateUnit): boolean {
    if (date instanceof FDate) {
      return this.dateObject.isBefore(date.dateObject, dateUnit);
    }
    return this.dateObject.isBefore(date, dateUnit);
  }

  diff(date: FDate | string | number | Date, dateUnit?: DateUnit): number {
    if (date instanceof FDate) {
      return this.dateObject.diff(date.dateObject, dateUnit);
    }
    return this.dateObject.diff(date, dateUnit);
  }

  get(dateUnit: DateUnit): number {
    return this.dateObject.get(dateUnit);
  }

  /**
   * @param seconds second of the minute, 0-59.
   * @param minutes minute of the hour, 0-59
   * @param hours hour of the day, 0-23,
   * @param date date of the month, 1-31
   * @param month month of the year, 0-11
   * @param year
   * @returns {FDate} same object with modified params
   */
  set({
    seconds,
    minutes,
    hours,
    date,
    month,
    year,
  }: {
    seconds?: number;
    minutes?: number;
    hours?: number;
    date?: number;
    month?: number;
    year?: number;
  }): this {
    const currDate = this.dateObject;
    this.dateObject = currDate
      .second(seconds ?? currDate.second())
      .minute(minutes ?? currDate.minute())
      .hour(hours ?? currDate.hour())
      .date(date ?? currDate.date())
      .month(month ?? currDate.month())
      .year(year ?? currDate.year());
    return this;
  }

  /**
   * @returns {FDate} with time set to the start of the day, i.e., 00AM
   */
  atStartOfTheDay(): this {
    return this.set({ seconds: 0, minutes: 0, hours: 0 });
  }

  isBetween(
    first: FDate | string | number | Date,
    second: FDate | string | number | Date,
    opUnitType?: OpUnitType,
    d: "()" | "[]" | "[)" | "(]" = "[)",
  ) {
    if (first instanceof FDate && second instanceof FDate) {
      return this.dateObject.isBetween(
        first.dateObject,
        second.dateObject,
        opUnitType,
        d,
      );
    }
    //FIXME: ts error related to Fdate
    //@ts-ignore
    return this.dateObject.isBetween(first, second, opUnitType, d);
  }

  startOf(dateUnit: DateUnit): FDate {
    this.dateObject = this.dateObject.startOf(dateUnit);
    return this.clone();
  }

  endOf(dateUnit: DateUnit): FDate {
    this.dateObject = this.dateObject.endOf(dateUnit);
    return this.clone();
  }

  valueOf(): number {
    return this.dateObject.valueOf();
  }

  isSameOrBefore(
    date: FDate | string | number | Date,
    dateUnit?: DateUnit,
  ): boolean {
    if (date instanceof FDate) {
      return this.dateObject.isSameOrBefore(date.dateObject, dateUnit);
    }
    return this.dateObject.isSameOrBefore(date, dateUnit);
  }
}

const date = (
  obj?: string | number | Date,
  format?: DateFormat | string,
): FDate | null => {
  if (!obj && format) {
    return null;
  } else if (!obj && !format) {
    return new FDate();
  } else {
    return new FDate(obj, format);
  }
};

export { DateUnit, DateFormat, date, FDate };
