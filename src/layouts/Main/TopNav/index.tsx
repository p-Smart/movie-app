import { Box, Button, Flex, IconButton, useColorMode } from "@chakra-ui/react"
import SearchBar from "./SearchBar"
import { IoIosNotificationsOutline } from "react-icons/io"
import ToggleColorMode from "../../../components/ToggleColorMode"
import { useEffect, useState } from "react"
import { RiMenu4Fill } from "react-icons/ri"
import useGlobalStore from "@/stores"
import Link from "next/link"



const TopNav = () => {
    const {colorMode} = useColorMode()
    const [topNavRef, setGlobalState] = useGlobalStore(state => [state.topNavRef, state.setGlobalState])
    const [scrollTop, setScrollTop] = useState(0)
    const [isVisible, setIsVisible] = useState(true);

    useEffect( () => {
        if(topNavRef.current){
            const rect = topNavRef.current.getBoundingClientRect()
            setGlobalState('topNavOffset', rect.height + rect.top)
        }
    }, [topNavRef.current] )

    useEffect(() => {
      let lastScrollTop = 0;
  
      const handleScroll = () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setScrollTop(currentScrollTop)
        if (currentScrollTop > lastScrollTop && currentScrollTop > 300) {
          // Scrolling down
          setIsVisible(false);
        } 
        else {
          // Scrolling up
          setIsVisible(true);
        }
  
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return (
        <Flex
        ref={topNavRef}
        position='fixed'
        transition="all .8s ease"
        zIndex={10}
        top={isVisible ? 0 : "-200px"}
        py="30px"
        px={{xs: "20px", md: "50px", lg: "100px", xl: "150px"}}
        alignItems="center"
        justifyContent="space-between"
        gap="20px"
        bgColor={colorMode==="dark" ? "black" : "white"}
        w="100%"
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