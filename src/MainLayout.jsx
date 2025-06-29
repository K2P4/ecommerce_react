import React, { useEffect, useState } from "react";
import { AdminNav, NavComponent } from "./Components";
import { Outlet } from "react-router-dom";
import { useLazyGetProfileQuery } from "./store/services/endpoints/auth.endpoint";

const MainLayout = () => {
  const token = localStorage.getItem("token");
  const [trigger, { data, isLoading }] = useLazyGetProfileQuery();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (token && !hasFetched) {
      trigger();
      setHasFetched(true);
    }
  }, [token, hasFetched, trigger]);

  const isAdmin = data?.user?.isAdmin === 1;
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const body = document.body;
    if (isAdminRoute && isAdmin) {
      body.classList.add("admin-bg");
      body.classList.remove("client-bg");
    } else {
      body.classList.add("client-bg");
      body.classList.remove("admin-bg");
    }

    return () => {
      body.classList.remove("admin-bg");
      body.classList.remove("client-bg");
    };
  }, [isAdminRoute, isAdmin]);

  return (
    <div>
      {isAdmin && isAdminRoute ? <AdminNav /> : <NavComponent />}
      <div
        className={`flex-1  ${data?.user?.isAdmin !== 1 ? "" : "mt-10 px-6"}`}
        style={{
          marginLeft: data?.user?.isAdmin === 1 ? "75px " : undefined,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
