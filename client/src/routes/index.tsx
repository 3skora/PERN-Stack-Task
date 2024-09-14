import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AppLayout = lazy(() => import("../layout/AppLayout"));
const UserPage = lazy(() => import("../pages/users/UsersPage"));

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<UserPage />} />
      </Route>
    </Routes>
  );
}

export default AllRoutes;
