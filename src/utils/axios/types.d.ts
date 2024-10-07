import axios from 'axios'

declare module 'axios' {
    interface AxiosRequestConfig {
        useCache?: boolean;
        cacheExpiry?: number;
    }
    interface AxiosResponse {
        message?: string;
        success?: boolean;
    }
}