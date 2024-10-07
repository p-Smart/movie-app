import { Text } from "@chakra-ui/react"



const Tag = ({text}: {text: string}) => {

    return (
        <Text
        bgColor="white"
        color="black"
        p="5px 8px"
        fontWeight="600"
        borderRadius="25px"
        alignSelf="flex-start"
        >
        {text}
        </Text>
    )
}


export default Tag