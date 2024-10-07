import { create } from 'zustand';
import { createSetState, SetState } from './util';
import { createRef, MutableRefObject } from 'react';

interface IGlobalStates {
    

  readonly setGlobalState: SetState<Omit<IGlobalStates, 'setGlobalState'>>;
}


const useGlobalStore = create<IGlobalStates>((set) => ({
    

    setGlobalState: createSetState<Omit<IGlobalStates, 'setGlobalState'>>(set),
}));

export default useGlobalStore;
