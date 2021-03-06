export interface EmptyType<T extends string> { readonly type: T; }

export interface TypeWithId<T extends string, P> { readonly type: T; readonly id: P; }

export interface TypeWithErrorMessage<T extends string, P> { readonly type: T; readonly errorMessage: P; }

export interface TypeWithItems<T extends string, P> { readonly type: T; readonly items: P; }

export function makeEmptyType<T extends string>(type: T): EmptyType<T>;

export function makeEmptyType<T extends string>(type: T): EmptyType<T> {
    return { type };
}

export function makeTypeWithId<T extends string, P>(type: T, id: P): TypeWithId<T, P>;

export function makeTypeWithId<T extends string, P>(type: T, id: P): TypeWithId<T, P> {
    return { type, id };
}

export function makeTypeWithErrorMessage<T extends string, P>(type: T, errorMessage: P): TypeWithErrorMessage<T, P>;

export function makeTypeWithErrorMessage<T extends string, P>(type: T, errorMessage: P): TypeWithErrorMessage<T, P> {
    return { type, errorMessage };
}

export function makeTypeWithItems<T extends string, P>(type: T, items: P): TypeWithItems<T, P>;

export function makeTypeWithItems<T extends string, P>(type: T, items: P): TypeWithItems<T, P> {
    return { type, items };
}