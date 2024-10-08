import MovieCardTrending from "@/components/MovieCardTrending"
import { TMDBClient } from "@/utils/axios"
import { Button, Flex, Grid, Stack, Text, useColorMode } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { IoIosArrowRoundForward } from "react-icons/io"



const Trending = () => {
    const {colorMode} = useColorMode()

    // const [trendingMovies, setTrendingMovies] = useState([]);
    // const [genres, setGenres] = useState({});

    
    // const fetchGenres = async () => {
    //     try {
    //     const { data: genresRes } = await TMDBClient.get("/genre/movie/list");
    //     const genreMap = {};
    //     genresRes.genres.forEach((genre) => {
    //         genreMap[genre.id] = genre.name;
    //     });
    //     setGenres(genreMap);
    //     } catch (error) {
    //     console.error("Error fetching genres:", error);
    //     }
    // };

    
    // const fetchTrendingMovies = async () => {
    //     try {
    //     const { data } = await TMDBClient.get("/trending/all/day");
        
    //     const movies = data.results.slice(0, 3).map((movie) => ({
    //         id: movie.id,
    //         title: movie.title || movie.name,
    //         tags: movie.genre_ids.slice(0, 2).map((id) => genres[id] || "Unknown Genre"), 
    //         rating: movie.vote_average.toString(),
    //         runtime: formatRuntime(movie.runtime), 
    //         image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, 
    //     }));
    //     setTrendingMovies(movies);
    //     } catch (error) {
    //     console.error("Error fetching trending movies:", error);
    //     }
    // };

    
    // const formatRuntime = (minutes) => {
    //     if (!minutes) return "N/A";
    //     const hours = Math.floor(minutes / 60);
    //     const mins = minutes % 60;
    //     return `${hours}h ${mins}m`;
    // };

    // useEffect(() => {
    //     fetchGenres(); 
    // }, []);

    // useEffect(() => {
    //     if (Object.keys(genres).length) {
    //     fetchTrendingMovies(); 
    //     }
    // }, [genres]);


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
                {
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