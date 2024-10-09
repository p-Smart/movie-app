import VideoUI from "@/components/VideoUI"
import MainLayout from "@/layouts/Main"
import useGlobalStore from "@/stores"
import { TMDBClient } from "@/utils/axios"
import { Flex, Select, Skeleton, Stack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"



const SeriesPage = () => {
    const router = useRouter()
    const id = router.query.id
    const [loading, setLoading] = useState(true)
    const [movie, setMovie] = useState<any>({})
    const [seriesGenres] = useGlobalStore(state => [state.seriesGenres])
    console.log(movie)


    const fetchSeries = async () => {
        try{
            setLoading(true)
            const { data: movieDetails } = await TMDBClient.get(`/tv/${id}`)
                    
            const updatedMovie = {
                ...movieDetails,
                genres: movieDetails.genres.map( ({name}) => name),
                number_of_episodes: movieDetails.number_of_episodes,
                number_of_seasons: movieDetails.number_of_seasons,
                poster_path: movieDetails.poster_path ? `https://image.tmdb.org/t/p/original${movieDetails.poster_path}` : null,
                backdrop_path: movieDetails.backdrop_path ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}` : null,
                seasons: movieDetails.seasons[0]?.season_number === 0 ? movieDetails.seasons.slice(1) : movieDetails.seasons

            }
            setMovie(updatedMovie)
        }
        catch(err){
            toast.error(err.message)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect( () => {
        id && fetchSeries()
    }, [id] )

    return (
        <MainLayout>
            <Stack
            px={{xs: "20px", md: "50px", lg: "100px", xl: "150px"}}
            gap="30px"
            >
                {
                loading ? <Skeleton w="100%" h="450px"  /> :
                <VideoUI imageUrl={movie.backdrop_path} />
                }
                <Flex>

                </Flex>
                <Stack>
                    <Select
                    // placeholder='Season 1'
                    w='200px'
                    border='none'
                    value="1"
                    >
                        <option value="1">Season 1</option>
                    </Select>
                </Stack>
            </Stack>
        </MainLayout>
    )
}


export default SeriesPage