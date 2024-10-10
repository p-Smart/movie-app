import { Input, InputGroup, InputGroupProps, InputProps } from "@chakra-ui/react"
import { forwardRef, ReactNode } from "react"

export interface ITextField extends InputProps {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  containerProps?: InputGroupProps;
}

const TextField = forwardRef<HTMLInputElement, ITextField>((
  { startAdornment, endAdornment, containerProps, ...inputProps }, ref
) => {
  return (
    <InputGroup
      size="md"
      border="1px solid"
      borderColor="blackAlpha.500"
      borderRadius="8px"
      padding="10px"
      w="100%"
      bgColor="white"
      {...containerProps}
    >
      {startAdornment}
      <Input
        ref={ref}
        ml="10px"
        _placeholder={{
          color: "black",
        }}
        {...inputProps}
      />
      {endAdornment}
    </InputGroup>
  )
})

TextField.displayName = 'TextField'

export default TextField
