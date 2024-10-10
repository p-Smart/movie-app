import MainLayout from "@/layouts/Main"
import Banner from "@/sections/home/Banner"
import NewReleaseM from "@/sections/home/NewReleaseM"
import NewReleaseS from "@/sections/home/NewReleaseS"
import RecentlyUpdated from "@/sections/home/RecentlyUpdated"
import Recommended from "@/sections/home/Recommended"
import Trending from "@/sections/home/Trending"
import { TMDBClient } from "@/utils/axios"
import { Stack } from "@chakra-ui/react"
import { GetServerSideProps } from "next"


const HomePage = (props) => {
    
    return (
        <MainLayout>
            <Banner movies={props.banner_movies} />
            <Stack
            py="50px"
            px={{xs: "20px", md: "50px", lg: "100px", xl: "150px"}}
            gap="50px"
            >
                <RecentlyUpdated />
                <Trending />
                <NewReleaseM />
                <NewReleaseS />
                <Recommended />
            </Stack>
        </MainLayout>
    )
}





export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await TMDBClient.get("/movie/popular")
    let movies = 
    data.results
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)

    const { data: genresRes } = await TMDBClient.get("/genre/movie/list")
    const genres = genresRes.genres

    const updatedMovies = await Promise.all(
        movies.map(async (movie) => {
            const { data: movieDetails } = await TMDBClient.get(`/movie/${movie.id}`)
            
            return {
                ...movie,
                genres: movie.genre_ids.map(
                    (genre_id) => genres.find(({ id }) => id === genre_id)?.name || "Unknown"
                ),
                runtime: movieDetails.runtime,
                rating: movie.vote_average,
                poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : null,
                backdrop_path: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null
            }
        })
    )

    return {
        props: {
            banner_movies: updatedMovies
        }
    }
}


export default HomePage