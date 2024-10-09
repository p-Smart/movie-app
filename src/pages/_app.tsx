import Loader from "@/components/Loader"
import useGlobalStore from "@/stores"
import "@/styles/globals.css"
import createTheme from "@/theme"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"

const App = ({ Component, pageProps }: AppProps) => {
  const theme = createTheme()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const setGlobalState = useGlobalStore(state => state.setGlobalState)

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => {
      setLoading(false)
      setGlobalState("openMediaMenu", false)
    }

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  }, [router])



  return (
    <>
    <Head>
      <title>Movie App</title>
    </Head>

    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Component {...pageProps} />
      <Loader show={loading} />
    </ChakraProvider>
    <Toaster />
    </>
  )
}

export default App