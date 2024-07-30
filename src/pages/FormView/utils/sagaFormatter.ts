import { INITIAL_PREFETCH } from "../constants/formState";

export const populatePrefetch = (payload: Record<string, any>): typeof INITIAL_PREFETCH => {
    const result = { ...INITIAL_PREFETCH };
  
    for (const key in INITIAL_PREFETCH) {
      if (key in INITIAL_PREFETCH && key in payload) {
        result[key as keyof typeof INITIAL_PREFETCH] = payload[key].map((item: any) => {
          // Handle special case for data items
          // if (key === 'airlines') {
          //   return { code: item.code, name: item.name };
          // } else if (key === 'isdCodes') {
          //   return { code: item.code, country: item.country };
        });
      }
    }
    return result;
  }