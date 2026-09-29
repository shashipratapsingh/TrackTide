import { useEffect, useState } from "react";
import { warehouseService } from "../../../services/api";
import { DataTable } from "../../../components/tables/DataTable";

export default function WarehousesPage(){
  const [items,setItems]=useState([]); const [form,setForm]=useState({name:"",city:"",state:"",capacity:""}); const [show,setShow]=useState(false);
  async function load(){const r=await warehouseService.list();setItems(r.items||[]);} useEffect(()=>{load();},[]);
  async function submit(e){e.preventDefault();await warehouseService.create({...form,capacity:Number(form.capacity)});setForm({name:"",city:"",state:"",capacity:""});setShow(false);load();}
  const columns=[{key:"name",label:"Warehouse",render:r=><><b>{r.name}</b><small>{r.id}</small></>},{key:"city",label:"City"},{key:"state",label:"State"},{key:"capacity",label:"Capacity"},{key:"active",label:"Status",render:r=><span className="status status-success">Active</span>}];
  return <div><div className="page-heading"><div><span className="eyebrow">Network</span><h2>Warehouses</h2><p className="muted">Manage hubs and shipment movement locations.</p></div><button className="btn btn-primary" onClick={()=>setShow(!show)}>+ Add Warehouse</button></div>
  {show&&<div className="panel compact-form"><form onSubmit={submit}><div className="form-grid"><label>Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>City<input required value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/></label><label>State<input required value={form.state} onChange={e=>setForm({...form,state:e.target.value})}/></label><label>Capacity<input type="number" required value={form.capacity} onChange={e=>setForm({...form,capacity:e.target.value})}/></label></div><button className="btn btn-primary">Save Warehouse</button></form></div>}
  <DataTable columns={columns} rows={items}/></div>;
}
