import { Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

// Dashboard pages
import DashboardHome from "../pages/DashboardHome";

import InventoryDetailPage from "../features/inventory/pages/InventoryDetail";
import InventoryListPage from "../features/inventory/pages/InventoryList";
import InventoryFormPage from "../features/inventory/pages/InventoryForm";

import BookingDetailPage from "../features/bookings/pages/BookingDetail";
import BookingsListPage from "../features/bookings/pages/BookingsList";

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
    <Route path="inventory" element={<InventoryListPage />} />
    <Route path="inventory/new" element={<InventoryFormPage />} />
    <Route path="inventory/:id/edit" element={<InventoryDetailPage />} />

    {/* Bookings */}
    <Route path="bookings" element={<BookingsListPage />} />
    <Route path="bookings/:id" element={<BookingDetailPage />} />
  </Route>
);

export default dashboardRoutes;
