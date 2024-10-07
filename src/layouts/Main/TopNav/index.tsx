import { Box, Button, Flex, IconButton } from "@chakra-ui/react"
import SearchBar from "./SearchBar"
import { IoIosNotificationsOutline } from "react-icons/io"
import ToggleColorMode from "../../../components/ToggleColorMode"



const TopNav = () => {


    return (
        <Flex
        py="30px"
        px={{xs: "20px", md: "50px", lg: "100px", xl: "150px"}}
        alignItems="center"
        justifyContent="space-between"
        gap="20px"
        >
            <Flex gap="15px">
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

            <Flex gap="15px">
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

                <ToggleColorMode />
            </Flex>
        </Flex>
    )
}


export default TopNav