import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";
import ReduxProvider from "./feature/ReduxProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ReduxProvider>
    <RouterProvider router={router} />
  </ReduxProvider>
);
