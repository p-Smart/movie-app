import { Dispatch, SetStateAction } from "react";



const useSetObjectState = <T extends {[key: string]: any}>(setState: Dispatch<SetStateAction<T>>) => {
    return <K extends keyof T>(objKey: K, value: T[K]) => setState( (prevState) => ({...prevState, [objKey]: value}) )
}


export default useSetObjectState