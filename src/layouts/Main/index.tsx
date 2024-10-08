import TopNav from "@/layouts/Main/TopNav"
import { Stack } from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"
import MediaMenu from "./TopNav/MediaMenu"
import useGlobalStore from "@/stores"



const MainLayout: FC<PropsWithChildren> = (props) => {
    const [openMediaMenu, setGlobalState] = useGlobalStore(state => [state.openMediaMenu, state.setGlobalState])

    return (
        <Stack>
            <TopNav />
            {props.children}
            <MediaMenu
            open={openMediaMenu}
            setOpen={(val: boolean) => setGlobalState("openMediaMenu", val)}
            />
        </Stack>
    )
}


export default MainLayout