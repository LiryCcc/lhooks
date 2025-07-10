import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useUnmount } from './index';

describe('useUnmount', () => {
  it('should throw TypeError if parameter is not a function', () => {
    // 预期会抛出 TypeError
    expect(() => {
      renderHook(() => useUnmount('not a function' as unknown as () => void));
    }).toThrow(TypeError);

    expect(() => {
      renderHook(() => useUnmount(null as unknown as () => void));
    }).toThrow(TypeError);

    expect(() => {
      renderHook(() => useUnmount(undefined as unknown as () => void));
    }).toThrow(TypeError);

    expect(() => {
      renderHook(() => useUnmount(123 as unknown as () => void));
    }).toThrow(TypeError);
  });

  it('should call the function on unmount', () => {
    const fn = vi.fn();
    const hook = renderHook(() => useUnmount(fn));

    // 刚挂载时，fn 不应该被调用
    expect(fn).not.toBeCalled();

    // 重新渲染时，fn 也不应该被调用
    hook.rerender();
    expect(fn).not.toBeCalled();

    // 卸载组件
    hook.unmount();
    // 卸载时，fn 应该被调用一次
    expect(fn).toBeCalledTimes(1);
  });

  it('should call the latest function on unmount', () => {
    let count = 0;
    const fn1 = vi.fn(() => (count = 1));
    const fn2 = vi.fn(() => (count = 2));

    const hook = renderHook((props: { callback: () => void }) => useUnmount(props.callback), {
      initialProps: { callback: fn1 }
    });

    // 刚挂载时，fn1 (或 fn2) 不应该被调用
    expect(fn1).not.toBeCalled();
    expect(fn2).not.toBeCalled();
    expect(count).toBe(0);

    // 重新渲染，传入新的函数 fn2
    hook.rerender({ callback: fn2 });

    // 此时 fn1 (或 fn2) 仍然不应该被调用
    expect(fn1).not.toBeCalled();
    expect(fn2).not.toBeCalled();
    expect(count).toBe(0);

    // 卸载组件
    hook.unmount();

    // 卸载时，应该是最新传入的 fn2 被调用，而不是 fn1
    expect(fn1).not.toBeCalled(); // fn1 不应被调用
    expect(fn2).toBeCalledTimes(1); // fn2 应该被调用一次
    expect(count).toBe(2); // count 应该被 fn2 更新为 2
  });
});
