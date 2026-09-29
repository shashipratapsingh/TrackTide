import { PERMISSIONS, ROLE_PERMISSIONS, ROLES } from "../constants/roles";

export const hasPermission = (role, permission) =>
  Boolean(role && ROLE_PERMISSIONS[role]?.includes(permission));

export const defaultRouteForRole = (role) =>
  role === ROLES.CUSTOMER ? "/track" : "/dashboard";

export const navigationItems = [
  { path: "/dashboard", label: "Dashboard", permission: PERMISSIONS.VIEW_DASHBOARD },
  { path: "/consignments", label: "Consignments", permission: PERMISSIONS.VIEW_CONSIGNMENTS },
  { path: "/tracking", label: "Tracking", permission: PERMISSIONS.VIEW_TRACKING },
  { path: "/warehouses", label: "Warehouses", permission: PERMISSIONS.MANAGE_WAREHOUSES },
  { path: "/delivery-partners", label: "Delivery Partners", permission: PERMISSIONS.MANAGE_PARTNERS },
  { path: "/deliveries", label: "Deliveries", permission: PERMISSIONS.DELIVERY_OTP },
  { path: "/users", label: "Users", permission: PERMISSIONS.MANAGE_USERS }
];
