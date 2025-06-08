import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useLazyGetProfileQuery } from "../store/services/endpoints/auth.endpoint";
import { useEffect } from "react";
import { ProgressLoadingComponent } from "../Components";

const RouteGuardComponent = () => {
  const token = localStorage.getItem("token");
  const [trigger, { data, isLoading }] = useLazyGetProfileQuery();

  useEffect(() => {
    if (token) {
      trigger();
    }
  }, [token]);
  const location = useLocation();
  const isAdmin = data?.user?.isAdmin === 1;

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center  h-lvh  text-center m-auto ">
        <ProgressLoadingComponent value={10} />
      </div>
    );
  }

  if (!token || !data) {
    return <Navigate to="/client/login" replace />;
  }

  if (location.pathname.startsWith("/admin") && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RouteGuardComponent;
