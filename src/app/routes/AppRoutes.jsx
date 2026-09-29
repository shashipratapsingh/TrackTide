import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../guards/ProtectedRoute";
import { PermissionGuard } from "../guards/PermissionGuard";
import { AppLayout } from "../layouts/AppLayout";
import { PERMISSIONS } from "../../constants/roles";

const LoginPage = lazy(() => import("../../modules/auth/pages/LoginPage"));
const DashboardPage = lazy(() => import("../../modules/dashboard/pages/DashboardPage"));
const ConsignmentsPage = lazy(() => import("../../modules/consignments/pages/ConsignmentsPage"));
const CreateConsignmentPage = lazy(() => import("../../modules/consignments/pages/CreateConsignmentPage"));
const TrackingPage = lazy(() => import("../../modules/tracking/pages/TrackingPage"));
const WarehousesPage = lazy(() => import("../../modules/warehouses/pages/WarehousesPage"));
const PartnersPage = lazy(() => import("../../modules/delivery-partners/pages/PartnersPage"));
const DeliveryPage = lazy(() => import("../../modules/deliveries/pages/DeliveryPage"));
const UsersPage = lazy(() => import("../../modules/users/pages/UsersPage"));
const CustomerTrackingPage = lazy(() => import("../../modules/customer-tracking/pages/CustomerTrackingPage"));

export function AppRoutes() {
  return <Suspense fallback={<div className="loading-screen">Loading application…</div>}>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/track" element={<CustomerTrackingPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route element={<PermissionGuard permission={PERMISSIONS.VIEW_DASHBOARD} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route element={<PermissionGuard permission={PERMISSIONS.VIEW_CONSIGNMENTS} />}>
            <Route path="/consignments" element={<ConsignmentsPage />} />
          </Route>
          <Route element={<PermissionGuard permission={PERMISSIONS.CREATE_CONSIGNMENT} />}>
            <Route path="/consignments/new" element={<CreateConsignmentPage />} />
          </Route>
          <Route element={<PermissionGuard permission={PERMISSIONS.MANAGE_WAREHOUSES} />}>
            <Route path="/warehouses" element={<WarehousesPage />} />
          </Route>
          <Route element={<PermissionGuard permission={PERMISSIONS.MANAGE_PARTNERS} />}>
            <Route path="/delivery-partners" element={<PartnersPage />} />
          </Route>
          <Route element={<PermissionGuard permission={PERMISSIONS.VIEW_TRACKING} />}>
            <Route path="/tracking" element={<TrackingPage />} />
          </Route>
          <Route element={<PermissionGuard permission={PERMISSIONS.MANAGE_USERS} />}>
            <Route path="/users" element={<UsersPage />} />
          </Route>
          <Route element={<PermissionGuard permission={PERMISSIONS.DELIVERY_OTP} />}>
            <Route path="/deliveries" element={<DeliveryPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </Suspense>;
}
