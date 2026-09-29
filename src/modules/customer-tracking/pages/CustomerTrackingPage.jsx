import { useState } from "react";
import { trackingService } from "../../../services/api";
import { StatusBadge } from "../../../components/status/StatusBadge";

export default function CustomerTrackingPage(){
 const [number,setNumber]=useState(""); const [data,setData]=useState(null); const [error,setError]=useState("");
 async function track(e){e.preventDefault();setError("");const r=await trackingService.getPublic(number);if(!r){setError("Consignment number not found");setData(null);}else setData(r);}
 return <div className="public-track"><div className="public-brand"><span className="brand-mark">T</span><b>TrackTide</b></div><div className="public-card"><span className="eyebrow">Public Tracking</span><h1>Track your shipment</h1><p className="muted">Enter your consignment number to view its latest public status.</p><form onSubmit={track} className="search-hero"><input required value={number} onChange={e=>setNumber(e.target.value)} placeholder="e.g. TT-123456"/><button className="btn btn-primary">Track</button></form>{error&&<div className="alert error">{error}</div>}{data&&<div className="public-result"><div><b>{data.consignment.consignmentNumber}</b><StatusBadge status={data.consignment.status}/></div><p>{data.consignment.pickupAddress}</p><div className="route-line">↓</div><p>{data.consignment.destinationAddress}</p><h3>Tracking History</h3>{data.events.map(e=><div className="public-event" key={e.id}><b>{e.status.replaceAll("_"," ")}</b><span>{e.location} · {new Date(e.time).toLocaleString()}</span></div>)}</div>}</div></div>;
}
