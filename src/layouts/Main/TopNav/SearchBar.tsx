import TextField from "@/components/TextField"
import useGlobalStore from "@/stores"
import {IconButton} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { IoSearch } from "react-icons/io5"



const SearchBar = () => {
    const router = useRouter()
    const ref = useRef<HTMLInputElement>()
    const [searchQuery, setGlobalState] = useGlobalStore(state => [state.searchQuery, state.setGlobalState])

    useEffect(() => {
        if(searchQuery){
            const queryParams = new URLSearchParams(window.location.search)
            queryParams.set("query", searchQuery)

            const newUrl = `${window.location.pathname}?${queryParams.toString()}`
            window.history.replaceState(null, '', newUrl)
        }
    }, [searchQuery])

    useEffect( () => {
        if(router.pathname === "/search"){
            ref.current.focus()
        }
    }, [] )

    return (
        <TextField
        ref={ref}
        onChange={(e) => {
            setGlobalState("searchQuery", e.target.value)
            if(e.target.value && router.pathname !== "/search"){
                router.push("/search")
            }
        }}
        placeholder="Search movies & series..."
        containerProps={{
            borderRadius: '25px',
            p: '3px 7px',
            color: "black",
            maxW: {xs: "100%", "2xl": "416px"}
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