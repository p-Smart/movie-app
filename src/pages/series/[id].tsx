import SeriesCard from "@/components/SeriesCard"
import VideoUI from "@/components/VideoUI"
import MainLayout from "@/layouts/Main"
import Episode from "@/sections/series/Episode"
import useGlobalStore from "@/stores"
import { TMDBClient } from "@/utils/axios"
import { Box, Flex, Grid, Select, Skeleton, Stack, Text, useColorMode } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { IoMdStar } from "react-icons/io"
import { MdCalendarMonth } from "react-icons/md"



const SeriesPage = () => {
    const {colorMode} = useColorMode()
    const router = useRouter()
    const id = router.query.id
    const [loading, setLoading] = useState(true)
    const [movie, setMovie] = useState<any>({})
    const [seriesGenres] = useGlobalStore(state => [state.seriesGenres])
    const [currSeason, setCurrSeason] = useState(1)
    const [suggMovies, setSuggMovies] = useState([])
    const [suggMoviesLoading, setSuggMoviesLoading] = useState(true)
    const [videoLoadng, setVideoLoading] = useState(true)
    const [videoUrl, setVideoUrl] = useState("")


    const fetchSeries = async () => {
        try {
            setLoading(true)
            const { data: movieDetails } = await TMDBClient.get(`/tv/${id}`)

            const seasonsWithEpisodes = await Promise.all(
                movieDetails.seasons.map(async (season) => {
                    const { data: seasonDetails } = await TMDBClient.get(`/tv/${id}/season/${season.season_number}`)
                    return {
                        ...season,
                        episodes: seasonDetails.episodes,
                    }
                })
            )
    
            const updatedMovie = {
                ...movieDetails,
                genres: movieDetails.genres.map(({ name }) => name),
                number_of_episodes: movieDetails.number_of_episodes,
                number_of_seasons: movieDetails.number_of_seasons,
                poster_path: movieDetails.poster_path ? `https://image.tmdb.org/t/p/original${movieDetails.poster_path}` : null,
                backdrop_path: movieDetails.backdrop_path ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}` : null,
                seasons: movieDetails.seasons[0]?.season_number === 0 ? seasonsWithEpisodes.slice(1) : seasonsWithEpisodes,
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
    const fetchSeriesVideo = async () => {
        setVideoLoading(true)
        try {
          const { data } = await TMDBClient.get(`/tv/${id}/videos`)
      
          const videos = data.results
          let selectedVideo
      
          selectedVideo = videos.find((video: any) => video.type === "Trailer")
      
          if (!selectedVideo) {
            selectedVideo = videos.length > 0 ? videos[0] : null
          }
      
          if (selectedVideo) {
            if (selectedVideo.site === "YouTube") {
              setVideoUrl(`https://www.youtube.com/watch?v=${selectedVideo.key}`)
            } 
            else if (selectedVideo.site === "Vimeo") {
              setVideoUrl(`https://vimeo.com/${selectedVideo.key}`)
            } 
            else {
              setVideoUrl(`https://www.${selectedVideo.site.toLowerCase()}.com/watch?v=${selectedVideo.key}`)
            }
          } 
          else {
            setVideoUrl("")
          }
        } 
        catch (err) {
          toast.error(err.message)
        } 
        finally {
          setVideoLoading(false)
        }
    }
    const fetchSuggMovies = async () => {
        try{
            setSuggMoviesLoading(true)
            const { data } = await TMDBClient.get(`/tv/${id}/recommendations`)

            const movies = data.results.slice(0, 8)

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
        id && fetchSeries()
        id && fetchSuggMovies()
        id && fetchSeriesVideo()
    }, [id] )


    const metadata = [
        {
            Icon: MdCalendarMonth,
            value: new Date(movie.first_air_date).getFullYear().toString(),
        },
        // {
        //     Icon: SlSpeedometer,
        //     value: runtime,
        // },
        {
            Icon: IoMdStar,
            value: Number(movie.vote_average).toFixed(1),
        },
    ]

    return (
        <MainLayout>
            <Stack
            px={{xs: "20px", md: "50px", lg: "100px", xl: "150px"}}
            py="50px"
            gap="50px"
            >
                {
                videoLoadng ? <Skeleton w="100%" h="450px"  /> :
                <VideoUI imageUrl={movie.backdrop_path} videoUrl={videoUrl} />
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
                            {movie.name}
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
                                        <Box color="white" as={data.Icon} size={24} />
                                        <Text color="white">{data.value}</Text>
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
                                key={k}
                                h="20px"
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
                                Date Released: {movie.first_air_date}
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
                gap="30px"
                >
                {
                loading ?
                <Skeleton h="200px" /> :
                <>
                <Select
                w='200px'
                border='none'
                value={currSeason}
                onChange={(e) => setCurrSeason(Number(e.target.value))}
                fontWeight="600"
                >
                {
                    movie.seasons.map( (season, k) => (
                        <option key={k} value={k+1}>{season.name}</option>
                    ) )
                }
                </Select>

                <Grid
                templateColumns={{
                    lg: "repeat(2, 1fr)",
                    xs: "repeat(1, 1fr)",
                }}
                gap="20px"
                >
                {
                movie.seasons[currSeason-1].episodes.map( (episode, k) => (
                    <Episode 
                    key={k} 
                    sn={k+1} 
                    title={episode.name} 
                    desp={episode.overview} 
                    />
                ) )
                }
                </Grid>
                </>
                }
                </Stack>


                <Stack
                gap="20px"
                w="100%"
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
                        <SeriesCard
                        w="100%"
                        key={movie.id}
                        title={movie.name}
                        eps={movie.number_of_episodes}
                        seasons={movie.number_of_seasons}
                        id={movie.id}
                        image={movie.poster_path}
                        tag="HD"
                        />
                    ) )
                    }
                    </Grid>
                </Stack>
            </Stack>
        </MainLayout>
    )
}


export default SeriesPage