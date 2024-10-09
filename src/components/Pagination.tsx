import {GoArrowLeft, GoArrowRight } from 'react-icons/go'
import { FC, useEffect } from "react"
import { useBreakpoints } from '@/theme/mediaQuery';
import { Box, Flex, FlexProps, IconButton, Text, useColorMode } from '@chakra-ui/react';

interface IPagination extends Omit<FlexProps, 'onChange'> {
    currentPage: number; 
    totalPages: number; 
    onChange: (page: number) => void;
}


const Pagination: FC<IPagination> = ({
    currentPage=1, 
    totalPages=1, 
    onChange,
    ...containerProps
}) => {
    const {xsDown, smDown, mdDown, lgDown} = useBreakpoints()

    useEffect( () => {
      window.scrollTo({top: 0})
    }, [currentPage] )

    const maxVisiblePages = smDown ? 5 : mdDown ? 7 : lgDown ? 10 : 12

    const getVisiblePages = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
        pages.push(
          <Page
            key={1}
            pageNumber={1}
            current={currentPage === 1}
            onClick={() => onChange && onChange(1)}
          />
        );
      
        if (startPage > 2) {
          pages.push('...');
        }
      
        for (let i = Math.max(2, startPage); i <= Math.min(totalPages - 1, endPage - 1); i++) {
          pages.push(
            <Page
              key={i}
              pageNumber={i}
              current={currentPage === i}
              onClick={() => onChange && onChange(i)}
            />
          );
        }
      
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
      
        if(startPage!==endPage){
          pages.push(
            <Page
              key={totalPages}
              pageNumber={totalPages}
              current={currentPage === totalPages}
              onClick={() => onChange && onChange(totalPages)}
            />
          );
        }
      
        return pages;
    }
      


    return (
        <Flex
        gap='20px'
        py='5px'
        flexWrap='wrap'
        alignItems="center"
        sx={{
            '& p, button': {
                fontSize: {xs: '.8rem', md: '.9rem', lg: '1rem'},
            }
        }}
        {...containerProps}
        >
        <NavButton 
        prev
        onClick={() => currentPage !== 1 && onChange && onChange(currentPage-1)}
        endPoint={currentPage === 1}
        />
        
        {getVisiblePages()}

        <NavButton
        next
        endPoint={currentPage === totalPages}
        onClick={() => currentPage !== totalPages && onChange && onChange(currentPage+1)}
        />
        </Flex>
    )
}


export default Pagination


const Page = ({pageNumber, onClick, current}: {pageNumber: number; onClick: any; current: boolean;}) => {
    const {colorMode} = useColorMode()

    return (
        <IconButton
        aria-label='page-number'
        onClick={onClick}
        bgColor={current ? 'red': 'transparent'}
        color={current ? "white" : (colorMode==="dark" ? "white" : "black")}
        _hover={{
            bgColor: 'red',
        color: "white"
        }}
        >
        <Text>
        {String(pageNumber).padStart(2, '0')}
        </Text>
        </IconButton>
    )
}



type NavButtonT = {
  onClick: (e) => void,
  endPoint: boolean;
} & ({ next: boolean; prev?: undefined } | { prev: boolean; next?: undefined })


const NavButton = ({onClick, endPoint, next, prev}: NavButtonT) => {
    const {colorMode} = useColorMode()
    const Icon = prev ? GoArrowLeft : next ? GoArrowRight : null

    return (
        <IconButton
        aria-label='nav-button'
        {...endPoint && {disabled: true}}
        _disabled={{
            color: 'blackAlpha.500'
        }}
        _hover={{
            bgColor: endPoint ? 'transparent' : 'primary.main',
            // color: 'white'
        }}
        color={colorMode==="dark" ? "white" : "black"}
        bgColor='transparent'
        onClick={(e) => onClick(e)}
        >
        <Box as={Icon} size={24} color={endPoint ? (colorMode==="dark" ? "whiteAlpha.500" : "blackAlpha.500") : "unset"} />
        </IconButton>
    )
}