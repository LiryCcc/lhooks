import { isFunction } from '@@/src/utils';
import { useEffect } from 'react';
import { useLatest } from '../use-latest';

const useUnmount = (fn: () => void) => {
  if (!isFunction(fn)) {
    throw new TypeError(`useUnmount expected parameter is a function, got ${typeof fn}`);
  }

  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },
    []
  );
};

export { useUnmount };
