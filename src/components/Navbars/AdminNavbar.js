// Chakra Imports
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AdminNavbarLinks from "./AdminNavbarLinks";

export default function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);

  const { fixed, secondary, brandText, onOpen, ...rest } = props;

  const changeNavbar = () => {
    setScrolled(window.scrollY > 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);
    return () => window.removeEventListener("scroll", changeNavbar);
  }, []);

  // -----------------------------
  // Call all hooks unconditionally
  // -----------------------------
  const colorGray700Gray200 = useColorModeValue("gray.700", "gray.200");
  const colorWhiteGray200 = useColorModeValue("white", "gray.200");
  const shadowLight = useColorModeValue(
    "0px 7px 23px rgba(0, 0, 0, 0.05)",
    "none"
  );
  const bgLight = useColorModeValue(
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const borderLight = useColorModeValue("#FFFFFF", "rgba(255, 255, 255, 0.31)");
  const filterLight = useColorModeValue(
    "none",
    "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
  );
  // -----------------------------

  // Now determine values based on props/state
  const mainText = fixed && scrolled ? colorGray700Gray200 : colorWhiteGray200;
  const secondaryText = fixed && scrolled ? colorGray700Gray200 : colorWhiteGray200;

  let navbarPosition = "absolute";
  let navbarShadow = "none";
  let navbarBg = "none";
  let navbarBorder = "transparent";
  let navbarFilter = "none";
  let navbarBackdrop = "none";
  let secondaryMargin = "0px";
  let paddingX = "15px";

  if (fixed && scrolled) {
    navbarPosition = "fixed";
    navbarShadow = shadowLight;
    navbarBg = bgLight;
    navbarBorder = borderLight;
    navbarFilter = filterLight;
  }

  if (secondary) {
    navbarBackdrop = "none";
    navbarPosition = "absolute";
    secondaryMargin = "22px";
    paddingX = "30px";
  }

  return (
    <Flex
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderWidth="1.5px"
      borderStyle="solid"
      transition="0.25s linear"
      alignItems={{ xl: "center" }}
      borderRadius="16px"
      display="flex"
      minH="75px"
      justifyContent={{ xl: "center" }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="8px"
      left={document.documentElement.dir === "rtl" ? "30px" : ""}
      right={document.documentElement.dir === "rtl" ? "" : "30px"}
      px={{ sm: paddingX, md: "30px" }}
      ps={{ xl: "12px" }}
      pt="8px"
      top="18px"
      w={{ sm: "calc(100vw - 30px)", xl: "calc(100vw - 75px - 275px)" }}
      {...rest}
    >
      <Flex w="100%" flexDirection={{ sm: "column", md: "row" }} alignItems={{ xl: "center" }}>
        <Box mb={{ sm: "8px", md: "0px" }}>
          <Breadcrumb>
            <BreadcrumbItem color={mainText}>
              <BreadcrumbLink href="#" color={secondaryText}>
                Pages
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem color={mainText}>
              <BreadcrumbLink href="#" color={mainText}>
                {brandText}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Link
            color={mainText}
            href="#"
            bg="inherit"
            borderRadius="inherit"
            fontWeight="bold"
            _hover={{ color: mainText }}
            _active={{ bg: "inherit", transform: "none", borderColor: "transparent" }}
            _focus={{ boxShadow: "none" }}
          >
            {brandText}
          </Link>
        </Box>
        <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
          <AdminNavbarLinks
            onOpen={onOpen}
            logoText={props.logoText}
            secondary={secondary}
            fixed={fixed}
            scrolled={scrolled}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
