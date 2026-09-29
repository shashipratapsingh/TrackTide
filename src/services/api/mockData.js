import { SHIPMENT_STATUS } from "../../constants/status";

export const seedData = {
  warehouses: [
    { id: "WH-001", name: "Delhi Central Hub", city: "Delhi", state: "Delhi", capacity: 1200, active: true },
    { id: "WH-002", name: "Varanasi Hub", city: "Varanasi", state: "Uttar Pradesh", capacity: 850, active: true },
    { id: "WH-003", name: "Noida Distribution Center", city: "Noida", state: "Uttar Pradesh", capacity: 650, active: true }
  ],
  partners: [
    { id: "DP-001", name: "Rahul Kumar", phone: "9876543210", vehicle: "UP16AB1234", active: true },
    { id: "DP-002", name: "Amit Singh", phone: "9876501234", vehicle: "DL01CD7788", active: true }
  ],
  consignments: [
    {
      id: "C-1001", consignmentNumber: "TT-123456", consignmentName: "Electronics Package",
      type: "Parcel", pickupAddress: "Connaught Place, New Delhi",
      destinationAddress: "Lanka, Varanasi, Uttar Pradesh",
      customerName: "Rohit Sharma", customerPhone: "98******21",
      weight: 4.5, warehouseId: "WH-001", warehouseName: "Delhi Central Hub",
      price: 1250, status: SHIPMENT_STATUS.IN_TRANSIT,
      deliveryPartnerId: "DP-001", createdAt: "2026-09-27T08:30:00Z", updatedAt: "2026-09-29T09:15:00Z"
    },
    {
      id: "C-1002", consignmentNumber: "TT-654321", consignmentName: "Documents",
      type: "Document", pickupAddress: "Noida Sector 62",
      destinationAddress: "Gomti Nagar, Lucknow, Uttar Pradesh",
      customerName: "Neha Verma", customerPhone: "99******31",
      weight: 0.8, warehouseId: "WH-003", warehouseName: "Noida Distribution Center",
      price: 450, status: SHIPMENT_STATUS.OUT_FOR_DELIVERY,
      deliveryPartnerId: "DP-002", createdAt: "2026-09-28T11:00:00Z", updatedAt: "2026-09-29T10:00:00Z"
    }
  ],
  tracking: {
    "TT-123456": [
      { id: 1, status: "CREATED", location: "Delhi", time: "2026-09-27T08:30:00Z", note: "Consignment created" },
      { id: 2, status: "DISPATCHED", location: "Delhi Central Hub", time: "2026-09-27T12:15:00Z", note: "Shipment dispatched" },
      { id: 3, status: "IN_TRANSIT", location: "Kanpur Transit Route", time: "2026-09-29T09:15:00Z", note: "Shipment is in transit" }
    ],
    "TT-654321": [
      { id: 1, status: "CREATED", location: "Noida", time: "2026-09-28T11:00:00Z", note: "Consignment created" },
      { id: 2, status: "OUT_FOR_DELIVERY", location: "Lucknow", time: "2026-09-29T10:00:00Z", note: "Out for delivery" }
    ]
  }
};
