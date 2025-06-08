import { Navigate, Outlet } from "react-router-dom";
import { useLazyGetProfileQuery } from "../store/services/endpoints/auth.endpoint";
import { useEffect } from "react";
import { ProgressLoadingComponent } from "../Components";

const PublicGuardComponent = () => {
  const token = localStorage.getItem("token");
  const [trigger, { data, isLoading }] = useLazyGetProfileQuery();

  useEffect(() => {
    if (token) {
      trigger();
    }
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center  h-lvh  text-center m-auto ">
        <ProgressLoadingComponent value={10} />
      </div>
    );
  }

  if (token && data?.user?.isAdmin === 1) {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (token && data?.user?.isAdmin !== 1) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicGuardComponent;
