import { BrowserRouter, Routes } from "react-router-dom";
import publicRoutes from "./routes/public";
import dashboardRoutes from "./routes/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes}
        {dashboardRoutes}
      </Routes>
    </BrowserRouter>
  );
}

/*
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import publicRoutes from "./routes/public";
import dashboardRoutes from "./routes/dashboard";

function App() {
  const router = createBrowserRouter( 
    createRoutesFromElements(
      publicRoutes
      dashboardRoutes
    )
  )

  return (
    <RouterProvider router={router} />
  );
}
*/

export default App
