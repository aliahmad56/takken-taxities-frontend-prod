// routes.jsx

import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { SignIn, SignUp, ConfirmPassword, ConfirmOTP, Home } from "./pages";
import Comparison from "./pages/Comparison";
import ComparisonReport from "./pages/ComparisonReport";

import ReferenceObjectPage from "./pages/ReferenceObjectPage";
import ProfileSetting from "./pages/ProfileSetting";

import StandardParameters from "./pages/StandardParameters";
import EditProfilePage from "./pages/EditProfilePage";
import Layout from "./utils/Layout";
import ModifyPasswordPage from "./pages/ModifyPasswordPage";
import Page404 from "./pages/Page404";
import { AuthContext } from "./context/AuthContext";
import ReferernceObjectForm from "./components/ReferernceObjectForm";
import UpdateReferenceForm from "./components/UpdateReferenceForm";

const AppRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const auth = isLoggedIn();

  return (
    <Routes>
      <Route path="/confirm-password" element={<ConfirmPassword />} />
      {/* <Route path="/signin" element={<SignIn />} /> */}
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/signin"
        element={auth?.isLoggedIn ? <Navigate to="/" /> : <SignIn />}
      />
      <Route path="/confirm-otp" element={<ConfirmOTP />} />
      <Route
        path="/comparison"
        element={
          auth.isLoggedIn ? (
            <Layout>
              <Comparison />{" "}
            </Layout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route
        path="/update-referenceObject"
        element={
          auth.isLoggedIn ? (
            <Layout>
              <div className="text-start text-base font-open-sans text-gray-800 mt-6 md:w-5/6  w-full">
                <UpdateReferenceForm />{" "}
              </div>
            </Layout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

      <Route
        path="/comparison-report"
        element={
          auth.isLoggedIn ? (
            <Layout>
              <ComparisonReport />
            </Layout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

      <Route
        path="/reference"
        element={
          auth.isLoggedIn ? (
            <Layout>
              <ReferenceObjectPage />{" "}
            </Layout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route
        path="/profile"
        element={
          auth.isLoggedIn ? (
            <Layout>
              <ProfileSetting />{" "}
            </Layout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route
        path="/edit-profile"
        element={
          auth.isLoggedIn ? (
            <Layout>
              <EditProfilePage />{" "}
            </Layout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route
        path="/parameter"
        element={
          auth.isLoggedIn ? (
            <Layout>
              <StandardParameters />
            </Layout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

      <Route
        path="/"
        element={
          auth?.isLoggedIn ? (
            <Layout>
              <Home />
            </Layout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

      <Route
        path="/modify-password"
        element={
          auth?.isLoggedIn ? (
            <Layout>
              <ModifyPasswordPage />
            </Layout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="/404" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes;
