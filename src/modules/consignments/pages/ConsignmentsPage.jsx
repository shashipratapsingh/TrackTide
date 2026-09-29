import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { consignmentService } from "../../../services/api";
import { DataTable } from "../../../components/tables/DataTable";
import { StatusBadge } from "../../../components/status/StatusBadge";
import { useAuth } from "../../../context/AuthContext";
import { PERMISSIONS } from "../../../constants/roles";
import { hasPermission } from "../../../utils/accessControl";

export default function ConsignmentsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState([]); const [search, setSearch] = useState(""); const [loading, setLoading] = useState(false);
  async function load(q = search) { setLoading(true); try { const r = await consignmentService.list({search:q}); setItems(r.items || []); } finally { setLoading(false); } }
  useEffect(() => { load(""); }, []);
  const columns = [
    {key:"consignmentNumber",label:"Consignment",render:r=><><b>{r.consignmentNumber}</b><small>{r.consignmentName}</small></>},
    {key:"customerName",label:"Customer"},
    {key:"pickupAddress",label:"Origin"},
    {key:"destinationAddress",label:"Destination"},
    {key:"status",label:"Status",render:r=><StatusBadge status={r.status}/>},
    {key:"price",label:"Price",render:r=>`₹${Number(r.price).toLocaleString("en-IN")}`}
  ];
  const canCreate = hasPermission(user?.role, PERMISSIONS.CREATE_CONSIGNMENT);
  return <div><div className="page-heading"><div><span className="eyebrow">Operations</span><h2>Consignments</h2><p className="muted">Create, search and monitor shipment records.</p></div>{canCreate && <Link className="btn btn-primary" to="/consignments/new">+ New Consignment</Link>}</div>
    <div className="toolbar"><input placeholder="Search consignment number or customer…" value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&load()}/><button className="btn btn-secondary" onClick={()=>load()}>Search</button></div>
    {loading ? <div className="loading-box">Loading consignments…</div> : <DataTable columns={columns} rows={items}/>}
  </div>;
}
