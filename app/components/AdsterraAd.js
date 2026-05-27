"use client";
import { useEffect, useRef } from "react";

/**
 * AdsterraAd component - loads Adsterra ad script dynamically
 * 
 * Usage: <AdsterraAd />
 * 
 * The script is loaded once per component mount and cleaned up on unmount
 * to prevent duplicate script loading during client-side navigation.
 */
export default function AdsterraAd({ className = "" }) {
  const adRef = useRef(null);

  useEffect(() => {
    // Prevent duplicate script injection
    if (!adRef.current) return;

    const script = document.createElement("script");
    script.src =
      "https://pl29568451.effectivecpmnetwork.com/a8/a0/3f/a8a03fff97146cf4688cb2a8932a8e25.js";
    script.async = true;
    script.type = "text/javascript";

    adRef.current.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (adRef.current) {
        adRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={adRef}
      className={`adsterra-container ${className}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "90px",
        margin: "20px 0",
        overflow: "hidden",
      }}
    />
  );
}
