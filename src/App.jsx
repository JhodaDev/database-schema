import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dasboard";
import { Start } from "./pages/Start";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
