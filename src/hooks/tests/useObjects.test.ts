import { act, renderHook } from '@testing-library/react-hooks';
import { useStateful } from '../../useStateful';
import { useBoolean } from '../../useBooleanObj';
import { useMap } from '../../useMapObj';

describe('useStateful', () => {
  it('should change value', () => {
    const { result } = renderHook(() => useStateful('initial'));

    expect(result.current.value).toBe('initial');

    act(() => result.current.setValue('changed'));

    expect(result.current.value).toBe('changed');
  });
});

describe('useBooleanObj hook', () => {
  it('should set to true', () => {
    const { result } = renderHook(() => useBoolean(false));
    const { setTrue } = result.current;

    expect(result.current.value).toBe(false);

    act(() => setTrue());

    expect(result.current.value).toBe(true);
  });

  it('should set to false', () => {
    const { result } = renderHook(() => useBoolean(true));
    const { setFalse } = result.current;

    expect(result.current.value).toBe(true);

    act(() => setFalse());

    expect(result.current.value).toBe(false);
  });

  it('should toggle', () => {
    const { result } = renderHook(() => useBoolean(false));
    const { toggle } = result.current;

    expect(result.current.value).toBe(false);

    act(() => toggle());

    expect(result.current.value).toBe(true);

    act(() => toggle());

    expect(result.current.value).toBe(false);
  });

  describe('render optimizations with useCallback and useMemo', () => {
    it('should keep actions reference equality after value change', () => {
      // given
      const { result } = renderHook(() => useBoolean(true));
      const { setFalse } = result.current;

      expect(result.current.setFalse).toBe(setFalse);
      // when
      act(() => setFalse());
      // then
      expect(setFalse).toBe(result.current.setFalse);
    });
  });
});

describe('useMap object', () => {
  describe('set', () => {
    it('should update old value', () => {
      const { result } = renderHook(() => useMap<number, string>([[1, 'default']]));
      const { set } = result.current;

      expect(result.current.value.get(1)).toBe('default');

      act(() => set(1, 'changed'));

      expect(result.current.value.get(1)).toBe('changed');
    });
    it('should add new value', () => {
      const { result } = renderHook(() => useMap<number, string>());
      const { set } = result.current;

      expect(result.current.value.get(1)).toBeUndefined();

      act(() => set(1, 'added'));

      expect(result.current.value.get(1)).toBe('added');
    });
  });

  describe('delete', () => {
    it('should delete existing value', () => {
      const { result } = renderHook(() => useMap<number, string>([[1, 'existing']]));
      const { delete: aDelete } = result.current;

      expect(result.current.value.get(1)).toBe('existing');

      act(() => aDelete(1));

      expect(result.current.value.get(1)).toBeUndefined();
    });
  });

  describe('initialize', () => {
    it.each`
      message    | input
      ${'map'}   | ${new Map([[1, 'initialized']])}
      ${'tuple'} | ${[[1, 'initialized']]}
    `('initializes with $message', ({ input }) => {
      const { result } = renderHook(() => useMap<number, string>());
      const { initialize } = result.current;

      expect(result.current.value.get(1)).toBeUndefined();

      act(() => initialize(input));

      expect(result.current.value.get(1)).toBe('initialized');
    });
  });

  describe('clear', () => {
    it('clears the map state and gets values', () => {
      const { result } = renderHook(() => useMap<number, string>([[1, 'initialized']]));
      const { clear } = result.current;

      expect(result.current.value.get(1)).toBe('initialized');

      act(() => clear());

      expect(result.current.value.get(1)).toBeUndefined();
    });
  });

  describe('hooks optimizations', () => {
    it('should change value reference equality after change', () => {
      // given
      const { result } = renderHook(() => useMap<number, number>());
      const { value, set } = result.current;

      expect(result.current.value).toBe(value);
      // when
      act(() => set(1, 1));
      // then
      expect(value).not.toBe(result.current.value);
      expect(value.get(1)).toBeUndefined();
      expect(result.current.value.get(1)).toBe(1);
    });
    it('should keep actions reference equality after value change', () => {
      // given
      const { result } = renderHook(() => useMap<number, number>());
      const { set } = result.current;

      expect(result.current.set).toBe(set);
      // when
      act(() => set(1, 1));
      // then
      expect(set).toBe(result.current.set);
    });
  });
});
