import { Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";

// Public pages
import CatalogPage from "../pages/CatalogPage";
import ItemPage from "../pages/ItemPage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import NotFoundPage from "../pages/NotFoundPage";
import Unauthorized from "../pages/Unauthorized";
import ProfilePage from "../pages/ProfilePage";



const publicRoutes = (
  <Route element={<PublicLayout />}>
    {/* Home/catalog */}
    <Route index element={<CatalogPage />} />
    {/* Item Page */}
    <Route path="items/:id" element={<ItemPage />} />
    {/* SignIn */}
    <Route path="signin" element={<SignIn />} />
     {/* SignUp */}
    <Route path="signup" element={<SignUp />} />
    {/* 404 Page - catch all */}
    <Route path='*' element={<NotFoundPage /> } />
    {/* Unauthorized Page */}
    <Route path="/unauthorized" element={<Unauthorized />} />
    {/* Profile */}
    <Route path="profile" element={<ProfilePage />} />
  </Route>
);

export default publicRoutes;