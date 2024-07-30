
export const httpStatusCodes = {
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

export function isEmpty(obj: unknown): boolean {
  let isEmptyValue = false;
  const type = typeof obj;

  isEmptyValue = isEmptyValue || !obj;
  isEmptyValue = isEmptyValue || type === 'undefined'; // if it is undefined
  isEmptyValue = isEmptyValue || obj === null; // if it is null
  isEmptyValue = isEmptyValue || (type === 'string' && obj === ''); // if the string is empty
  isEmptyValue = isEmptyValue || obj === false || obj === 0; // if boolean value returns false
  isEmptyValue = isEmptyValue || (Array.isArray(obj) && obj.length === 0); // if array is empty
  isEmptyValue =
    isEmptyValue || (type === 'object' && Object.keys(obj as object).length === 0); // if object is empty

  return isEmptyValue;
}

export const pathOr = <T>(initial: T, str: string, obj: Record<string, any>): T => {
  const arr = str.split('.');
  let retVal: any = initial;
  try {
    for (const key of arr) {
      retVal = obj[key];
      if (retVal === undefined || retVal === null) {
        return initial;
      }
      obj = retVal;
    }
  } catch (e) {
    retVal = initial;
  }
  return retVal as T;
};

export const isFunction = (value: unknown): value is Function =>
  typeof value === 'function';

export const isObject = (value: unknown): value is object =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

export const isArray = (value: unknown): value is Array<unknown> =>
  Array.isArray(value);

export const isBoolean = (value: unknown): boolean => [
  typeof value === 'boolean',
  value === 'true',
  value === 'false',
  value === 0,
  value === 1,
  value === '0',
  value === '1'
].some(Boolean);

export const scrollToTop = (): void => {
  setTimeout(function () {
    window.scrollTo(0, 1);
  });
};

export function capitalizeFirstLetter(string: string): string {
  if (!string) {
    return string;
  }
  let formattedString = string.toLowerCase();
  return formattedString[0].toUpperCase() + formattedString.slice(1);
}