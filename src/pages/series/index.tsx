import Pagination from "@/components/Pagination"
import SeriesCard from "@/components/SeriesCard"
import MainLayout from "@/layouts/Main"
import useGlobalStore from "@/stores"
import { TMDBClient } from "@/utils/axios"
import { Grid, Skeleton, Stack, Text} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"



const SeriesPage = () => {
    const {query, isReady} = useRouter()

    const [seriesGenres, genresLoading] = useGlobalStore(state => [state.seriesGenres, state.genresLoading])
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(null as number)
    const [totalPages, setTotalPages] = useState(1)
    const [totalItems, setTotalItems]= useState(0)
    const [loading, setLoading] = useState(true)

    const fetchSeries = async () => {
        try {
            setLoading(true)
            const { data } = await TMDBClient.get(`/discover/tv?page=${page ||1}`)
            
            const movies = data.results

            const updatedMovies =
                movies.map( (movie) => ({
                        ...movie,
                        genres: movie.genre_ids.map( id => seriesGenres[id] || "Unknown"),
                        poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : null,
                        backdrop_path: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null
                    }))
            setMovies(updatedMovies)
            setTotalPages(data.total_pages)
            setTotalItems(data.total_results)
            setLoading(false)
        } 
        catch (err) {
            toast.error(err.message)
        }
        finally{
            
        }
    }

    useEffect( () => {
        if(!genresLoading){
            fetchSeries()
        }
    }, [
        page,
        genresLoading,
    ] )

    let startItem = ((page || 1) - 1) * movies.length + 1
    let endItem = Math.min((page || 1) * movies.length, totalItems)


    useEffect(() => {
        if(page){
            const queryParams = new URLSearchParams(window.location.search)
            queryParams.set("page", String(page))

            const newUrl = `${window.location.pathname}?${queryParams.toString()}`
            window.history.replaceState(null, '', newUrl)
        }
    }, [page])

    useEffect(() => {
        if (isReady && query.page) {
          setPage(Number(query.page) || 1)
        }
    }, [isReady, query.page])
      

    return (
        <MainLayout>
            <Stack
            px={{xs: "20px", md: "50px", lg: "100px", xl: "150px"}}
            py="50px"
            gap="50px"
            alignItems="center"
            >
            
            {
            loading ? <Skeleton alignSelf="flex-end" w="150px" h="20px" /> :
            <Text
            alignSelf="flex-end"
            >
            Showing <strong>{startItem} - {endItem}</strong> of <strong>{totalItems.toLocaleString()}</strong> results
            </Text>
            }

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
            loading ?
            Array.from({length: 8}).map( (_, k) => (
                <Skeleton
                w="100%"
                h="300px"
                borderRadius="8px"
                key={k}
                />
            ) ) :
            movies.map( (movie, k) => (
                <SeriesCard
                key={movie.id}
                id={movie.id}
                w={"100%"}
                title={movie.name}
                tag="HD"
                image={movie.poster_path}
                />
            ) )
            }
            </Grid>
            
            {
               !loading && movies.length ?
               <Pagination
                totalPages={totalPages}
                currentPage={page || 1}
                onChange={(pageNumber) => setPage(pageNumber)}
                /> : null 
            }
            </Stack>
        </MainLayout>
    )
}


export default SeriesPage