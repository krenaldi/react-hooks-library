import { act, renderHook } from '@testing-library/react-hooks';
import { useMap } from '../useMap';

describe('useMap array', () => {
  describe('set', () => {
    it('should update old value', () => {
      const { result } = renderHook(() => useMap<number, string>([[1, 'default']]));
      const [, actions] = result.current;

      expect(result.current[0].get(1)).toBe('default');

      act(() => actions.set(1, 'changed'));

      expect(result.current[0].get(1)).toBe('changed');
    });
    it('should add new value', () => {
      const { result } = renderHook(() => useMap<number, string>());
      const [, actions] = result.current;

      expect(result.current[0].get(1)).toBeUndefined();

      act(() => actions.set(1, 'added'));

      expect(result.current[0].get(1)).toBe('added');
    });
  });

  describe('delete', () => {
    it('should delete existing value', () => {
      const { result } = renderHook(() => useMap<number, string>([[1, 'existing']]));
      const [, actions] = result.current;

      expect(result.current[0].get(1)).toBe('existing');

      act(() => actions.delete(1));

      expect(result.current[0].get(1)).toBeUndefined();
    });
  });

  describe('initialize', () => {
    it.each`
      message    | input
      ${'map'}   | ${new Map([[1, 'initialized']])}
      ${'tuple'} | ${[[1, 'initialized']]}
    `('initializes with $message', ({ input }) => {
      const { result } = renderHook(() => useMap<number, string>());
      const [, actions] = result.current;

      expect(result.current[0].get(1)).toBeUndefined();

      act(() => actions.initialize(input));

      expect(result.current[0].get(1)).toBe('initialized');
    });
  });

  describe('clear', () => {
    it('clears the map state and gets values', () => {
      const { result } = renderHook(() => useMap<number, string>([[1, 'initialized']]));
      const [, actions] = result.current;

      expect(result.current[0].get(1)).toBe('initialized');

      act(() => actions.clear());

      expect(result.current[0].get(1)).toBeUndefined();
    });
  });

  describe('hooks optimizations', () => {
    it('should change value reference equality after change', () => {
      // given
      const { result } = renderHook(() => useMap<number, number>());
      const [originalValueReference, actions] = result.current;

      expect(result.current[0]).toBe(originalValueReference);
      // when
      act(() => actions.set(1, 1));
      // then
      expect(originalValueReference).not.toBe(result.current[0]);
      expect(originalValueReference.get(1)).toBeUndefined();
      expect(result.current[0].get(1)).toBe(1);
    });
    it('should keep actions reference equality after value change', () => {
      // given
      const { result } = renderHook(() => useMap<number, number>());
      const [, originalActionReference] = result.current;

      expect(result.current[1]).toBe(originalActionReference);
      // when
      act(() => originalActionReference.set(1, 1));
      // then
      expect(originalActionReference).toBe(result.current[1]);
    });
  });
});
