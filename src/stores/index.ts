import { create } from 'zustand';
import { createSetState, SetState } from './util';
import { createRef, MutableRefObject } from 'react';

interface IGlobalStates {
  openMediaMenu: boolean;
  mediaMenuRef: MutableRefObject<HTMLDivElement>;
  movieGenres: {[key: string]: string};
  seriesGenres: {[key: string]: string};
  genresLoading: boolean;
  searchQuery: string;
  
  readonly setGlobalState: SetState<Omit<IGlobalStates, 'setGlobalState'>>;
}


const useGlobalStore = create<IGlobalStates>((set) => ({
  movieGenres: {},
  seriesGenres: {},
  genresLoading: true,
  searchQuery: "",
  openMediaMenu: false,
  mediaMenuRef: createRef<HTMLDivElement>(),


  setGlobalState: createSetState<Omit<IGlobalStates, 'setGlobalState'>>(set),
}));

export default useGlobalStore;
