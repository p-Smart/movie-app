import "@/styles/globals.css";
import createTheme from "@/theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  const theme = createTheme()


  return (
    <>
    <Head>
      <title>Movie App</title>
    </Head>

    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Component {...pageProps} />
    </ChakraProvider>
    </>
  );
}

export default App