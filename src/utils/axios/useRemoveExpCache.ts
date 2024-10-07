import { useEffect } from "react"

const useRemoveExpCache = () => {
    useEffect(() => {
        const intervalId = setInterval(() => {
            const cachedResponses = JSON.parse(localStorage.getItem('CACHED_RESPONSES')) || {};
            Object.keys(cachedResponses).forEach((key) => {
                const expDate = new Date(cachedResponses[key]?.expires);
                const expired = expDate < new Date();
                if (expired) {
                    delete cachedResponses[key];
                }
            });
            localStorage.setItem('CACHED_RESPONSES', JSON.stringify(cachedResponses));
        }, 1000 * 10);

        return () => clearInterval(intervalId);
    }, []);
}

export default useRemoveExpCache;
