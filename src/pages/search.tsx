import MainLayout from "@/layouts/Main"
import useGlobalStore from "@/stores"
import { TMDBClient } from "@/utils/axios"
import { Text } from "@chakra-ui/react"
import { useState } from "react"
import toast from "react-hot-toast"



const SearchPage = () => {
    const [searchQuery, setGlobalState] = useGlobalStore(state => [state.searchQuery, state.setGlobalState])
    const [loading, setLoading] = useState(true)

    // const fetchResult = async () => {
    //     try{
    //         setLoading(true)
    //         const { data } = await TMDBClient.get(`/search/multi?${searchQuery}`)
    //     }
    //     catch(err){
    //         toast.error(err.message)
    //     }
    //     finally{

    //     }
    // }


    return (
        <MainLayout>
            <Text 
            m="auto" 
            fontSize="1.1rem"
            textAlign="center"
            >
                No show to display.<br/>Search something else
            </Text>
        </MainLayout>
    )
}


export default SearchPage