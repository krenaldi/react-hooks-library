import React, { useState, useCallback, useMemo, SetStateAction } from 'react';

type UseBooleanFunction = (initial: boolean) => [boolean, UseBooleanActions];

export type UseBooleanActions = {
  setValue: React.Dispatch<SetStateAction<boolean>>;
  toggle: VoidFunction;
  setTrue: VoidFunction;
  setFalse: VoidFunction;
};

export type UseBoolean = [boolean, UseBooleanActions];

export const useBoolean: UseBooleanFunction = (initial) => {
  const [value, setValue] = useState<boolean>(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const actions = useMemo(() => ({ setValue, toggle, setTrue, setFalse }), [toggle, setTrue, setFalse]);
  return [value, actions];
};

export default useBoolean;
