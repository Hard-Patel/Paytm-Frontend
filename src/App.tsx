// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { ErrorBoundary } from "./pages/Error/ErrorBoundary";
import { SignUp } from "./pages/Auth/SignUp";
import { SignIn } from "./pages/Auth/SignIn";
import { Transfer } from "./pages/Dashboard/Transfer";

const AppRouter = createBrowserRouter([
  {
    // it renders this element
    element: <Dashboard />,

    // when the URL matches this segment
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
    // it renders this element
    element: <SignUp />,

    // when the URL matches this segment
    path: "signup/",

    errorElement: <ErrorBoundary />,
  },
  {
    // it renders this element
    element: <SignIn />,

    // when the URL matches this segment
    path: "signin/",

    errorElement: <ErrorBoundary />,
  },
  {
    // it renders this element
    element: <Transfer />,

    // when the URL matches this segment
    path: "send/",

    errorElement: <ErrorBoundary />,
  },
  { path: "/", element: <Dashboard /> },
]);
export { AppRouter };
