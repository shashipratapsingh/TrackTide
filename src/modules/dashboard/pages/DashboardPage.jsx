import { useEffect, useState } from "react";
import { consignmentService } from "../../../services/api";
import { StatCard } from "../../../components/common/StatCard";
import { StatusBadge } from "../../../components/status/StatusBadge";

export default function DashboardPage() {
  const [items, setItems] = useState([]);
  useEffect(() => { consignmentService.list().then(r => setItems(r.items || [])); }, []);
  const delivered = items.filter(x => x.status === "DELIVERED").length;
  const transit = items.filter(x => ["IN_TRANSIT","OUT_FOR_DELIVERY"].includes(x.status)).length;
  return <div>
    <div className="page-heading"><div><span className="eyebrow">Overview</span><h2>Today’s operations</h2><p className="muted">Monitor consignments and movement across the network.</p></div></div>
    <div className="stats-grid"><StatCard label="Total Consignments" value={items.length} hint="All active records" /><StatCard label="In Transit" value={transit} hint="Currently moving" /><StatCard label="Delivered" value={delivered} hint="Completed deliveries" /><StatCard label="Pending Action" value={items.filter(x => x.status !== "DELIVERED").length} hint="Needs attention" /></div>
    <div className="panel"><div className="panel-title"><h3>Recent consignments</h3><span className="muted">Live operational view</span></div>
      <div className="table-wrap"><table><thead><tr><th>Consignment</th><th>Customer</th><th>Route</th><th>Status</th><th>Updated</th></tr></thead><tbody>
      {items.map(x => <tr key={x.id}><td><b>{x.consignmentNumber}</b><small>{x.consignmentName}</small></td><td>{x.customerName}</td><td>{x.pickupAddress} → {x.destinationAddress}</td><td><StatusBadge status={x.status}/></td><td>{new Date(x.updatedAt).toLocaleDateString()}</td></tr>)}</tbody></table></div>
    </div>
  </div>;
}
