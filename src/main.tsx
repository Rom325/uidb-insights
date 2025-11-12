import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import DeviceListPage from "./pages/DeviceListPage.tsx";
import DeviceDetailsPage from "./pages/DeviceDetailsPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/devices" replace />,
      },
      {
        path: "devices",
        element: <DeviceListPage />,
      },
      {
        path: "devices/:deviceId",
        element: <DeviceDetailsPage />,
      },
      {
        path: "*",
        element: <Navigate to="/devices" replace />,
      },
    ],
  },
]);

createRoot(document.getElementById("app-root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
