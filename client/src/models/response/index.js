export type Response<T> = Promise<{ result: T, error: { isJoi: boolean } }>;
