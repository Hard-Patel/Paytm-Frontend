// In ProtectedRoutes.js

import { RoutesProps } from "react-router-dom";
import { Constants } from "../../utils/Constants";

const ProtectedRoutes = ({ children }: RoutesProps) => {
  const auth = localStorage.getItem(Constants.AuthToken);

  return auth ? children : children;
};
export { ProtectedRoutes };
