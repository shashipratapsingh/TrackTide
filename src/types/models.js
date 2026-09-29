/**
 * Domain model documentation.
 * Runtime validation belongs at the API boundary.
 */

export const emptyConsignment = () => ({
  id: "",
  consignmentNumber: "",
  consignmentName: "",
  type: "Parcel",
  pickupAddress: "",
  destinationAddress: "",
  customerName: "",
  customerPhone: "",
  weight: 0,
  warehouseId: "",
  warehouseName: "",
  price: 0,
  status: "CREATED",
  deliveryPartnerId: null,
  createdAt: null,
  updatedAt: null
});
