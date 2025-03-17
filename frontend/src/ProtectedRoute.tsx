import React, { useContext } from "react";
import { AuthContext } from "./AuthContext/AuthContext.tsx";
import { NotAuthorizedPage } from "./pages/NotAuthorizedPage.tsx";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <NotAuthorizedPage />;
  }

  return <>{children}</>;
};