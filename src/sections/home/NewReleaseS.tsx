import SeriesCard from "@/components/SeriesCard"
import useGlobalStore from "@/stores"
import { TMDBClient } from "@/utils/axios"
import { Button, Flex, Grid, Skeleton, Stack, Text, useColorMode } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { IoIosArrowRoundForward } from "react-icons/io"



const NewReleaseS = () => {
    const {colorMode} = useColorMode()

    const [movieGenres, seriesGenres, genresLoading] = useGlobalStore(state => [state.movieGenres, state.seriesGenres, state.genresLoading])
    const [newReleaseSeries, setNewReleaseSeries] = useState([])
    const [loading, setLoading] = useState(true)

    
    const fetchNewReleaseSeries = async () => {
        try {
            setLoading(true)
            const { data } = await TMDBClient.get("/tv/airing_today")
            
            const movies = data.results.slice(0, 4)

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
            setNewReleaseSeries(updatedMovies)
            setLoading(false)
        } 
        catch (err) {
            toast.error(err.message)
        }
        finally{
            
        }
    }


    useEffect(() => {
        !genresLoading && fetchNewReleaseSeries()
    }, [genresLoading])

    return (
        <Stack
        gap="20px"
        >
            <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
                <Text variant="h5">
                    New Release - Series
                </Text>
                <Button
                rightIcon={<IoIosArrowRoundForward />}
                color={colorMode==="dark" ? "whiteAlpha.700" : "blackAlpha.700"}
                ml="auto"
                as={Link}
                href="/series"
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
                <SeriesCard
                key={k}
                w="100%"
                title="The Night Agent"
                image="/assets/images/dummy/Rectangle 13.png"
                eps={47}
                seasons={2}
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
            newReleaseSeries.map( (movie, k) => (
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
            }
            </Grid>
        </Stack>
    )
}


export default NewReleaseS