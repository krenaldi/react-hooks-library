import { useMemo } from 'react';
import { useBoolean as useBooleanArray, UseBooleanActions } from './hooks/useBoolean';

import type { UseStateful } from './useStateful';

export type UseBoolean = UseStateful<boolean> & UseBooleanActions;

export function useBoolean(initial: boolean): UseBoolean {
  const [value, actions] = useBooleanArray(initial);
  return useMemo(
    () => ({
      value,
      ...actions,
    }),
    [value, actions],
  );
}

export default useBoolean;
