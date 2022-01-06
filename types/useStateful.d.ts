import { Dispatch, SetStateAction } from 'react';
export declare function useStateful<T = any>(initialState: T): UseStateful<T>;
export declare type UseStateful<T = any> = {
    value: T;
    setValue: Dispatch<SetStateAction<T>>;
};
export default useStateful;
