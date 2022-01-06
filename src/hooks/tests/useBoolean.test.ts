import { act, renderHook } from '@testing-library/react-hooks';
import useBoolean from '../useBoolean';

describe('useBoolean hook', () => {
  it('should set to true', () => {
    const { result } = renderHook(() => useBoolean(false));
    const [, actions] = result.current;

    expect(result.current[0]).toBe(false);

    act(() => actions.setTrue());

    expect(result.current[0]).toBe(true);
  });

  it('should set to false', () => {
    const { result } = renderHook(() => useBoolean(true));
    const [, actions] = result.current;

    expect(result.current[0]).toBe(true);

    act(() => actions.setFalse());

    expect(result.current[0]).toBe(false);
  });

  it('should toggle', () => {
    const { result } = renderHook(() => useBoolean(false));
    const [, actions] = result.current;

    expect(result.current[0]).toBe(false);

    act(() => actions.toggle());

    expect(result.current[0]).toBe(true);

    act(() => actions.toggle());

    expect(result.current[0]).toBe(false);
  });

  describe('render optimizations with useCallback and useMemo', () => {
    it('should keep actions reference equality after value change', () => {
      // given
      const { result } = renderHook(() => useBoolean(true));
      const [, originalActionReference] = result.current;
      const { setFalse, setTrue, toggle } = originalActionReference;

      expect(result.current[1]).toBe(originalActionReference);
      expect(result.current[1].setFalse).toBe(setFalse);
      expect(result.current[1].setTrue).toBe(setTrue);
      expect(result.current[1].toggle).toBe(toggle);
      // when
      act(() => originalActionReference.setFalse());
      // then
      expect(originalActionReference).toBe(result.current[1]);
      expect(setFalse).toBe(result.current[1].setFalse);
      expect(setTrue).toBe(result.current[1].setTrue);
      expect(toggle).toBe(result.current[1].toggle);
    });
  });
});
