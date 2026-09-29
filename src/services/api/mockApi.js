import { seedData } from "./mockData";
import { storageService } from "../storage/storageService";

const clone = value => JSON.parse(JSON.stringify(value));

const getData = () => {
  const existing = storageService.getMockData();
  if (existing) return existing;
  const data = clone(seedData);
  storageService.setMockData(data);
  return data;
};

const save = data => storageService.setMockData(data);

export const mockApi = {
  login({ username, password, role }) {
    return Promise.resolve({
      accessToken: "mock-access-token",
      user: {
        id: "USR-001",
        name: username || "Demo User",
        email: `${(username || "demo").toLowerCase().replace(/\s/g, ".")}@demo.local`,
        role: role || "ADMIN"
      },
      expiresIn: 3600,
      demo: true,
      demoPasswordAccepted: Boolean(password)
    });
  },

  listConsignments(search = "") {
    const data = getData();
    const q = search.trim().toLowerCase();
    const items = data.consignments.filter(item =>
      !q ||
      item.consignmentNumber.toLowerCase().includes(q) ||
      item.customerName.toLowerCase().includes(q)
    );
    return Promise.resolve({ items, total: items.length, page: 0, size: items.length });
  },

  getConsignment(idOrNumber) {
    const data = getData();
    return Promise.resolve(
      data.consignments.find(x => x.id === idOrNumber || x.consignmentNumber === idOrNumber) || null
    );
  },

  createConsignment(payload) {
    const data = getData();
    const warehouse = data.warehouses.find(w => w.id === payload.warehouseId);
    const item = {
      ...payload,
      id: `C-${Date.now()}`,
      consignmentNumber: payload.consignmentNumber || `TT-${String(Math.floor(100000 + Math.random() * 900000))}`,
      warehouseName: warehouse?.name || "",
      status: "CREATED",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.consignments.unshift(item);
    data.tracking[item.consignmentNumber] = [{
      id: 1, status: "CREATED", location: warehouse?.city || "Origin",
      time: item.createdAt, note: "Consignment created"
    }];
    save(data);
    return Promise.resolve(item);
  },

  updateConsignment(id, payload) {
    const data = getData();
    const index = data.consignments.findIndex(x => x.id === id);
    if (index < 0) return Promise.reject(new Error("Consignment not found"));
    data.consignments[index] = { ...data.consignments[index], ...payload, updatedAt: new Date().toISOString() };
    save(data);
    return Promise.resolve(data.consignments[index]);
  },

  getTracking(number, publicOnly = false) {
    const data = getData();
    const consignment = data.consignments.find(x => x.consignmentNumber === number);
    if (!consignment) return Promise.resolve(null);
    return Promise.resolve({
      consignment: publicOnly
        ? {
            consignmentNumber: consignment.consignmentNumber,
            status: consignment.status,
            pickupAddress: consignment.pickupAddress,
            destinationAddress: consignment.destinationAddress
          }
        : consignment,
      events: data.tracking[number] || []
    });
  },

  listWarehouses() { return Promise.resolve({ items: getData().warehouses }); },

  createWarehouse(payload) {
    const data = getData();
    const item = { ...payload, id: `WH-${Date.now()}`, active: true };
    data.warehouses.push(item);
    save(data);
    return Promise.resolve(item);
  },

  listPartners() { return Promise.resolve({ items: getData().partners }); },

  listUsers() {
    return Promise.resolve({
      items: [
        { id: "USR-001", name: "Admin User", email: "admin@demo.local", role: "ADMIN", active: true },
        { id: "USR-002", name: "Warehouse User", email: "warehouse@demo.local", role: "WAREHOUSE_EMPLOYEE", active: true }
      ]
    });
  },

  requestOtp(consignmentId) {
    return Promise.resolve({ success: true, message: "OTP sent to registered customer phone", demoOtp: "583921", consignmentId });
  },

  verifyOtp(consignmentId, otp) {
    if (otp !== "583921") return Promise.reject(new Error("Invalid OTP. Demo OTP is 583921."));
    return Promise.resolve({ success: true, status: "DELIVERED", consignmentId });
  }
};
