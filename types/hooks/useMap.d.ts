import { SetStateAction, Dispatch } from 'react';
export declare type MapOrEntries<K, V> = Map<K, V> | [K, V][];
export declare type UseMapActions<K, V> = {
    setValue: Dispatch<SetStateAction<Map<K, V>>>;
    delete: (keyToRemove: K) => void;
    set: (key: K, value: V) => void;
    clear: Map<K, V>['clear'];
    initialize: (pairsOrMap: MapOrEntries<K, V>) => void;
};
export declare type UseMap<K, V> = [Map<K, V>, UseMapActions<K, V>];
export declare function useMap<K, V>(initialState?: MapOrEntries<K, V>): UseMap<K, V>;
export default useMap;
