"use client";
import { useState, useEffect } from "react";

/**
 * SmartLinkAd — Adsterra SmartLink banner ad component
 * Renders clickable ad banners that link to the SmartLink URL.
 * CSS class: .smartlink-ad (used by spam.py for auto-click targeting)
 */

const SMARTLINK_URL =
  "https://www.effectivecpmnetwork.com/a8cycznetj?key=edaa20a1e71916ca333e3cd69fd42b63";

const AD_VARIANTS = [
  {
    bg: "linear-gradient(135deg, #e63946, #f72585)",
    emoji: "🎰",
    text: "MAIN SLOT SEKARANG! Bonus 500% Deposit!",
    cta: "CLAIM BONUS →",
  },
  {
    bg: "linear-gradient(135deg, #00b4d8, #0077b6)",
    emoji: "🛡️",
    text: "VPN PREMIUM GRATIS! Privasi 100% Aman!",
    cta: "DOWNLOAD →",
  },
  {
    bg: "linear-gradient(135deg, #f72585, #7209b7)",
    emoji: "💋",
    text: "1.247 orang di sekitarmu sedang online!",
    cta: "CHAT SEKARANG →",
  },
  {
    bg: "linear-gradient(135deg, #ffd60a, #e85d04)",
    emoji: "🏆",
    text: "SELAMAT! Kamu mendapat hadiah spesial!",
    cta: "KLAIM HADIAH →",
  },
  {
    bg: "linear-gradient(135deg, #06d6a0, #118ab2)",
    emoji: "💰",
    text: "Raih Rp 50.000.000/bulan dari rumah!",
    cta: "MULAI GRATIS →",
  },
];

export default function SmartLinkAd({ variant = "banner" }) {
  const [adIndex, setAdIndex] = useState(0);

  useEffect(() => {
    setAdIndex(Math.floor(Math.random() * AD_VARIANTS.length));
  }, []);

  const ad = AD_VARIANTS[adIndex];

  if (variant === "button") {
    return (
      <a
        href={SMARTLINK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="smartlink-ad smartlink-btn"
        style={{ background: ad.bg }}
      >
        <span className="smartlink-btn-emoji">{ad.emoji}</span>
        <span className="smartlink-btn-text">{ad.cta}</span>
      </a>
    );
  }

  // Default: banner style
  return (
    <a
      href={SMARTLINK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="smartlink-ad smartlink-banner"
      style={{ background: ad.bg }}
    >
      <span className="smartlink-banner-emoji">{ad.emoji}</span>
      <span className="smartlink-banner-text">{ad.text}</span>
      <span className="smartlink-banner-cta">{ad.cta}</span>
    </a>
  );
}
