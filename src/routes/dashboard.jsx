import { Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

// Dashboard pages
import DashboardHome from "../pages/DashboardHome";

import InventoryDetailPage from "../features/inventory/pages/InventoryDetail";
import InventoryPage from "../features/inventory/pages/InventoryPage";
import InventoryFormPage from "../features/inventory/pages/InventoryForm";

import BookingDetailPage from "../features/bookings/pages/BookingDetail";
import BookingsPage from "../features/bookings/pages/BookingsPage";

// A wrapper that protects routes
// import RequireAuth from "../features/auth/RequireAuth";

const dashboardRoutes = (
  <Route
    path="/dashboard"
    element={
      // <RequireAuth>
        <DashboardLayout />
      // </RequireAuth>
    }
  >
    {/* Dashboard home */}
    <Route index element={<DashboardHome />} />

    {/* Inventory */}
    <Route path="inventory" element={<InventoryPage />} />
    <Route path="inventory/new" element={<InventoryFormPage />} />
    <Route path="inventory/:id" element={<InventoryDetailPage />} />

    {/* Bookings */}
    <Route path="bookings" element={<BookingsPage />} />
    <Route path="bookings/:id" element={<BookingDetailPage />} />
  </Route>
);

export default dashboardRoutes;
