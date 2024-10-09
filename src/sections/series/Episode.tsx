import { Box, Button, Collapse, Flex, Stack, Text, useColorMode } from "@chakra-ui/react"
import { FC, useState } from "react";
import { IoMdPlay } from "react-icons/io"

interface IEpisode {
    sn: string;
    title: string;
    desp: string;
}

const Episode: FC<IEpisode> = ({
    sn, desp, title,
}) => {
    const {colorMode} = useColorMode()
    const [open, setOpen] = useState(false)


    return (
        <Stack
        w="100%"
        h="fit-content"
        bgColor={colorMode==="dark" ? "whiteAlpha.300" : "darkAlpha.300"}
        _hover={{
            bgColor: "red",
            ...colorMode==="light" && {color: "white"}
        }}
        borderRadius="5px"
        p="10px 15px"
        shadow="md"
        >
            <Flex
            w="100%"
            gap="10px"
            as={Button}
            variant="unstyled"
            justifyContent="left"
            onClick={() => {
                if(open){
                    setOpen(false)
                    return
                }
                setOpen(true)
            }}
            >
                <Box as={IoMdPlay} />
                <Text whiteSpace="normal" wordBreak="break-word" textAlign="left">
                {`Episode ${sn}: ${title}`}
                </Text>
            </Flex>
            <Stack
            as={Collapse}
            in={open}
            >
                <Text>
                    {desp}
                </Text>
            </Stack>
        </Stack>
    )
}


export default Episode