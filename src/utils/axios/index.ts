import axios from "axios";



const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    withCredentials: true,
})


client.interceptors.response.use(
    (response) => {
        const data = response.data

        // Begin Code to Cache Responses
        let resToBeCached = response.config.useCache
        if(resToBeCached){
            let cacheExp = response.config.cacheExpiry || (1000 * 60 * 60 * 24) // Cache expiry defaults to 24 hours
            let expDate = new Date()
            expDate.setTime(expDate.getTime() + cacheExp)

            let reqUrl = response.config.url
            let cachedResponses = JSON.parse(localStorage.getItem('CACHED_RESPONSES')) || {}
            let newCacheResponses = {
                ...cachedResponses,
                [reqUrl]: {...data, expires: expDate},
            }
            localStorage.setItem('CACHED_RESPONSES', JSON.stringify(newCacheResponses))
        }
        // End
        
        if(data?.success){
            return data
        }
        const customError = new Error(data?.message || 'An error occurred');
        return Promise.reject(customError)
    },
    error => {
        if (error.response) {

            // For cached responses
            if(error.response?.status === 200){
                return Promise.resolve(error.response);
            }
            
            const customError = new Error(error.response.data.message || 'An error occurred');
            return Promise.reject(customError);
        }
        else if (error.request) {
            const customError = new Error((error.code || error.message) ? `${error?.code} | ${error?.message}` : 'No response received from server');
            return Promise.reject(customError);
        } 
        else {
            return Promise.reject(error);
        }
    }
)

client.interceptors.request.use(
    (reqConfig) => {
        const cachedResponses = JSON.parse(localStorage.getItem('CACHED_RESPONSES'))

        if(cachedResponses){
            const cachedData = cachedResponses[reqConfig.url]
            if(cachedData){
                let expDate = new Date(cachedData?.expires)
                let expired = expDate < new Date()
                if(!expired){
                    return Promise.reject({
                        config: reqConfig,
                        response: {
                            status: 200,
                            ...cachedData,
                        }
                    })
                }
            }
        }


        return reqConfig
    }
)



export default client