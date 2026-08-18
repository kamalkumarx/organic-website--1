"use client";

import {useEffect} from "react";
import {DOCTOR_REDIRECT_DELAY_MS,DOCTOR_WEBSITE_URL} from "../config/doctorReferral";

export default function TimedDoctorRedirect(){
 useEffect(()=>{
  const timer=window.setTimeout(()=>{
   window.location.href=DOCTOR_WEBSITE_URL;
  },DOCTOR_REDIRECT_DELAY_MS);

  return()=>window.clearTimeout(timer);
 },[]);

 return null;
}
