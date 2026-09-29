import { useEffect, useState } from "react";
import { partnerService } from "../../../services/api";
import { DataTable } from "../../../components/tables/DataTable";

export default function PartnersPage(){
 const [items,setItems]=useState([]); useEffect(()=>{partnerService.list().then(r=>setItems(r.items||[]));},[]);
 const columns=[{key:"name",label:"Partner",render:r=><><b>{r.name}</b><small>{r.id}</small></>},{key:"phone",label:"Phone"},{key:"vehicle",label:"Vehicle"},{key:"active",label:"Status",render:r=><span className="status status-success">Active</span>}];
 return <div><div className="page-heading"><div><span className="eyebrow">Delivery Operations</span><h2>Delivery Partners</h2><p className="muted">View and manage delivery partner assignments.</p></div></div><DataTable columns={columns} rows={items}/></div>;
}
