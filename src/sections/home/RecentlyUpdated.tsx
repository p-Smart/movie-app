import { Box, Flex, IconButton, Stack, Text } from "@chakra-ui/react"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useState } from "react"
import SwiperCore from "swiper";
import { IoIosArrowRoundForward, IoMdArrowForward } from "react-icons/io"



const RecentlyUpdated = () => {
    const [swiper, setSwiper] = useState<SwiperCore>()

    const movies = [
        {
            title: "The Flash",
            type: "Series/S 2/EP 9",
            date: "11/05/23",
            image: "/assets/images/dummy/Rectangle 22.png"
        },
        {
            title: "The Flash",
            type: "Series/S 2/EP 9",
            date: "11/05/23",
            image: "/assets/images/dummy/Rectangle 22.png"
        },
        {
            title: "The Flash",
            type: "Series/S 2/EP 9",
            date: "11/05/23",
            image: "/assets/images/dummy/Rectangle 22.png"
        },
        {
            title: "The Flash",
            type: "Series/S 2/EP 9",
            date: "11/05/23",
            image: "/assets/images/dummy/Rectangle 22.png"
        },
        {
            title: "The Flash",
            type: "Series/S 2/EP 9",
            date: "11/05/23",
            image: "/assets/images/dummy/Rectangle 22.png"
        },
        {
            title: "The Flash",
            type: "Series/S 2/EP 9",
            date: "11/05/23",
            image: "/assets/images/dummy/Rectangle 22.png"
        },
    ]

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
                        movies.map( (movie, k) => (
                            <SwiperSlide
                            style={{
                                width: 'auto'
                            }}
                            key={k}
                            >
                                <Flex gap="20px" alignItems="center">
                                    <Box
                                    as="img"
                                    src={movie.image}
                                    width="77px"
                                    height="124px"
                                    objectFit="cover"
                                    borderRadius="7px"
                                    />
                                    <Stack
                                    gap="10px"
                                    >
                                        <Text>
                                        {movie.title}
                                        </Text>
                                        <Text>
                                        {movie.type}
                                        </Text>
                                        <Text>
                                        {movie.date}
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