import axios from "axios";



export const TMDBClient = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGEzYzQwZmE2Mzc2MmEyOTgxNjhlOTNiZDYwYmY5YSIsIm5iZiI6MTcyODM2NzU3NC44ODg0NTEsInN1YiI6IjY3MDJhZjA5OTI1ZmRmOTI1YjdkNDdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kFeLqHoje8pYvJYsL3GgXHwWUMJ2iDGgG0mybIqsX5c",
    }
})