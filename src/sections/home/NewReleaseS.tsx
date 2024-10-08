import SeriesCard from "@/components/SeriesCard"
import { Button, Flex, Stack, Text, useColorMode } from "@chakra-ui/react"
import { IoIosArrowRoundForward } from "react-icons/io"



const NewReleaseS = () => {
    const {colorMode} = useColorMode()


    return (
        <Stack
        gap="20px"
        >
            <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
                <Text variant="h5">
                    New Release - Series
                </Text>
                <Button
                rightIcon={<IoIosArrowRoundForward />}
                color={colorMode==="dark" ? "whiteAlpha.700" : "blackAlpha.700"}
                ml="auto"
                >
                    View all
                </Button>
            </Flex>
            <Flex
            flexWrap="wrap"
            gap="30px"
            >
                {
                Array.from({length: 4}).map( (_, k) => (
                    <SeriesCard
                    key={k}
                    />
                ) )
                }
            </Flex>
        </Stack>
    )
}


export default NewReleaseS