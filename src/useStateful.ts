import { useState, useMemo, Dispatch, SetStateAction } from 'react';

export function useStateful<T = any>(initialState: T): UseStateful<T> {
  const [value, setValue] = useState(initialState);

  return useMemo(
    () => ({
      value,
      setValue,
    }),
    [value],
  );
}

export type UseStateful<T = any> = {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
};

export default useStateful;
