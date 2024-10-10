import { Box, Button, Flex, IconButton, useColorMode } from "@chakra-ui/react"
import SearchBar from "./SearchBar"
import { IoIosNotificationsOutline } from "react-icons/io"
import ToggleColorMode from "../../../components/ToggleColorMode"
import { useState } from "react"
import { RiMenu4Fill } from "react-icons/ri"
import useGlobalStore from "@/stores"
import Link from "next/link"



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
            <Flex gap="15px" display={{xs: 'none', "2xl": 'flex'}}>
                <Button variant="unstyle" as={Link} href="/">
                    Home
                </Button>
                 <Button variant="unstyle" as={Link} href="/search">
                    Genre
                </Button>
                <Button variant="unstyle" as={Link} href="/search">
                   Country
                </Button>
            </Flex>


            <SearchBar />

            <Flex gap="15px" display={{xs: 'none', "2xl": 'flex'}}
            sx={{
                "& a": {
                    height: "unset"
                }
            }}
            >
                <Button variant="unstyle" as={Link} href="/movie">
                    Movies
                </Button>
                <Button variant="unstyle" as={Link} href="/series">
                    Series
                </Button>
                <Button variant="unstyle" as={Link} href="/search">
                   Animation
                </Button>
                <Button variant="unstyle">
                   Login/Signup
                </Button>

                <IconButton 
                variant="unstyle" 
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
            display={{xs: 'flex', "2xl": 'none'}}
            />
        </Flex>
    )
}


export default TopNav