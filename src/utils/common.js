
export const httpStatusCodes = {
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
  };

export function getObjectValue(obj, key, defaultValue = null) {
    let enumerator = obj;
    let property = key;
  
    if (isEnumerable(enumerator) && keyExists(property, enumerator)) {
      return enumerator[property];
    }
  
    const dotLastIndex = property.lastIndexOf('.');
  
    if (dotLastIndex >= 0) {
      const withoutLastKey = property.substr(0, dotLastIndex);
      enumerator = getObjectValue(enumerator, withoutLastKey, defaultValue);
      property = property.substr(dotLastIndex + 1);
    }
  
    if (isEnumerable(enumerator)) {
      return keyExists(property, enumerator)
        ? enumerator[property]
        : defaultValue;
    }
    return defaultValue;
  }

  export function isEmpty(obj) {
    let isEmptyValue = false;
    const type = typeof obj;
  
    isEmptyValue = isEmptyValue || !obj;
    isEmptyValue = isEmptyValue || type === 'undefined'; // if it is undefined
    isEmptyValue = isEmptyValue || obj === null; // if it is null
    isEmptyValue = isEmptyValue || (type === 'string' && obj === ''); // if the string is empty
    isEmptyValue = isEmptyValue || obj === false || obj === 0; // if boolean value returns false
    isEmptyValue = isEmptyValue || (Array.isArray(obj) && obj.length === 0); // if array is empty
    isEmptyValue =
      isEmptyValue || (type === 'object' && Object.keys(obj).length === 0); // if object is empty
  
    return isEmptyValue;
  }