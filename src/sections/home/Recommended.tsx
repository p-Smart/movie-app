import MovieCard from "@/components/MovieCard"
import SeriesCard from "@/components/SeriesCard"
import useGlobalStore from "@/stores"
import { TMDBClient } from "@/utils/axios"
import { Button, Flex, Grid, Skeleton, Stack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { IoIosArrowRoundForward } from "react-icons/io"



const Recommended = () => {
    const {colorMode} = useColorMode()
    const [currTab, setCurrTab] = useState("Movies")
    const tabs = ["Movies", "Series"]

    const [movieGenres, seriesGenres, genresLoading] = useGlobalStore(state => [state.movieGenres, state.seriesGenres, state.genresLoading])
    const [recommMovies, setRecommMovies] = useState([])
    const [recommSeries, setRecommSeries] = useState([])
    const [loading, setLoading] = useState(true)

    
    const fetchRecommMovies = async () => {
        try {
            setLoading(true)
            const { data } = await TMDBClient.get("/trending/movie/week")
            
            const movies = 
            data.results
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)

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
            setRecommMovies(updatedMovies)
        } 
        catch (err) {
            toast.error(err.message)
        }
        // finally{
        //     setLoading(false)
        // }
    }

    const fetchRecommSeries = async () => {
        try {
            setLoading(true)
            const { data } = await TMDBClient.get("/trending/tv/week")
            
            const movies = 
            data.results
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)

            const updatedMovies = await Promise.all(
                movies.map(async (movie) => {
                    const { data: movieDetails } = await TMDBClient.get(`/tv/${movie.id}`)
                    
                    return {
                        ...movie,
                        genres: movie.genre_ids.map( id => seriesGenres[id] || "Unknown"),
                        number_of_episodes: movieDetails.number_of_episodes,
                        number_of_seasons: movieDetails.number_of_seasons,
                        poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : null,
                        backdrop_path: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null
                    }
                })
            )
            setRecommSeries(updatedMovies)
        } 
        catch (err) {
            toast.error(err.message)
        }
        // finally{
        //     setLoading(false)
        // }
    }

    const fetchAll = async () => {
        await Promise.all([
            fetchRecommMovies(),
            fetchRecommSeries()
        ])
        setLoading(false)
    }


    useEffect(() => {
        !genresLoading && fetchAll()
    }, [genresLoading])

    return (
        <Stack
        gap="20px"
        >
            <Flex justifyContent="space-between"  alignItems="center" flexWrap="wrap">
                <Flex gap="10px" alignItems="center" flexWrap="wrap">
                    <Text variant="h5">
                        Recommended
                    </Text>
                    <Flex>
                    {
                    tabs.map( (tab, k) => {
                        const color = tab===currTab ? "white" : colorMode==="light" ? "black" : "white"

                        return (
                            <Text
                            key={k}
                            as={Button}
                            variant="unstyled"
                            _hover={{bgColor: "red"}}
                            bgColor={tab===currTab ? "red" : "transparent"}
                            color={ color}
                            colorScheme=""
                            p="5px 8px"
                            borderRadius="15px"
                            alignSelf="flex-start"
                            w="fit-content"
                            onClick={() => setCurrTab(tab)}
                            >
                            {tab}
                            </Text>
                        )
                    } )
                    }
                    </Flex>
                </Flex>
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
            xl: "repeat(4, 1fr)",
            sm: "repeat(2, 1fr)",
            xs: "repeat(1, 1fr)",
            }}
            gap={4}
            width="100%"
            >
            {/* Dummy */}
            {/* {
            currTab==="Movies" ?
            Array.from({length: 4}).map( (_, k) => (
                <MovieCard
                key={k}
                w="100%"
                />
            ) ) :
            Array.from({length: 4}).map( (_, k) => (
                <SeriesCard
                key={k}
                w="100%"
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
            (
                currTab==="Movies" ?
                recommMovies.map( (movie, k) => (
                    <MovieCard
                    key={movie.id}
                    id={movie.id}
                    w={"100%"}
                    title={movie.title}
                    tag="HD"
                    runtime={`${Math.floor(movie.runtime / 60)}:${movie.runtime % 60 < 10 ? '0' : ''}${movie.runtime % 60}:00`}
                    image={movie.poster_path}
                    />
                ) ) :
                recommSeries.map( (movie, k) => (
                    <SeriesCard
                    key={movie.id}
                    id={movie.id}
                    w="100%"
                    title={movie.name}
                    image={movie.poster_path}
                    eps={movie.number_of_episodes}
                    seasons={movie.number_of_seasons}
                    tag="HD"
                    />
                ) )
            )
            }
            </Grid>
        </Stack>
    )
}


export default Recommended