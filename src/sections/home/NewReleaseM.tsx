import MovieCard from "@/components/MovieCard"
import useGlobalStore from "@/stores"
import { TMDBClient } from "@/utils/axios"
import { Button, Flex, Grid, Skeleton, Stack, Text, useColorMode } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { IoIosArrowRoundForward } from "react-icons/io"



const NewReleaseM = () => {
    const {colorMode} = useColorMode()

    const [movieGenres, seriesGenres, genresLoading] = useGlobalStore(state => [state.movieGenres, state.seriesGenres, state.genresLoading])
    const [newReleaseMovies, setNewReleaseMovies] = useState([])
    const [loading, setLoading] = useState(true)

    
    const fetchNewReleaseMovies = async () => {
        try {
            setLoading(true)
            const { data } = await TMDBClient.get("/movie/now_playing")
            
            const movies = data.results.slice(0, 4)

            const updatedMovies = await Promise.all(
                movies.map(async (movie) => {
                    const { data: movieDetails } = await TMDBClient.get(`/movie/${movie.id}`)
                    
                    return {
                        ...movie,
                        genres: movie.genre_ids.map( id => movieGenres[id] || "Unknown"),
                        runtime: movieDetails.runtime,
                        rating: movie.vote_average,
                        poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : null,
                        backdrop_path: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null
                    }
                })
            )
            setNewReleaseMovies(updatedMovies)
        } 
        catch (err) {
            toast.error(err.message)
        }
        finally{
            setLoading(false)
        }
    }


    useEffect(() => {
        !genresLoading && fetchNewReleaseMovies()
    }, [genresLoading])

    return (
        <Stack
        gap="20px"
        >
            <Flex justifyContent="space-between">
                <Text variant="h5">
                    New Release - Movies
                </Text>
                <Button
                rightIcon={<IoIosArrowRoundForward />}
                color={colorMode==="dark" ? "whiteAlpha.700" : "blackAlpha.700"}
                >
                    View all
                </Button>
            </Flex>
            <Grid
            templateColumns={{
            xl: "repeat(4, 1fr)",
            sm: "repeat(2, 1fr)",
            xs: "repeat(1, 1fr)",
            }}
            gap={4}
            width="100%"
            >
            {/* Dummy */}
            {/* {
                Array.from({length: 4}).map( (_, k) => (
                    <MovieCard
                    key={k}
                    w="100%"
                    title="Ghosted"
                    image="/assets/images/dummy/Rectangle 6.png"
                    runtime="3:12:00"
                    tag="HD"
                    />
                ) )
            } */}
            {
            loading ?
            Array.from({length: 4}).map( (_, k) => (
                <Skeleton
                w="100%"
                h="300px"
                borderRadius="8px"
                key={k}
                />
            ) ) :
            newReleaseMovies.map( (movie, k) => (
                <MovieCard
                key={movie.id}
                w={"100%"}
                title={movie.title}
                tag="HD"
                runtime={`${Math.floor(movie.runtime / 60)}:${movie.runtime % 60 < 10 ? '0' : ''}${movie.runtime % 60}:00`}
                image={movie.poster_path}
                />
            ) )
            }
            </Grid>
        </Stack>
    )
}


export default NewReleaseM