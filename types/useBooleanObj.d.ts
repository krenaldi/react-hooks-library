import { UseBooleanActions } from './hooks/useBoolean';
import type { UseStateful } from './useStateful';
export declare type UseBoolean = UseStateful<boolean> & UseBooleanActions;
export declare function useBoolean(initial: boolean): UseBoolean;
export default useBoolean;
