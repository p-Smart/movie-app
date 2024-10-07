import MainLayout from "@/layouts/Main"
import { Text } from "@chakra-ui/react"


const HomePage = () => {
    
    return (
        <MainLayout> 
        <Text
        variant="h5"
        textAlign="center"
        mt="50px"
        >
            Hello World
        </Text>
        </MainLayout>
    )
}


export default HomePage