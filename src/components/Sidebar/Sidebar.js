/* eslint-disable */
import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Scrollbars } from "react-custom-scrollbars";

// Relative imports
import IconBox from "../Icons/IconBox";
import { HSeparator } from "../Separator/Separator";
import { SidebarHelp } from "./SidebarHelp";
import {
  renderThumbDark,
  renderThumbLight,
  renderTrack,
  renderTrackRTL,
  renderView,
  renderViewRTL,
} from "../Scrollbar/Scrollbar";

import { NavLink, useLocation } from "react-router-dom";

// ---------- Sidebar Main Component ----------
function Sidebar({ logo, routes, sidebarVariant }) {
  const location = useLocation();
  const mainPanel = React.useRef();
  const [state, setState] = React.useState({});
  const variantChange = "0.2s linear";

  // Chakra Color Mode
  const { colorMode } = useColorMode();
  const activeBg = useColorModeValue("white", "navy.700");
  const inactiveBg = "transparent";
  const activeColor = useColorModeValue("gray.700", "white");
  const inactiveColor = useColorModeValue("gray.400", "gray.400");
  const sidebarBg = useColorModeValue("white", "navy.800");
  const sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";
  const thumbVertical = useColorModeValue(renderThumbLight, renderThumbDark);

  const activeRoute = (routeName) => (location.pathname === routeName ? "active" : "");

  const createLinks = (routesArray) =>
    routesArray.map((prop, key) => {
      if (prop.redirect) return null;

      if (prop.category) {
        return (
          <React.Fragment key={key}>
            <Text
              color={activeColor}
              fontWeight="bold"
              mb={{ xl: "6px" }}
              mx="auto"
              ps={{ sm: "10px", xl: "16px" }}
              py="12px"
            >
              {document.documentElement.dir === "rtl" ? prop.rtlName : prop.name}
            </Text>
            {createLinks(prop.views)}
          </React.Fragment>
        );
      }

      const isActive = activeRoute(prop.layout + prop.path) === "active";

      return (
        <NavLink to={prop.layout + prop.path} key={key}>
          <Button
            boxSize="initial"
            justifyContent="flex-start"
            alignItems="center"
            bg={isActive ? activeBg : inactiveBg}
            boxShadow={isActive ? sidebarActiveShadow : "none"}
            mb={{ xl: "6px" }}
            mx={{ xl: "auto" }}
            ps={{ sm: "10px", xl: "16px" }}
            py="12px"
            borderRadius="15px"
            _hover={{}}
            w="100%"
            _active={{ bg: "inherit", transform: "none", borderColor: "transparent" }}
            _focus={{ boxShadow: "none" }}
          >
            <Flex>
              <IconBox
                bg={isActive ? "blue.500" : activeBg}
                color={isActive ? "white" : "blue.500"}
                h="30px"
                w="30px"
                me="12px"
              >
                {prop.icon}
              </IconBox>
              <Text color={activeColor} my="auto" fontSize="sm">
                {document.documentElement.dir === "rtl" ? prop.rtlName : prop.name}
              </Text>
            </Flex>
          </Button>
        </NavLink>
      );
    });

  const links = <>{createLinks(routes)}</>;

  const brand = (
    <Box pt="25px" mb="12px">
      {logo}
      <HSeparator my="26px" />
    </Box>
  );

  return (
    <Box ref={mainPanel}>
      <Box display={{ sm: "none", xl: "block" }} position="fixed">
        <Box
          bg={sidebarBg}
          transition={variantChange}
          w="260px"
          maxW="260px"
          ms={{ sm: "16px" }}
          my={{ sm: "16px" }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          filter="drop-shadow(0px 5px 14px rgba(0, 0, 0, 0.05))"
          borderRadius="20px"
        >
          <Scrollbars
            autoHide
            renderTrackVertical={document.documentElement.dir === "rtl" ? renderTrackRTL : renderTrack}
            renderThumbVertical={thumbVertical}
            renderView={document.documentElement.dir === "rtl" ? renderViewRTL : renderView}
          >
            <Box>{brand}</Box>
            <Stack direction="column" mb="40px">
              <Box>{links}</Box>
            </Stack>
            <SidebarHelp sidebarVariant={sidebarVariant} />
          </Scrollbars>
        </Box>
      </Box>
    </Box>
  );
}

// ---------- Responsive Sidebar ----------
export function SidebarResponsive({ logo, routes, hamburgerColor }) {
  const location = useLocation();
  const mainPanel = React.useRef();
  const btnRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const activeBg = useColorModeValue("white", "navy.700");
  const activeColor = useColorModeValue("gray.700", "white");
  const thumbVertical = useColorModeValue(renderThumbLight, renderThumbDark);

  const activeRoute = (routeName) => (location.pathname === routeName ? "active" : "");

  const createLinks = (routesArray) =>
    routesArray.map((prop, key) => {
      if (prop.redirect) return null;

      if (prop.category) {
        return (
          <React.Fragment key={key}>
            <Text
              color={activeColor}
              fontWeight="bold"
              mb={{ xl: "6px" }}
              mx="auto"
              ps={{ sm: "10px", xl: "16px" }}
              py="12px"
            >
              {document.documentElement.dir === "rtl" ? prop.rtlName : prop.name}
            </Text>
            {createLinks(prop.views)}
          </React.Fragment>
        );
      }

      return (
        <NavLink to={prop.layout + prop.path} key={key}>
          <Button
            boxSize="initial"
            justifyContent="flex-start"
            alignItems="center"
            bg={activeRoute(prop.layout + prop.path) === "active" ? activeBg : "transparent"}
            mb={{ xl: "6px" }}
            mx={{ xl: "auto" }}
            ps={{ sm: "10px", xl: "16px" }}
            py="12px"
            borderRadius="15px"
            _hover={{}}
            w="100%"
            _active={{ bg: "inherit", transform: "none", borderColor: "transparent" }}
            _focus={{ boxShadow: "none" }}
          >
            <Flex>
              <IconBox h="30px" w="30px" me="12px">
                {prop.icon}
              </IconBox>
              <Text color={activeColor} my="auto" fontSize="sm">
                {document.documentElement.dir === "rtl" ? prop.rtlName : prop.name}
              </Text>
            </Flex>
          </Button>
        </NavLink>
      );
    });

  const links = <>{createLinks(routes)}</>;

  const brand = (
    <Box pt="35px" mb="8px">
      {logo}
      <HSeparator my="26px" />
    </Box>
  );

  return (
    <Flex display={{ sm: "flex", xl: "none" }} ref={mainPanel} alignItems="center">
      <HamburgerIcon color={hamburgerColor} w="18px" h="18px" ref={btnRef} onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === "rtl" ? "right" : "left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent w="250px" maxW="250px" borderRadius="16px" bg={useColorModeValue("white", "navy.800")}>
          <DrawerCloseButton _focus={{ boxShadow: "none" }} _hover={{ boxShadow: "none" }} />
          <DrawerBody maxW="250px" px="1rem">
            <Box maxW="100%" h="100vh">
              <Box>{brand}</Box>
              <Stack direction="column" mb="40px">
                <Box>{links}</Box>
              </Stack>
              <SidebarHelp />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Sidebar;
