import MainLayout from "@/layouts/Main"
import Banner from "@/sections/home/Banner"
import NewReleaseM from "@/sections/home/NewReleaseM"
import RecentlyUpdated from "@/sections/home/RecentlyUpdated"
import Trending from "@/sections/home/Trending"
import { Stack } from "@chakra-ui/react"


const HomePage = () => {
    
    return (
        <MainLayout>
            <Banner />
            <Stack
            py="50px"
            px={{xs: "20px", md: "50px", lg: "100px", xl: "150px"}}
            gap="50px"
            >
                <RecentlyUpdated />
                <Trending />
                <NewReleaseM />
            </Stack>
        </MainLayout>
    )
}


export default HomePage