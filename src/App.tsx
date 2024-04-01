import Loading from "./components/system/Loading";
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectIsUserLoading,
} from "./core/slices/auth/authSelector";
import { useAppDispatch } from "./utils/hooks/useAppDispatch";
import { checkAuth, logout } from "./core/slices/auth/authSlice";
import { routes } from "./routes/routes";
import paths from "./routes/paths";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { IEvent } from "./core/models/events";
import UsersService from "./services/UsersService";
import { updateUsers } from "./core/slices/users/usersSlice";

const App = () => {
  const isLoading = useSelector(selectIsUserLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  const allUsersQuery = useQuery<IEvent[]>({
    queryKey: ["allUsers"],
    queryFn: () => UsersService.getAllUsers(),
  });

  useEffect(() => {
    dispatch(updateUsers(allUsersQuery.data));
  }, [dispatch, allUsersQuery.data]);

  useEffect(() => {
    async function fetchData() {
      const { payload } = await dispatch(checkAuth());
      if (!payload._id) {
        await dispatch(logout());
      }
    }
    fetchData();
  }, []);

  const saveLastPath = () => {
    const currentPath = window.location.pathname;
    if (
      currentPath !== paths.LOGIN &&
      currentPath !== paths.HOME &&
      currentPath !== paths.REGISTER
    ) {
      localStorage.setItem("lastPath", currentPath);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Routes>
        {routes.map(
          ({
            path,
            protected: isProtected,
            component: Component,
            layout: Layout,
            layoutProps,
          }) => (
            <Route
              key={path}
              path={path}
              element={
                isProtected && !isAuthenticated ? (
                  <>
                    {saveLastPath()}
                    <Navigate to={paths.LOGIN} />
                  </>
                ) : isAuthenticated &&
                  (path === paths.LOGIN || path === paths.REGISTER) ? (
                  <Navigate
                    to={localStorage.getItem("lastPath") || paths.HOME}
                  />
                ) : (
                  <Layout {...layoutProps}>
                    <Component />
                  </Layout>
                )
              }
            />
          ),
        )}
      </Routes>
    </>
  );
};

export default App;
