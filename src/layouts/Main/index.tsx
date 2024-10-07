import TopNav from "@/layouts/Main/TopNav"
import { Stack } from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"



const MainLayout: FC<PropsWithChildren> = (props) => {


    return (
        <Stack>
            <TopNav />
            {props.children}
        </Stack>
    )
}


export default MainLayout