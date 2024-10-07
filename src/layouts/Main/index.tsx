import TopNav from "@/layouts/Main/TopNav"
import RecentlyUpdated from "@/sections/home/RecentlyUpdated"
import { Stack } from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"



const MainLayout: FC<PropsWithChildren> = (props) => {


    return (
        <Stack>
            <TopNav />
            {props.children}
            <Stack
            py="50px"
            px={{xs: "20px", md: "50px", lg: "100px", xl: "150px"}}
            >
                <RecentlyUpdated />
            </Stack>
        </Stack>
    )
}


export default MainLayout