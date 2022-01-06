import React, { SetStateAction } from 'react';
declare type UseBooleanFunction = (initial: boolean) => [boolean, UseBooleanActions];
export declare type UseBooleanActions = {
    setValue: React.Dispatch<SetStateAction<boolean>>;
    toggle: VoidFunction;
    setTrue: VoidFunction;
    setFalse: VoidFunction;
};
export declare type UseBoolean = [boolean, UseBooleanActions];
export declare const useBoolean: UseBooleanFunction;
export default useBoolean;
