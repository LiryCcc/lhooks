/* eslint-disable @typescript-eslint/no-explicit-any */
type Noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends Noop> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>;

export type { Noop, PickFunction };
