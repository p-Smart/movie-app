import { Input, InputGroup, InputGroupProps, InputProps } from "@chakra-ui/react"
import { FC, ReactNode } from "react";


export interface ITextField extends InputProps {
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
    containerProps?: InputGroupProps;
}

const TextField: FC<ITextField> = ({
    startAdornment, endAdornment, containerProps,
    ...inputProps
}) => {
    
    return (
        <InputGroup
        size="md"
        border="1px solid"
        borderColor='blackAlpha.500'
        borderRadius="8px"
        padding="10px"
        w="100%"
        bgColor='white'
        
        {...containerProps}
        >
            {startAdornment}
            <Input
            ml="10px"
            _placeholder={{
                color: "black"
            }}
            {...inputProps}
            />
            {endAdornment}
        </InputGroup>
    )
}


export default TextField