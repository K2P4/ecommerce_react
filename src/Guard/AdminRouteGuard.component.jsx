import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLazyGetProfileQuery } from "../store/services/endpoints/auth.endpoint";

const AdminRouteGuardComponent = () => {
  const token = localStorage.getItem("token");
  const [trigger, { data, isLoading, isError, isSuccess }] = useLazyGetProfileQuery();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (token && !hasFetched) {
      trigger();
      setHasFetched(true);
    }
  }, [token, hasFetched, trigger]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading || !hasFetched) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (isError || !data?.user) {
    return <Navigate to="/login" replace />;
  }

  if (data.user.isAdmin !== 1) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRouteGuardComponent;
