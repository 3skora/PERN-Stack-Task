import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../components/common/Loader";
import ModalManager from "../components/modals/ModalManager";
import FormManager from "../components/forms/FormManager";

const AppLayout = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ModalManager />
      <FormManager />
      <Outlet />
    </Suspense>
  );
};

export default AppLayout;
