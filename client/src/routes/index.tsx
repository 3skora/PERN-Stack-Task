import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AppLayout = lazy(() => import("../layout/AppLayout"));
const UserPage = lazy(() => import("../pages/users/UsersPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<UserPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default AllRoutes;
