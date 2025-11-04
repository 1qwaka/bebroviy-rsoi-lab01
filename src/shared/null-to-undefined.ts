export type NullToUndefined<T> = T extends null
    ? undefined
    : T extends (infer U)[]
    ? NullToUndefined<U>[]
    : T extends object
    ? {
        [K in keyof T]: NullToUndefined<T[K]>;
    }
    : T;

export function nullToUndefined<T>(obj: T): NullToUndefined<T> {
    if (obj === null) {
        return undefined as any
    };
    if (Array.isArray(obj)) {
        return obj.map(nullToUndefined) as any
    };
    if (typeof obj === 'object' && obj !== null) {
        return Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [k, nullToUndefined(v)])
        ) as any;
    }
    return obj as any;
}