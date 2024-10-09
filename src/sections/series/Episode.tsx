import { Box, Button, Collapse, Flex, Stack, Text, useColorMode } from "@chakra-ui/react"
import { FC, useState } from "react";
import { IoMdPlay } from "react-icons/io"

interface IEpisode {
    sn: string;
    title: string;
    desp: string;
    active: boolean;
}

const Episode: FC<IEpisode> = ({
    sn, desp, title,
}) => {
    const {colorMode} = useColorMode()
    const [open, setOpen] = useState(false)


    return (
        <Stack
        w="100%"
        bgColor={colorMode==="dark" ? "whiteAlpha.300" : "darkAlpha.300"}
        >
            <Flex 
            w="100%"
            gap="10px"
            as={Button}
            variant="unstyled"
            onClick={() => {
                if(open){
                    setOpen(false)
                    return
                }
                setOpen(true)
            }}
            >
                <Box as={IoMdPlay} />
                {`Episode ${sn}: ${title}`}
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