import { isBrowser } from '@/utils';
import { useEffect, useRef } from 'react';
import { useUnmount } from '../use-unmount';

export interface Options {
  restoreOnUnmount?: boolean;
}

const DEFAULT_OPTIONS: Options = {
  restoreOnUnmount: false
};

const useTitle = (title: string, options: Options = DEFAULT_OPTIONS) => {
  const titleRef = useRef(isBrowser ? document.title : '');
  useEffect(() => {
    document.title = title;
  }, [title]);

  useUnmount(() => {
    if (options.restoreOnUnmount) {
      document.title = titleRef.current;
    }
  });
};

export { useTitle };
