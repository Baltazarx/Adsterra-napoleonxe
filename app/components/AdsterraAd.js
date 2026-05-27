"use client";
import { useEffect, useRef } from "react";

/**
 * AdsterraAd component - loads Adsterra ad script dynamically
 * Inline banner placement between content sections
 */
export default function AdsterraAd({ className = "" }) {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    const script = document.createElement("script");
    script.src =
      "https://pl29568451.effectivecpmnetwork.com/a8/a0/3f/a8a03fff97146cf4688cb2a8932a8e25.js";
    script.async = true;
    script.type = "text/javascript";

    adRef.current.appendChild(script);

    return () => {
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
