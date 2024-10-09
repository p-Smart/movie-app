import MovieCard from "@/components/MovieCard"
import VideoUI from "@/components/VideoUI"
import MainLayout from "@/layouts/Main"
import useGlobalStore from "@/stores"
import { TMDBClient } from "@/utils/axios"
import { Box, Flex, Grid, Skeleton, Stack, Text, useColorMode } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { IoMdStar } from "react-icons/io"
import { MdCalendarMonth } from "react-icons/md"
import { SlSpeedometer } from "react-icons/sl"



const MoviePage = () => {
    const {colorMode} = useColorMode()
    const router = useRouter()
    const id = router.query.id
    const [loading, setLoading] = useState(true)
    const [movie, setMovie] = useState<any>({})
    const [movieGenres] = useGlobalStore(state => [state.movieGenres])
    const [suggMovies, setSuggMovies] = useState([])
    const [suggMoviesLoading, setSuggMoviesLoading] = useState(true)


    const fetchMovie = async () => {
        try {
            setLoading(true)
            const { data: movieDetails } = await TMDBClient.get(`/movie/${id}`)
    
            const updatedMovie = {
                ...movieDetails,
                genres: movieDetails.genres.map(({ name }) => name),
                runtime: `${Math.floor(movieDetails.runtime / 60)}:${movieDetails.runtime % 60 < 10 ? '0' : ''}${movieDetails.runtime % 60}:00`,
                rating: movieDetails.vote_average,
                poster_path: movieDetails.poster_path ? `https://image.tmdb.org/t/p/original${movieDetails.poster_path}` : null,
                backdrop_path: movieDetails.backdrop_path ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}` : null,
                country: movieDetails.production_countries[0]?.name,
                production_companies: movieDetails.production_companies.map(({name}) => name),
            }
    
            setMovie(updatedMovie)
            setLoading(false)
        } 
        catch (err) {
            toast.error(err.message)
        } 
        finally {
            
        }
    }
    const fetchSuggMovies = async () => {
        try{
            setSuggMoviesLoading(true)
            const { data } = await TMDBClient.get(`/movie/${id}/recommendations`)

            const movies = data.results.slice(0, 8)

            const updatedMovies = await Promise.all(
                movies.map(async (movie) => {
                    const { data: movieDetails } = await TMDBClient.get(`/movie/${movie.id}`)
                    
                    return {
                        ...movie,
                        genres: movie.genre_ids.map( id => movieGenres[id] || "Unknown"),
                        runtime: `${Math.floor(movieDetails.runtime / 60)}:${movieDetails.runtime % 60 < 10 ? '0' : ''}${movieDetails.runtime % 60}:00`,
                        rating: movie.vote_average,
                        poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : null,
                        backdrop_path: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null
                    }
                })
            )
            setSuggMovies(updatedMovies)

            setSuggMoviesLoading(false)
        }
        catch(err){
            toast.error(err.message)
        }
        finally{

        }
    }
    

    useEffect( () => {
        id && fetchMovie()
        id && fetchSuggMovies()
    }, [id] )


    const metadata = [
        {
            Icon: MdCalendarMonth,
            value: new Date(movie.release_date).getFullYear().toString(),
        },
        {
            Icon: SlSpeedometer,
            value: movie.runtime,
        },
        {
            Icon: IoMdStar,
            value: Number(movie.vote_average).toFixed(1),
        },
    ];

    return (
        <MainLayout>
            <Stack
            px={{xs: "20px", md: "50px", lg: "100px", xl: "150px"}}
            py="50px"
            gap="50px"
            >
                {
                loading ? <Skeleton w="100%" h="450px"  /> :
                <VideoUI imageUrl={movie.backdrop_path} />
                }
                <Flex 
                gap="30px"
                flexDir={{xs: "column", lg: "row"}}
                alignItems="center"
                >
                    {
                    loading ?
                    <Skeleton 
                    w="30%"
                    minW="300px"
                    maxW="450px"
                    h="500px"
                    /> :
                    <Box 
                    as="img"
                    src={movie.poster_path}
                    w="30%"
                    minW="300px"
                    maxW="450px"
                    h="500px"
                    objectFit="cover"
                    borderRadius="8px"
                    />
                    }

                    <Stack gap="50px" w="100%">
                        {
                            loading ? <Skeleton h="30px" /> :
                            <Text variant="h5">
                            {movie.title || movie.original_title}
                            </Text>
                        }
                        {
                        loading ?
                        <Skeleton h="30px" /> :
                        <Flex gap="20px" flexWrap="wrap">
                            <Flex gap="10px" flexWrap="wrap">
                                {movie.genres.map((tag, k) => (
                                    <Text
                                        key={k}
                                        bgColor={colorMode==="dark" ? "white" : "black"}
                                        color={colorMode==="dark" ? "black" : "white"}
                                        p="5px 8px"
                                        fontWeight="600"
                                        borderRadius="8px"
                                        alignSelf="flex-start"
                                    >
                                        {tag}
                                    </Text>
                                ))}
                            </Flex>
                            <Flex gap="20px">
                                {metadata.map((data, k) => (
                                    <Flex gap="5px" alignItems="center" key={k}>
                                        <Box color={colorMode==="dark" ? "white" : "black"} as={data.Icon} size={24} />
                                        <Text color={colorMode==="dark" ? "white" : "black"}>{data.value}</Text>
                                    </Flex>
                                ))}
                            </Flex>
                        </Flex>
                        }

                        {
                        loading ? <Skeleton h="100px" /> :
                        <Text>
                            {movie.overview}
                        </Text>
                        }

                        <Stack>
                            {
                            loading ? 
                            Array.from({length: 5}).map( (_, k) => (
                                <Skeleton 
                                h="20px"
                                key={k}
                                />
                            ) ) :
                            <>
                            <Text>
                                Country: {movie.country}
                            </Text>
                            <Text>
                                Genre: {movie.genres.join(", ")}
                            </Text>
                            <Text>
                                Date Released: {movie.release_date}
                            </Text>
                            <Text>
                                Production: {movie.production_companies.join(", ")}
                            </Text>
                            {/* <Text>
                                Cast: 
                            </Text> */}
                            </>
                            }
                        </Stack>
                    </Stack>
                </Flex>

                <Stack
                gap="20px"
                >
                    <Text variant="h5">
                    You may also like
                    </Text>
                    <Grid
                    templateColumns={{
                    xl: "repeat(4, 1fr)",
                    sm: "repeat(2, 1fr)",
                    xs: "repeat(1, 1fr)",
                    }}
                    gap={4}
                    width="100%"
                    >
                    {
                    suggMoviesLoading ?
                    Array.from({length: 4}).map( (_, k) => (
                        <Skeleton
                        w="100%"
                        h="300px"
                        borderRadius="8px"
                        key={k}
                        />
                    ) ) :
                    suggMovies.map( (movie, k) => (
                        <MovieCard
                        w="100%"
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        tag="HD"
                        runtime={movie.runtime}
                        image={movie.poster_path}
                        />
                    ) )
                    }
                    </Grid>
                </Stack>
            </Stack>
        </MainLayout>
    )
}


export default MoviePage