import { create } from 'zustand';
import { createSetState, SetState } from './util';
import { createRef, MutableRefObject } from 'react';

interface IGlobalStates {
  openMediaMenu: boolean;
  mediaMenuRef: MutableRefObject<HTMLDivElement>;
  
  readonly setGlobalState: SetState<Omit<IGlobalStates, 'setGlobalState'>>;
}


const useGlobalStore = create<IGlobalStates>((set) => ({
  openMediaMenu: false,
  mediaMenuRef: createRef<HTMLDivElement>(),

  
  setGlobalState: createSetState<Omit<IGlobalStates, 'setGlobalState'>>(set),
}));

export default useGlobalStore;
