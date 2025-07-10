import type { Noop, PickFunction } from '@/typings';
import { isFunction } from '@/utils';
import { useMemo, useRef } from 'react';

const useMemoizedFn = <T extends Noop>(fn: T) => {
  if (!isFunction(fn)) {
    throw new TypeError(`useMemoizedFn expected parameter is a function, got ${typeof fn}`);
  }

  const fnRef = useRef<T>(fn);

  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo<T>(() => fn, [fn]);

  const memoizedFn = useRef<PickFunction<T>>(undefined);

  if (!memoizedFn.current) {
    memoizedFn.current = function (this, ...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFn.current;
};

export { useMemoizedFn };
