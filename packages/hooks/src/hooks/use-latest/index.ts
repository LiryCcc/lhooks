import { useRef } from 'react';

const useLatest = <T>(value: T) => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};

export { useLatest };
