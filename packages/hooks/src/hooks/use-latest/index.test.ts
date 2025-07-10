import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useLatest } from './index';

const setup = (val: unknown) => renderHook((state) => useLatest(state), { initialProps: val });

describe('useLatest', () => {
  it('useLatest with basic variable should work', async () => {
    const { result, rerender } = setup(0);

    rerender(1);
    expect(result.current.current).toBe(1);

    rerender(2);
    expect(result.current.current).toBe(2);

    rerender(3);
    expect(result.current.current).toBe(3);
  });

  it('useLatest with reference variable should work', async () => {
    const val1 = {};
    const { result, rerender } = setup(val1);

    expect(result.current.current).toBe(val1);

    const val2: unknown[] = [];
    rerender(val2);
    expect(result.current.current).toBe(val2);
  });
});
