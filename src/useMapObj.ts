import { useMemo } from 'react';
import { useMap as useMapArray, UseMapActions, MapOrEntries } from './hooks/useMap';

import type { UseStateful } from './useStateful';

export type UseMap<K, V> = UseStateful<Map<K, V>> & UseMapActions<K, V>;

export function useMap<K, V>(initialState: MapOrEntries<K, V> = new Map()): UseMap<K, V> {
  const [map, actions] = useMapArray(initialState);
  return useMemo(
    () => ({
      value: map,
      ...actions,
    }),
    [map, actions],
  );
}

export default useMap;
