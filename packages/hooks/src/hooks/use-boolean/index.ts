import { isBoolean } from '@/utils';
import type { UseBooleanActions } from '@@/src/typings';
import { useState } from 'react';

const useBoolean = (defaultValue: boolean = false): [boolean, UseBooleanActions] => {
  if (!isBoolean(defaultValue)) {
    try {
      defaultValue = Boolean(defaultValue);
    } catch {
      throw new TypeError('useBoolean: defaultValue must be a boolean');
    }
  }
  const [state, setState] = useState(defaultValue);
  return [
    state,
    {
      set: (value: boolean) => {
        setState(isBoolean(value) ? value : Boolean(value));
      },
      toggle: () => setState((prev) => !prev),
      setTrue: () => setState(true),
      setFalse: () => setState(false)
    }
  ];
};

export { useBoolean };
