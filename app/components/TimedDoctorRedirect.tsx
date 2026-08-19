"use client";

import {useEffect,useRef,useState} from "react";
import {AD_LINK_URL} from "../config/advertisement";
import {DOCTOR_REDIRECT_DELAY_MS,DOCTOR_WEBSITE_URL} from "../config/doctorReferral";

export default function TimedDoctorRedirect(){
 const overlayRef=useRef<HTMLDivElement>(null);
 const[destination,setDestination]=useState<string|null>(null);

 useEffect(()=>{
  const openDestination=(url:string,requestTrueFullscreen:boolean)=>{
   const overlay=overlayRef.current;
   if(!overlay)return;

   // Make the full-window view visible immediately before requesting fullscreen.
   overlay.style.display="block";
   setDestination(url);

   // Browsers allow true fullscreen only while handling a user's click.
   // The automatic 30-second opening still fills the complete browser viewport.
   if(requestTrueFullscreen&&overlay.requestFullscreen){
    void overlay.requestFullscreen().catch(()=>{});
   }
  };

  const clickHandler=(event:MouseEvent)=>{
   const clickedElement=event.target instanceof Element?event.target:null;
   const link=clickedElement?.closest("a");
   if(!(link instanceof HTMLAnchorElement)||link.dataset.directReferral==="true")return;

   const originalHref=link.getAttribute("href");
   const doctorLink=originalHref==="/find-a-doctor"||link.href===DOCTOR_WEBSITE_URL;
   const advertisementLink=link.href===AD_LINK_URL;
   if(!doctorLink&&!advertisementLink)return;

   event.preventDefault();
   openDestination(advertisementLink?AD_LINK_URL:DOCTOR_WEBSITE_URL,true);
  };

  document.addEventListener("click",clickHandler);

  const timer=window.setTimeout(()=>{
   openDestination(DOCTOR_WEBSITE_URL,false);
  },DOCTOR_REDIRECT_DELAY_MS);

  return()=>{
   document.removeEventListener("click",clickHandler);
   window.clearTimeout(timer);
  };
 },[]);

 const closeDestination=()=>{
  if(document.fullscreenElement){
   void document.exitFullscreen().catch(()=>{});
  }
  if(overlayRef.current)overlayRef.current.style.display="none";
  setDestination(null);
 };

 return <div
  ref={overlayRef}
  role="dialog"
  aria-modal="true"
  aria-label="Website 2"
  style={{display:destination?"block":"none",position:"fixed",inset:0,zIndex:2147483647,background:"#fff"}}
 >
  {destination&&<iframe
   src={destination}
   title="Website 2"
   allow="fullscreen"
   style={{display:"block",width:"100%",height:"100%",border:0,background:"#fff"}}
  />}
  <button
   type="button"
   onClick={closeDestination}
   aria-label="Return to MyVeta"
   title="Return to MyVeta"
   style={{position:"fixed",top:10,right:10,zIndex:2147483647,border:0,borderRadius:999,padding:"8px 12px",background:"rgba(0,0,0,.68)",color:"#fff",font:"600 12px Arial,sans-serif",cursor:"pointer"}}
  >
   Back
  </button>
 </div>;
}
