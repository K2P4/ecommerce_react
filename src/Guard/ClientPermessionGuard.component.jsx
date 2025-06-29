import { React, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  useLazyGetProfileQuery,
} from "../store/services/endpoints/auth.endpoint";
import { ProgressLoadingComponent } from "../Components";

const ClientPermessionGuardComponent = () => {
  const token = localStorage.getItem("token");
  const [trigger, { data, isLoading }] = useLazyGetProfileQuery();

  useEffect(() => {
    if (token) {
      trigger();
    }
  }, [token]);

  // const { data, isLoading } = useGetProfileQuery(undefined, {
  //   skip: !token,
  // });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressLoadingComponent value={10} />
      </div>
    );
  }

  if (token && data?.user?.isAdmin === 1) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};
export default ClientPermessionGuardComponent;
