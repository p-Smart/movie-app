import TopNav from "@/layouts/Main/TopNav"
import { Box, Stack } from "@chakra-ui/react"
import { FC, PropsWithChildren, useEffect } from "react"
import MediaMenu from "./TopNav/MediaMenu"
import useGlobalStore from "@/stores"
import Footer from "@/sections/home/Footer"
import { TMDBClient } from "@/utils/axios"
import toast from "react-hot-toast"



const MainLayout: FC<PropsWithChildren> = (props) => {
    const [openMediaMenu, setGlobalState, topNavOffset] = useGlobalStore(state => [state.openMediaMenu, state.setGlobalState, state.topNavOffset])
    
    const fetchMovieGenres = async () => {
        try {
            const { data: movieGenresRes } = await TMDBClient.get('/genre/movie/list')
            const movieGenres = movieGenresRes.genres
            const movieGenreMap = {}
            movieGenres.forEach((genre) => {
                movieGenreMap[genre.id] = genre.name
            })
            setGlobalState("movieGenres", movieGenreMap)
        } 
        catch (err) {
          toast.error(err.message)
        }
    }
    const fetchSeriesGenres = async () => {
        try {
            const { data: seriesGenresRes } = await TMDBClient.get('/genre/tv/list')
            const seriesGenres = seriesGenresRes.genres
            const seriesGenreMap = {}
            seriesGenres.forEach((genre) => {
                seriesGenreMap[genre.id] = genre.name
            })
            setGlobalState("seriesGenres", seriesGenreMap)
        } 
        catch (err) {
            toast.error(err.message)
        }
    }

    const fetchGenres = async () => {
        await Promise.all([
            fetchMovieGenres(),
            fetchSeriesGenres()
        ])
        setGlobalState("genresLoading", false)
    }

    useEffect( () => {
        fetchGenres()
    }, [] )


    return (
        <Stack
        minH="100vh"
        overflow="hidden"
        >
            <TopNav />
            <Box
            pt={topNavOffset}
            >
            {props.children}
            </Box>
            <MediaMenu
            open={openMediaMenu}
            setOpen={(val: boolean) => setGlobalState("openMediaMenu", val)}
            />
            <Footer />
        </Stack>
    )
}


export default MainLayout