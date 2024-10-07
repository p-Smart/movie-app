import { Box, Button, IconButton, useColorMode } from "@chakra-ui/react"
import { AiFillMoon, AiFillSun } from "react-icons/ai"



const ToggleColorMode = () => {
    const {colorMode, toggleColorMode} = useColorMode()

    return (
        <Button
        variant="unstyled"
        fontSize={24}
        ml="auto"
        onClick={() => toggleColorMode()}
        >
        {colorMode ==="dark" ? <Box as={AiFillSun} color="orange.200" /> : <Box as={AiFillMoon} color="blue.700" />}
        </Button>
    )
}


export default ToggleColorMode