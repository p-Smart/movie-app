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
import { Autoplay, Pagination} from 'swiper/modules';



const Banner = () => {


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
            {
                Array.from({length: 4}).map( (_, k) => (
                    <SwiperSlide
                    key={k}
                    >
                        <Slide />
                    </SwiperSlide>
                ) )
            }
            </Swiper>
        </Box>
    )
    
}


const Slide = () => {

    const tags = ["Action", "Adventure", "Science Fiction"]
    const metadata = [
        {
            Icon: MdCalendarMonth,
            value: "2022"
        },
        {
            Icon: SlSpeedometer,
            value: "3:12:00"
        },
        {
            Icon: IoMdStar,
            value: "8.5"
        },
    ]

    return (
        <Stack
        w="100%"
        h="600px"
        bgImage={`linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("/assets/images/dummy/Rectangle 2.png")`}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="center center"
        p="50px"
        gap="50px"
        position="relative"
        >
            <Flex 
            gap="30px" 
            position="absolute" 
            top="50%" 
            left="50%"
            transform="translate(-50%, -50%)"
            >
                <Button
                py="25px"
                alignSelf="flex-start"
                bgColor="red"
                _hover={{bgColor: "red"}}
                borderRadius="3px"
                rightIcon={<IoMdPlayCircle />}
                >
                    Watch Now
                </Button>

                <Button
                py="25px"
                alignSelf="flex-start"
                bgColor="transparent"
                _hover={{bgColor: "transparent"}}
                borderRadius="3px"
                border="1px solid"
                borderColor="red"
                rightIcon={<GoClockFill />}
                >
                    Watch Later
                </Button>
            </Flex>

            <Stack
            w="50%"
            gap="20px"
            mt="auto"
            >
                <Text variant="h4" color="white">
                Avatar: The Way of Water
                </Text>
                <Flex gap="20px">
                    <Flex gap="10px">
                        {
                        tags.map( (tag, k) => (
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
                        ) )
                        }
                    </Flex>
                    <Flex gap="20px">
                        {
                        metadata.map( (data, k) => (
                            <Flex gap="5px" alignItems="center" key={k}>
                                <Box color="white" as={data.Icon} size={24} />
                                <Text color="white">{data.value}</Text>
                            </Flex>
                        ) )
                        }
                    </Flex>
                </Flex>
                <Text color="white">
                Set more than a decade after the events of the first film, learn the story of the 
Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.
                </Text>
            </Stack>
        </Stack>
    )
}

export default Banner