import { useMediaQuery } from "@chakra-ui/react";


export const useBreakpoints = () => {
  const [isXs] = useMediaQuery("(max-width: 450px)");
  const [isSm] = useMediaQuery("(max-width: 625px)");
  const [isMd] = useMediaQuery("(max-width: 991px)");
  const [isLg] = useMediaQuery("(max-width: 1200px)");
  const [isXl] = useMediaQuery("(max-width: 1440px)");

  return { xsDown: isXs, smDown: isSm, mdDown: isMd, lgDown: isLg, xlDown: isXl };
};