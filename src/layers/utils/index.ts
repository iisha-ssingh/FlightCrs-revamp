export type FunctionType = (...args: any[]) => any;

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

export type JsonArray = Array<
    string | number | boolean | undefined | ObjectType | null | JsonArray
>;

export type JsonObjectType = {
    [key: string | number]:
        | string
        | number
        | boolean
        | JsonArray
        | JsonObjectType
        | undefined
        | null;
};
