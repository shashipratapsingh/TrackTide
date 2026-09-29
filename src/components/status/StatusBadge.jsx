import { STATUS_LABELS } from "../../constants/status";

export function StatusBadge({ status }) {
  const tone = status === "DELIVERED" ? "success" : status === "DELIVERY_FAILED" || status === "CANCELLED" ? "danger" : "info";
  return <span className={`status status-${tone}`}>{STATUS_LABELS[status] || status}</span>;
}
