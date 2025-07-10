import { isFunction } from '@/utils';
import { useEffect } from 'react';

const useMount = (fn: () => void) => {
  if (!isFunction(fn)) {
    throw new TypeError(`useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`);
  }

  useEffect(() => {
    fn?.();
  }, []);
};

export { useMount };
