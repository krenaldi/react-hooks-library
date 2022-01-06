import { UseMapActions, MapOrEntries } from './hooks/useMap';
import type { UseStateful } from './useStateful';
export declare type UseMap<K, V> = UseStateful<Map<K, V>> & UseMapActions<K, V>;
export declare function useMap<K, V>(initialState?: MapOrEntries<K, V>): UseMap<K, V>;
export default useMap;
