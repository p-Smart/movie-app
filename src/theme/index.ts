import { extendTheme, StyleFunctionProps, ThemeConfig, ThemeOverride } from '@chakra-ui/react'
import createText from './components/create-text'
import createPalette from './create-palette'
import createButton from './components/create-button'
import createInput from './components/create-input'

const createTheme = () => {
    const Text = createText()
    const Button = createButton()
    const Input = createInput()
    const palette = createPalette()
    

    return extendTheme({
        config: {
            initialColorMode: "dark",
            useSystemColorMode: true,
        },
        styles: {
            global: (props: StyleFunctionProps) => ({
                body: {
                    background: props.colorMode==="dark" ? "black" : "white"
                }
            })
        },
        colors: palette,
        breakpoints: {
            xs: '0px',
            sm: '450px',
            md: '625px',
            lg: '991px',
            xl: '1200px',
            "2xl": '1440px',
        },
        fonts: {
            body: '"Poppins", system-ui',
            heading: '"Poppins", system-ui',
            mono: '"Poppins", system-ui',
        },
        components: {
            Text,
            Button: Button as any,
            Input,
            Divider: {
                baseStyle: {
                    borderColor: 'blackAlpha.300'
                },
            },
        },
    } as ThemeConfig)
}

export default createTheme