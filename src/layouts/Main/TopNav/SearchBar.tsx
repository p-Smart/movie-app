import TextField from "@/components/TextField"
import useGlobalStore from "@/stores"
import {IconButton} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { IoSearch } from "react-icons/io5"



const SearchBar = () => {
    const router = useRouter()
    const [searchQuery, setGlobalState] = useGlobalStore(state => [state.searchQuery, state.setGlobalState])

    useEffect( () => {
        if(searchQuery && router.pathname !== "/search"){
            router.push("/search")
        }
    }, [searchQuery] )

    return (
        <TextField
        onChange={(e) => setGlobalState("searchQuery", e.target.value)}
        placeholder="Search movies..."
        containerProps={{
            borderRadius: '25px',
            p: '3px 7px',
            color: "black",
            maxW: {xs: "100%", xl: "416px"}
        }}
        value={searchQuery}
        endAdornment={
            <IconButton
            mr="10px"
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            type="submit"
            fontSize={20}
            color='blackAlpha.800'
            icon={<IoSearch />}
            />
        }
        />
    )
}

export default SearchBar