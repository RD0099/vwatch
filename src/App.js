/** @format */

import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Home from "./home";
import Women from "./women";
import WatchDetails from "./WatchDetails";

// Admin pages
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminCategories from "./admin/AdminCategories";

// User pages
import Login from "./login";
import Register from "./register";
import Logout from "./logout";

// Layouts
import AuthLayout from "./layouts/Auth";
import AdminLayout from "./layouts/Admin";
import RTLLayout from "./layouts/RTL";

export default function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Switch>
          {/* Main routes */}
          <Route exact path="/" component={Home} />
          <Route path="/women" component={Women} />
          <Route path="/watch/:id" component={WatchDetails} />

            {/* Admin routes */}
            <Route path="/admin-login" component={AdminLogin} />
            <Route path="/admin-dashboard" component={AdminDashboard} />
            <Route path="/admin-categories" component={AdminCategories} />

          {/* User routes */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />

          {/* Layout routes */}
          <Route path="/auth" component={AuthLayout} />
          <Route path="/admin" component={AdminLayout} />
          <Route path="/rtl" component={RTLLayout} />
          <Redirect from={`/`} to="/admin/dashboard" />

          {/* 404 */}
          <Route render={() => <h1>404 - Page Not Found</h1>} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}
