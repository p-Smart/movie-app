import { Box, IconButton, Image, Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text } from "@chakra-ui/react"
import { FC } from "react"
import { IoMdPlayCircle, IoMdPause, IoMdResize, IoMdVolumeHigh } from "react-icons/io"
import ReactPlayer from "react-player";

interface VideoUIProps {
  imageUrl: string;
  videoUrl?: string;
}

const VideoUI: FC<VideoUIProps> = ({ imageUrl, videoUrl }) => {

    if(videoUrl){
        return (
            <Box
            position="relative"
            pt="56.25%"
            >
            <ReactPlayer
            className='react-player'
            url={videoUrl}
            controls
            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
            onContextMenu={e => e.preventDefault()}
            width='100%'
            height='100%'
            style={{
                position: "absolute",
                top: 0, 
                left: 0
            }}
            />
        </Box>
        )
    }

    return (
        <Box
        position="relative"
        width="100%"
        height="450px"
        borderRadius="10px"
        overflow="hidden"
        bg="gray.800"
        boxShadow="lg"
        cursor="pointer"
        transition="all 0.3s"
        _hover={{ filter: "brightness(90%)" }}
        >
        <Image
            src={imageUrl}
            alt="Video cover"
            objectFit="cover"
            width="100%"
            height="360px"
        />
        <Flex
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            justifyContent="center"
            alignItems="center"
        >
            <IconButton
            icon={<IoMdPlayCircle />}
            aria-label="Play"
            fontSize="64px"
            color="whiteAlpha.900"
            variant="unstyled"
            />
        </Flex>
        <Box
            position="absolute"
            bottom="0"
            width="100%"
            bg="rgba(0, 0, 0, 0.6)"
            p="10px"
        >
            <Slider aria-label="time-slider" defaultValue={0}>
            <SliderTrack bg="gray.600">
                <SliderFilledTrack bg="white" />
            </SliderTrack>
            <SliderThumb boxSize={3} />
            </Slider>
            <Flex justifyContent="space-between" alignItems="center" mt="10px">
            <Flex alignItems="center" gap="10px">
                <IconButton
                icon={<IoMdPause />}
                aria-label="Pause"
                fontSize="24px"
                color="whiteAlpha.900"
                variant="unstyled"
                />
                <Text color="white" fontSize="14px">00:00 / 00:00</Text>
            </Flex>
            <Flex alignItems="center" gap="10px">
                <IconButton
                icon={<IoMdVolumeHigh />}
                aria-label="Volume"
                fontSize="24px"
                color="whiteAlpha.900"
                variant="unstyled"
                />
                <IconButton
                icon={<IoMdResize />}
                aria-label="Fullscreen"
                fontSize="24px"
                color="whiteAlpha.900"
                variant="unstyled"
                />
            </Flex>
            </Flex>
        </Box>
        </Box>
    )
}

export default VideoUI
