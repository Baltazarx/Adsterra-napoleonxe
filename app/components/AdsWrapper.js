"use client";

import dynamic from "next/dynamic";

/**
 * Client wrapper for SpamAdsManager — dynamically imported with SSR disabled
 * to prevent useRef/useEffect errors during static page generation.
 */
const SpamAdsManager = dynamic(() => import("./SpamAds"), { ssr: false });

export default function AdsWrapper() {
  return <SpamAdsManager />;
}
