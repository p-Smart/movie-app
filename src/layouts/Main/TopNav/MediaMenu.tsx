import { Button, IconButton, Stack, Text, useColorMode } from "@chakra-ui/react"
import { Dispatch, FC, SetStateAction } from "react"
import { motion } from "framer-motion"
import useGlobalStore from "@/stores";
import useClickOutside from "@/hooks/useClickOutsidee";
import { IoMdClose } from "react-icons/io";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "100%" },
}


interface IMediaMenu {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const MediaMenu: FC<IMediaMenu> = ({
    open, setOpen
}) => {
    const {colorMode} = useColorMode()
    const [mediaMenuRef, setGlobalState] = useGlobalStore(state => [state.mediaMenuRef, state.setGlobalState])

    useClickOutside({
        ref: [mediaMenuRef],
        handler: () => setOpen(false),
    })

    return (
        <Stack
        as={motion.div}
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={variants}
        position='fixed'
        zIndex={11}
        ref={mediaMenuRef}
        height="100vh"
        w="300px"
        bgColor={colorMode==="dark" ? "black" : "white"}
        p="50px 20px"
        gap="50px"
        display={{xs: 'flex', xl: 'none'}}
        borderLeft="3px solid"
        borderColor="red"
        shadow="lg"
        right={0}
        >
            <IconButton
            aria-label="media-menu"
            icon={<IoMdClose />}
            color={"red"}
            fontSize="28px"
            onClick={() => setGlobalState("openMediaMenu", false)}
            position="absolute"
            top="20px"
            />
            <Stack
            gap='30px'
            as='nav'
            alignItems="flex-start"
            mt="30px"
            >
                <Button variant="unstyled">
                    Home
                </Button>
                <Button variant="unstyled">
                    Genre
                </Button>
                <Button variant="unstyled">
                   Country
                </Button>

                <Button variant="unstyled">
                    Movies
                </Button>
                <Button variant="unstyled">
                    Series
                </Button>
                <Button variant="unstyled">
                   Login/Signup
                </Button>
            </Stack>
        </Stack>
    )
}


export default MediaMenu