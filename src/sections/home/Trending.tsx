import MovieCardTrending from "@/components/MovieCardTrending"
import useGlobalStore from "@/stores"
import { TMDBClient } from "@/utils/axios"
import { Button, Flex, Grid, Skeleton, Stack, Text, useColorMode } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { IoIosArrowRoundForward } from "react-icons/io"



const Trending = () => {
    const [movieGenres, seriesGenres, genresLoading] = useGlobalStore(state => [state.movieGenres, state.seriesGenres, state.genresLoading])
    const {colorMode} = useColorMode()
    const [trendingMovies, setTrendingMovies] = useState([])
    const [loading, setLoading] = useState(true)

    
    const fetchTrendingMovies = async () => {
        try {
            setLoading(true)
            const { data } = await TMDBClient.get("/trending/all/day")
            
            const movies = data.results.slice(0, 3)

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
            setTrendingMovies(updatedMovies)
        } 
        catch (err) {
            toast.error(err.message)
        }
        finally{
            setLoading(false)
        }
    }


    useEffect(() => {
        !genresLoading && fetchTrendingMovies()
    }, [genresLoading])


    return (
        <Stack
        gap="20px"
        >
            <Flex justifyContent="space-between">
                <Text variant="h5">
                    Trending
                </Text>
                <Button
                rightIcon={<IoIosArrowRoundForward />}
                color={colorMode==="dark" ? "whiteAlpha.700" : "blackAlpha.700"}
                ml="auto"
                as={Link}
                href="/search"
                >
                    View all
                </Button>
            </Flex>
            <Grid
                templateColumns={{
                xl: "repeat(3, 1fr)",
                md: "repeat(2, 1fr)",
                xs: "repeat(1, 1fr)",
                }}
                gap={4}
                width="100%"
            >
            {/* Dummy */}
            {/* {
            Array.from({length: 3}).map( (_, k) => (
                <MovieCardTrending
                key={k}
                w={"100%"}
                title="Medellin"
                movie_tags={["Action", "Comedy"]}
                rating="8.5"
                runtime="3:12:00"
                image="/assets/images/dummy/Rectangle 3.png"
                />
            ) )
            } */}
            
            {
            loading ?
            Array.from({length: 3}).map( (_, k) => (
                <Skeleton
                w="100%"
                h="300px"
                borderRadius="8px"
                key={k}
                />
            ) ) :
            trendingMovies.map( (movie, k) => (
                <MovieCardTrending
                key={movie.id}
                w={"100%"}
                title={movie.title}
                movie_tags={movie.genres}
                runtime={`${Math.floor(movie.runtime / 60)}:${movie.runtime % 60 < 10 ? '0' : ''}${movie.runtime % 60}:00`}
                rating={Number(movie.rating).toFixed(1)}
                image={movie.poster_path}
                />
            ) )
            }
            </Grid>
            <Flex
            flexWrap="wrap"
            gap="30px"
            >
                
            </Flex>
        </Stack>
    )
}


export default Trending