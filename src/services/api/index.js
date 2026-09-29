import { env } from "../../config/env";
import { apiClient } from "./apiClient";
import { mockApi } from "./mockApi";

const useMock = env.dataSource === "mock";

const call = (mockFn, apiFn) => useMock ? mockFn() : apiFn();

export const consignmentService = {
  list: ({ search = "" } = {}) =>
    useMock ? mockApi.listConsignments(search) : apiClient.get("/consignments", { params: { search } }).then(r => r.data),
  get: idOrNumber =>
    useMock ? mockApi.getConsignment(idOrNumber) : apiClient.get(`/consignments/${idOrNumber}`).then(r => r.data),
  create: payload =>
    useMock ? mockApi.createConsignment(payload) : apiClient.post("/consignments", payload).then(r => r.data),
  update: (id, payload) =>
    useMock ? mockApi.updateConsignment(id, payload) : apiClient.put(`/consignments/${id}`, payload).then(r => r.data)
};

export const trackingService = {
  get: number =>
    useMock ? mockApi.getTracking(number) : apiClient.get(`/tracking/${number}`).then(r => r.data),
  getPublic: number =>
    useMock ? mockApi.getTracking(number, true) : apiClient.get(`/public/tracking/${number}`).then(r => r.data)
};

export const warehouseService = {
  list: () => useMock ? mockApi.listWarehouses() : apiClient.get("/warehouses").then(r => r.data),
  create: payload => useMock ? mockApi.createWarehouse(payload) : apiClient.post("/warehouses", payload).then(r => r.data)
};

export const partnerService = {
  list: () => useMock ? mockApi.listPartners() : apiClient.get("/delivery-partners").then(r => r.data)
};

export const userService = {
  list: () => useMock ? mockApi.listUsers() : apiClient.get("/users").then(r => r.data)
};

export const deliveryService = {
  requestOtp: id =>
    useMock ? mockApi.requestOtp(id) : apiClient.post(`/deliveries/${id}/otp`).then(r => r.data),
  verifyOtp: (id, otp) =>
    useMock ? mockApi.verifyOtp(id, otp) : apiClient.post(`/deliveries/${id}/verify-otp`, { otp }).then(r => r.data)
};

export const api = { consignmentService, trackingService, warehouseService, partnerService, userService, deliveryService };
