import { MutableRefObject, useEffect } from "react";

interface UseClickOutsideProps {
    ref: MutableRefObject<HTMLElement | null> | MutableRefObject<HTMLElement | null>[];
    handler: () => void;
}

const useClickOutside = ({ ref, handler }: UseClickOutsideProps): void => {
    useEffect(() => {
        const maybeHandler = (e: MouseEvent) => {
            const refs = Array.isArray(ref) ? ref : [ref];

            if (
                !refs.some(
                    r => r?.current && r.current.contains(e.target as Node)
                )
            ) {
                handler();
            }
        };

        document.addEventListener("mousedown", maybeHandler);

        return () => {
            document.removeEventListener("mousedown", maybeHandler);
        };
    }, [ref, handler]);
};

export default useClickOutside;