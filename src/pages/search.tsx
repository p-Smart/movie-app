import MovieCard from "@/components/MovieCard"
import Pagination from "@/components/Pagination"
import SeriesCard from "@/components/SeriesCard"
import MainLayout from "@/layouts/Main"
import useGlobalStore from "@/stores"
import { TMDBClient } from "@/utils/axios"
import { Grid, Skeleton, Stack, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import toast from "react-hot-toast"



const SearchPage = () => {
    const {query, isReady} = useRouter()
    const [searchQuery] = useGlobalStore(state => [state.searchQuery])
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(null as number)
    const [totalPages, setTotalPages] = useState(1)
    const [totalItems, setTotalItems]= useState(0)
    const [loading, setLoading] = useState(true)

    const fetchMovies = async () => {
        try {
            setLoading(true)
            const { data } = await TMDBClient.get(`/search/multi?page=${page || 1}&query=${searchQuery}`)
            
            const movies = data.results

            const updatedMovies =
                movies.map( (movie) => ({
                        ...movie,
                        rating: movie.vote_average,
                        poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
                        backdrop_path: movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : null
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

    useEffect(() => {
        setLoading(true)
        const delayDebounceFn = setTimeout(() => {
          if (searchQuery.trim()) {
            fetchMovies() 
          }
        }, 500)
      
        return () => clearTimeout(delayDebounceFn)
      }, [searchQuery])

    useEffect( () => {
        fetchMovies()
    }, [
        page,
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
            (!loading && movies.length===0) ?
            <Text 
            m="auto" 
            fontSize="1.1rem"
            textAlign="center"
            >
                No show to display.<br/>Search something else
            </Text> :  null
            }

            {
            loading ? <Skeleton alignSelf="flex-end" w="150px" h="20px" /> :
            (
                movies.length !== 0 ?
                <Text
                alignSelf="flex-end"
                >
                Showing <strong>{startItem} - {endItem}</strong> of <strong>{totalItems.toLocaleString()}</strong> results
                </Text> : null
            )
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
                <Fragment key={movie.id}>
                {
                movie.media_type === "tv" ?
                <SeriesCard
                id={movie.id}
                w={"100%"}
                title={movie.name}
                tag="Series"
                image={movie.poster_path}
                /> : 
                <MovieCard
                id={movie.id}
                w={"100%"}
                title={movie.title}
                tag="Movie"
                image={movie.poster_path}
                />
                }
                </Fragment>
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


export default SearchPage