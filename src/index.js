/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reducers/store";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import { Login, Finish, Unfinish, Error } from "./views";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout exact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment/finish" element={<Finish />} exact />
        <Route path="/payment/unfinish" element={<Unfinish exact />} />
        <Route path="/payment/error" element={<Error />} exact />
        <Route path="*" element={<Navigate to="/login" exact />} />
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" exact />}
        />
      </Routes>
    </BrowserRouter>
  </Provider>
);
