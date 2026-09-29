import { useEffect, useState } from "react";
import { userService } from "../../../services/api";
import { DataTable } from "../../../components/tables/DataTable";
import { ROLE_LABELS } from "../../../constants/roles";

export default function UsersPage(){
 const [items,setItems]=useState([]); useEffect(()=>{userService.list().then(r=>setItems(r.items||[]));},[]);
 const columns=[{key:"name",label:"User",render:r=><><b>{r.name}</b><small>{r.id}</small></>},{key:"email",label:"Email"},{key:"role",label:"Role",render:r=>ROLE_LABELS[r.role]||r.role},{key:"active",label:"Status",render:r=><span className="status status-success">Active</span>}];
 return <div><div className="page-heading"><div><span className="eyebrow">Administration</span><h2>Users</h2><p className="muted">User and role overview.</p></div></div><DataTable columns={columns} rows={items}/></div>;
}
