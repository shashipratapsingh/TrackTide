import { useState } from "react";
import { deliveryService } from "../../../services/api";

export default function DeliveryPage(){
 const [id,setId]=useState("C-1002"); const [otp,setOtp]=useState(""); const [message,setMessage]=useState("");
 async function request(){const r=await deliveryService.requestOtp(id);setMessage(`${r.message}. Demo OTP: ${r.demoOtp || "sent by backend"}`);}
 async function verify(){try{const r=await deliveryService.verifyOtp(id,otp);setMessage(`Delivery completed. Status: ${r.status}`);}catch(e){setMessage(e.message);}}
 return <div><div className="page-heading"><div><span className="eyebrow">Delivery</span><h2>Complete Delivery</h2><p className="muted">OTP verification is handled by the backend in production.</p></div></div>
 <div className="panel otp-panel"><label>Consignment ID<input value={id} onChange={e=>setId(e.target.value)}/></label><button className="btn btn-secondary" onClick={request}>Request Customer OTP</button><label>Customer OTP<input inputMode="numeric" value={otp} onChange={e=>setOtp(e.target.value)} placeholder="Enter OTP"/></label><button className="btn btn-primary" onClick={verify}>Verify OTP & Complete</button>{message&&<div className="alert info">{message}</div>}</div></div>;
}
