import { Box, Button, Flex, IconButton, Skeleton, Stack, Text } from "@chakra-ui/react"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useEffect, useState } from "react"
import SwiperCore from "swiper"
import { IoIosArrowRoundForward } from "react-icons/io"
import { TMDBClient } from "@/utils/axios"
import Link from "next/link"



const RecentlyUpdated = () => {
    const [swiper, setSwiper] = useState<SwiperCore>()
    const [tvShows, setTvShows] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTvShows = async () => {
        try {
            setLoading(true)
            const { data } = await TMDBClient.get(`/tv/on_the_air`)

            const fetchedTvShows = data.results.slice(0, 10).map((show: any) => ({
                id: show.id,
                title: show.name,
                type: `Series / S${show.season_number || 'N/A'}/EP${show.episode_number || 'N/A'}`,
                date: new Date(show.first_air_date).toLocaleDateString(),
                image: `https://image.tmdb.org/t/p/original/${show.poster_path}`
            }))

            setTvShows(fetchedTvShows)
        } 
        catch (err) {
            console.log(err)
        }
        finally{
            setLoading(false)
        }
        }

        fetchTvShows()
    }, [])


    // Dummy
    // const tvShows = [
    //     {
    //         title: "The Flash",
    //         type: "Series/S 2/EP 9",
    //         date: "11/05/23",
    //         image: "/assets/images/dummy/Rectangle 22.png"
    //     },
    //     {
    //         title: "The Flash",
    //         type: "Series/S 2/EP 9",
    //         date: "11/05/23",
    //         image: "/assets/images/dummy/Rectangle 22.png"
    //     },
    //     {
    //         title: "The Flash",
    //         type: "Series/S 2/EP 9",
    //         date: "11/05/23",
    //         image: "/assets/images/dummy/Rectangle 22.png"
    //     },
    //     {
    //         title: "The Flash",
    //         type: "Series/S 2/EP 9",
    //         date: "11/05/23",
    //         image: "/assets/images/dummy/Rectangle 22.png"
    //     },
    //     {
    //         title: "The Flash",
    //         type: "Series/S 2/EP 9",
    //         date: "11/05/23",
    //         image: "/assets/images/dummy/Rectangle 22.png"
    //     },
    //     {
    //         title: "The Flash",
    //         type: "Series/S 2/EP 9",
    //         date: "11/05/23",
    //         image: "/assets/images/dummy/Rectangle 22.png"
    //     },
    // ]

    return (
        <Stack
        gap="20px"
        >
            <Text variant="h5">
            Recently Updated
            </Text>
            
            <Flex alignItems="center">
                <Box w='90%'>
                    <Swiper
                    spaceBetween={50}
                    slidesPerView='auto'
                    onSwiper={setSwiper}
                    >
                    {
                    loading ?
                    Array.from({length: 10}).map( (_, k) => (
                        <SwiperSlide
                        style={{
                            width: 'auto'
                        }}
                        key={k}
                        >
                        <Skeleton
                        w="77px"
                        h="124px"
                        borderRadius="8px"
                        key={k}
                        />
                        </SwiperSlide>
                    ) ) :
                    tvShows.map( (tvShow, k) => (
                        <SwiperSlide
                        style={{
                            width: 'auto'
                        }}
                        key={k}
                        >
                            <Flex 
                            gap="20px" 
                            alignItems="center"
                            as={Link}
                            href={`/series/${tvShow.id}`}
                            >
                                <Box
                                as="img"
                                src={tvShow.image}
                                width="77px"
                                height="124px"
                                objectFit="cover"
                                borderRadius="7px"
                                />
                                <Stack
                                gap="10px"
                                >
                                    <Text>
                                    {tvShow.title}
                                    </Text>
                                    <Text>
                                    {tvShow.type}
                                    </Text>
                                    <Text>
                                    {tvShow.date}
                                    </Text>
                                </Stack>
                            </Flex>
                        </SwiperSlide>
                    ) )
                    }
                    </Swiper>
                </Box>
                <IconButton
                onClick={() => swiper.slideNext()}
                ml="auto"
                icon={<IoIosArrowRoundForward />}
                aria-label="next"
                bgColor="whiteAlpha.800"
                color="black"
                flexShrink={0}
                _hover={{
                    bgColor: "whiteAlpha.800"
                }}
                borderRadius="50%"
                w={{ xs: "40px", md: "50px", lg: "60px" }}
                h={{ xs: "40px", md: "50px", lg: "60px" }}
                fontSize={{ xs: "28px", md: "36px", lg: "48px" }}
                />
            </Flex>
        </Stack>
    )
}


export default RecentlyUpdated