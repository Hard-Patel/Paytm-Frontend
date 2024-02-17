import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { ErrorBoundary } from "./pages/Error/ErrorBoundary";
import { SignUp } from "./pages/Auth/SignUp";
import { SignIn } from "./pages/Auth/SignIn";
import { Transfer } from "./pages/Dashboard/Transfer";
import { ProtectedRoutes } from "./pages/Auth/PrivateRoute";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    action: (props) => {
      console.log('props: ', props);
      return true;
    },
    children: [
      {
        element: <Dashboard />,
        path: "dashboard/",
        // with this data loaded before rendering
        //   loader: async ({ request, params }) => {
        //     return fetch(
        //       `/fake/api/teams/${params.teamId}.json`,
        //       { signal: request.signal }
        //     );
        //   },

        //   // performing this mutation when data is submitted to it
        //   action: async ({ request }) => {
        //     return updateFakeTeam(await request.formData());
        //   },

        //   // and renders this element in case something went wrong
        errorElement: <ErrorBoundary />,

      },
      {
        element: <Transfer />,
        path: "send/",
        errorElement: <ErrorBoundary />,
      },
      { path: "/", element: <Dashboard /> },
    ],
    errorElement: <ErrorBoundary />
  },
  {
    element: <SignUp />,
    path: "signup/",
    errorElement: <ErrorBoundary />,
  },
  {
    element: <SignIn />,
    path: "signin/",
    errorElement: <ErrorBoundary />,
  },
]);
export { AppRouter };
