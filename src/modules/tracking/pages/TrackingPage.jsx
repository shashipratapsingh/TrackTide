import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { trackingService } from "../../../services/api";
import { StatusBadge } from "../../../components/status/StatusBadge";

export default function TrackingPage() {
  const [params] = useSearchParams(); const [number,setNumber]=useState(params.get("number")||"TT-123456"); const [data,setData]=useState(null); const [error,setError]=useState("");
  async function search(){setError("");const result=await trackingService.get(number);if(!result)setError("Consignment not found");setData(result);}
  return <div><div className="page-heading"><div><span className="eyebrow">Tracking</span><h2>Shipment Tracking</h2><p className="muted">Follow every movement in the consignment lifecycle.</p></div></div>
    <div className="search-hero"><input value={number} onChange={e=>setNumber(e.target.value)} placeholder="Enter consignment number"/><button className="btn btn-primary" onClick={search}>Track Shipment</button></div>
    {error&&<div className="alert error">{error}</div>}
    {data&&<div className="tracking-grid"><div className="panel"><div className="panel-title"><div><h3>{data.consignment.consignmentNumber}</h3><span className="muted">{data.consignment.consignmentName}</span></div><StatusBadge status={data.consignment.status}/></div><div className="detail-grid"><div><span>Customer</span><b>{data.consignment.customerName}</b></div><div><span>Weight</span><b>{data.consignment.weight} kg</b></div><div><span>Warehouse</span><b>{data.consignment.warehouseName}</b></div><div><span>Destination</span><b>{data.consignment.destinationAddress}</b></div></div></div>
    <div className="panel"><h3>Tracking History</h3><div className="timeline">{data.events.map(e=><div className="timeline-item" key={e.id}><div className="dot"></div><div><b>{e.status.replaceAll("_"," ")}</b><span>{e.location} · {new Date(e.time).toLocaleString()}</span><p>{e.note}</p></div></div>)}</div></div></div>}
  </div>;
}
