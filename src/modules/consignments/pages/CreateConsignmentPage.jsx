import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { consignmentService, warehouseService } from "../../../services/api";

const initial = { consignmentName:"", type:"Parcel", pickupAddress:"", destinationAddress:"", customerName:"", customerPhone:"", weight:"", warehouseId:"", price:"" };

export default function CreateConsignmentPage() {
  const [form,setForm]=useState(initial); const [warehouses,setWarehouses]=useState([]); const [error,setError]=useState(""); const navigate=useNavigate();
  useEffect(()=>{warehouseService.list().then(r=>setWarehouses(r.items||[]));},[]);
  function change(e){setForm({...form,[e.target.name]:e.target.value});}
  async function submit(e){e.preventDefault();setError("");try{const item=await consignmentService.create({...form,weight:Number(form.weight),price:Number(form.price)});navigate(`/tracking?number=${item.consignmentNumber}`);}catch(err){setError(err.message||"Unable to create");}}
  return <div><div className="page-heading"><div><span className="eyebrow">Consignments</span><h2>Create Consignment</h2><p className="muted">Register a shipment and assign its origin warehouse.</p></div></div>
    <div className="panel form-panel">{error&&<div className="alert error">{error}</div>}<form onSubmit={submit}><div className="form-grid">
      <label>Consignment Name<input name="consignmentName" required value={form.consignmentName} onChange={change}/></label>
      <label>Type<select name="type" value={form.type} onChange={change}><option>Parcel</option><option>Document</option><option>Fragile</option><option>Bulk</option></select></label>
      <label>Customer Name<input name="customerName" required value={form.customerName} onChange={change}/></label>
      <label>Customer Phone<input name="customerPhone" required value={form.customerPhone} onChange={change}/></label>
      <label className="wide">Pickup / Shipping Address<textarea name="pickupAddress" required value={form.pickupAddress} onChange={change}/></label>
      <label className="wide">Dispatch / Destination Address<textarea name="destinationAddress" required value={form.destinationAddress} onChange={change}/></label>
      <label>Weight (kg)<input type="number" step="0.1" name="weight" required value={form.weight} onChange={change}/></label>
      <label>Price (₹)<input type="number" name="price" required value={form.price} onChange={change}/></label>
      <label>Warehouse<select name="warehouseId" required value={form.warehouseId} onChange={change}><option value="">Select warehouse</option>{warehouses.map(w=><option key={w.id} value={w.id}>{w.name}</option>)}</select></label>
    </div><div className="form-actions"><button type="button" className="btn btn-secondary" onClick={()=>navigate("/consignments")}>Cancel</button><button className="btn btn-primary">Create Consignment</button></div></form></div>
  </div>;
}
