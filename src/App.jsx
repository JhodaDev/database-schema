import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dasboard";
import { Start } from "./pages/Start";
import "react-tooltip/dist/react-tooltip.css";
import { Options } from "./pages/Options";
import { AI } from "./pages/Ai";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/options",
    element: <Options />,
  },
  {
    path: "/ai",
    element: <AI />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
