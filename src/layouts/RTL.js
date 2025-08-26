// Chakra imports
import React, { useState, useRef } from "react";
import { Box, Stack, Portal, useColorMode, useDisclosure } from "@chakra-ui/react";

// Layout components
import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";
import Footer from "../components/Footer/Footer";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
import Configurator from "../components/Configurator/Configurator";
import { RtlProvider } from "../components/RTLProvider/RTLProvider";

// Logos
import {
  ArgonLogoDark,
  ArgonLogoLight,
  ChakraLogoDark,
  ChakraLogoLight,
} from "../components/Icons/Icons";

// Assets & Routes
import bgAdmin from "../assets/img/admin-background.png";
import routes from "../routes";

// React Router v5
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

export default function RTL() {
  const { colorMode } = useColorMode();
  const mainPanel = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const location = useLocation();

  // Force RTL layout
  document.documentElement.dir = "rtl";

  // Get active route name
  const getActiveRoute = (routesArray) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routesArray.length; i++) {
      const route = routesArray[i];
      if (route.collapse || route.category) {
        const nestedActive = getActiveRoute(route.views);
        if (nestedActive !== activeRoute) return nestedActive;
      } else {
        if (window.location.href.includes(route.layout + route.path)) return route.name;
      }
    }
    return activeRoute;
  };

  // Get active navbar type
  const getActiveNavbar = (routesArray) => {
    let activeNavbar = false;
    for (let i = 0; i < routesArray.length; i++) {
      const route = routesArray[i];
      if (route.category) {
        const nestedNavbar = getActiveNavbar(route.views);
        if (nestedNavbar !== activeNavbar) return nestedNavbar;
      } else if (window.location.href.includes(route.layout + route.path)) {
        if (route.secondaryNavbar) return route.secondaryNavbar;
      }
    }
    return activeNavbar;
  };

  // Generate React Router v5 routes
  const generateRoutes = (routesArray) =>
    routesArray.map((route, key) => {
      if (route.collapse || route.category) return generateRoutes(route.views);
      if (route.layout === "/rtl" || route.layout === "/admin") {
        const Component = route.component;
        return <Route path={route.layout + route.path} component={Component} key={key} />;
      }
      return null;
    });

  return (
    <RtlProvider>
      {/* Background */}
      <Box
        minH="40vh"
        w="100%"
        position="absolute"
        bgImage={colorMode === "light" ? bgAdmin : "none"}
        bg={colorMode === "light" ? bgAdmin : "navy.900"}
        bgSize="cover"
        top="0"
      />

      {/* Sidebar */}
      <Sidebar
        routes={routes}
        logo={
          <Stack direction="row" spacing="12px" align="center" justify="center">
            {colorMode === "dark" ? <ArgonLogoLight w="74px" h="27px" /> : <ArgonLogoDark w="74px" h="27px" />}
            <Box w="1px" h="20px" bg={colorMode === "dark" ? "white" : "gray.700"} />
            {colorMode === "dark" ? <ChakraLogoLight w="82px" h="21px" /> : <ChakraLogoDark w="82px" h="21px" />}
          </Stack>
        }
        display="none"
        sidebarVariant={sidebarVariant}
      />

      {/* Main Panel */}
      <MainPanel
        variant="rtl"
        ref={mainPanel}
        w={{ base: "100%", xl: "calc(100% - 275px)" }}
      >
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            logoText="ARGON DASHBOARD CHAKRA"
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
          />
        </Portal>

        {/* Panel Content */}
        <PanelContent>
          <PanelContainer>
            <Switch>
              {generateRoutes(routes)}
              <Redirect from="/rtl" to="/rtl/rtl-support-page" />
            </Switch>
          </PanelContainer>
        </PanelContent>

        <Footer />

        {/* Fixed Plugin */}
        <Portal>
          <FixedPlugin
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            onOpen={onOpen}
          />
        </Portal>

        {/* Configurator */}
        <Configurator
          secondary={getActiveNavbar(routes)}
          isOpen={isOpen}
          onClose={onClose}
          isChecked={fixed}
          onSwitch={setFixed}
          onOpaque={() => setSidebarVariant("opaque")}
          onTransparent={() => setSidebarVariant("transparent")}
        />
      </MainPanel>
    </RtlProvider>
  );
}
