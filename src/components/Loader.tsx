import { Box, Spinner, useColorMode } from "@chakra-ui/react"
import { FC } from "react";
interface ILoader {
    show: boolean;
}
const Loader: FC<ILoader> = (props) => {
    const {} = useColorMode()

    return (
        <Box
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        bg="rgba(0,0,0,0.5)"
        display={props.show ? "flex" : "none"}
        alignItems="center"
        justifyContent="center"
        zIndex="9999"
        >
        <Spinner size="xl" color="white" />
        </Box>
    )
}

export default Loader