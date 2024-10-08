import { Box, Button, Flex, IconButton, useColorMode } from "@chakra-ui/react"
import SearchBar from "./SearchBar"
import { IoIosNotificationsOutline } from "react-icons/io"
import ToggleColorMode from "../../../components/ToggleColorMode"
import { useState } from "react"
import { RiMenu4Fill } from "react-icons/ri"
import useGlobalStore from "@/stores"



const TopNav = () => {
    const {colorMode} = useColorMode()
    const [openMediaMenu, setGlobalState] = useGlobalStore(state => [state.openMediaMenu, state.setGlobalState])

    return (
        <Flex
        py="30px"
        px={{xs: "20px", md: "50px", lg: "100px", xl: "150px"}}
        alignItems="center"
        justifyContent="space-between"
        gap="20px"
        >
            <Flex gap="15px" display={{xs: 'none', xl: 'flex'}}>
                <Button variant="unstyled">
                    Home
                </Button>
                <Button variant="unstyled">
                    Genre
                </Button>
                <Button variant="unstyled">
                   Country
                </Button>
            </Flex>


            <SearchBar />

            <Flex gap="15px" display={{xs: 'none', xl: 'flex'}}>
                <Button variant="unstyled">
                    Movies
                </Button>
                <Button variant="unstyled">
                    Series
                </Button>
                <Button variant="unstyled">
                   Animation
                </Button>
                <Button variant="unstyled">
                   Login/Signup
                </Button>

                <IconButton 
                variant="unstyled" 
                aria-label="notifications" 
                icon={<IoIosNotificationsOutline />}
                fontSize="24px"
                />
            </Flex>

            <ToggleColorMode />

            <IconButton
            aria-label="media-menu"
            icon={<RiMenu4Fill />}
            color={colorMode==="dark" ? "white" : "black"}
            fontSize="28px"
            onClick={() => setGlobalState("openMediaMenu", true)}
            display={{xs: 'flex', xl: 'none'}}
            />
        </Flex>
    )
}


export default TopNav