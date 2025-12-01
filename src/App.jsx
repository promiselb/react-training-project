import { BrowserRouter, Routes } from "react-router-dom";
import publicRoutes from "./routes/public";
import dashboardRoutes from "./routes/dashboard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "./features/auth/authThunks";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Any global initialization logic can go here
    const user = localStorage.getItem("user");
    if (user) {
      // Dispatch an action to set the user in Redux store if needed
      // dispatch(setUser(JSON.parse(user)));
      dispatch(loginUser.fulfilled(JSON.parse(user)));
    }
  }, [dispatch]);
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
