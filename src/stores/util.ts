export type StateUpdater<T> = T | ((prev: T) => T);
export type SetState<T> = <K extends keyof T>(key: K, value: T[K]) => void;

export const createSetState = <T>(
    set: (partial: T | Partial<T> | ((state: T) => T), replace?: boolean) => void
  ): SetState<T> => (key: keyof T, value: StateUpdater<T[(keyof T)]>) => {
    set((state: T) => ({
      ...state,
      [key]: typeof value === 'function' ? (value as (prev: T[(keyof T)]) => T[(keyof T)])(state[key]) : value,
    }));
};