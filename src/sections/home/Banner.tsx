import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react"
import { GoClockFill } from "react-icons/go"
import { IoMdPlayCircle, IoMdStar } from "react-icons/io"
import { MdCalendarMonth } from "react-icons/md"
import { SlSpeedometer } from "react-icons/sl"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Autoplay, Pagination} from 'swiper/modules'
import Link from "next/link"



const Banner = ({movies}: {movies: any []}) => {

    return (
        <Box 
        w="100%"
        >
            <Swiper
            loop
            autoplay={{delay: 2500, pauseOnMouseEnter: true}}
            slidesPerView={1}
            pagination={{clickable: true}}
            modules={[Pagination, Autoplay]}
            style={{
                position: 'relative',
            }}
            >
            {/* Dummy */}
            {/* {
                Array.from({length: 4}).map( (_, k) => (
                    <SwiperSlide
                    key={k}
                    >
                    <Slide
                    image="/assets/images/dummy/Rectangle 2.png"
                    title="Avatar: The Way of Water"
                    tags={["Action", "Adventure", "Science Fiction"]}
                    desp="Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure."
                    year="2022"
                    runtime="3:12:00"
                    rating="8.5"
                    />
                    </SwiperSlide>
                ) )
            } */}
            {
                movies.map( (movie) => (
                    <SwiperSlide
                    key={movie.id}
                    >
                    <Slide
                    id={movie.id}
                    image={movie.backdrop_path}
                    title={movie.title}
                    tags={movie.genres}
                    desp={movie.overview}
                    year={new Date(movie.release_date).getFullYear().toString()}
                    runtime={`${Math.floor(movie.runtime / 60)}:${movie.runtime % 60 < 10 ? '0' : ''}${movie.runtime % 60}:00`}
                    rating={Number(movie.rating).toFixed(1)}
                    />
                    </SwiperSlide>
                ) )
            }
            </Swiper>
        </Box>
    )
    
}

interface ISlide {
    id: string;
    image: string;
    title: string;
    tags: string[];
    desp: string;
    year: string;
    runtime: string;
    rating: string | number;
}

const Slide = (props: ISlide) => {
    const { image, title, tags, desp, year, runtime, rating, id } = props

    const metadata = [
        {
            Icon: MdCalendarMonth,
            value: year,
        },
        {
            Icon: SlSpeedometer,
            value: runtime,
        },
        {
            Icon: IoMdStar,
            value: rating,
        },
    ]

    return (
        <Stack
            w="100%"
            minH="600px"
            bgImage={`linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("${image}")`}
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            backgroundPosition="center center"
            px={{ xs: "20px", md: "50px", lg: "100px", xl: "150px" }}
            py="50px"
            gap="50px"
            position="relative"
        >
            <Flex
                gap="30px"
                top={{ xs: "20%", "2xl": "50%" }}
                left={"50%"}
                flexDir={{ xs: "column", sm: "row" }}
                m="auto"
            >
                <Button
                    py="25px"
                    alignSelf="flex-start"
                    bgColor="red"
                    _hover={{ bgColor: "red" }}
                    borderRadius="3px"
                    rightIcon={<IoMdPlayCircle />}
                    as={Link}
                    href={`/movie/${id}`}
                >
                    Watch Now
                </Button>

                <Button
                    py="25px"
                    alignSelf="flex-start"
                    bgColor="transparent"
                    _hover={{ bgColor: "transparent" }}
                    borderRadius="3px"
                    border="1px solid"
                    borderColor="red"
                    rightIcon={<GoClockFill />}
                    as={Link}
                    href={`/movie/${id}`}
                >
                    Watch Later
                </Button>
            </Flex>

            <Stack w={{ xs: "100%", lg: "80%", xl: "50%" }} gap="20px" mt="auto">
                <Text variant="h4" color="white">
                    {title}
                </Text>
                <Flex gap="20px" flexWrap="wrap">
                    <Flex gap="10px" flexWrap="wrap">
                        {tags.map((tag, k) => (
                            <Text
                                key={k}
                                bgColor="white"
                                color="black"
                                p="5px 8px"
                                fontWeight="600"
                                borderRadius="25px"
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
                <Text color="white">
                    {desp}
                </Text>
            </Stack>
        </Stack>
    )
}

export default Banner