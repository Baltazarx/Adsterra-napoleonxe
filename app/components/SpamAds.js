"use client";
import { useState, useEffect, useCallback, useRef } from "react";

/* ============================================================
   SpamAds – Full annoying ad system ala streaming bajakan
   - Popup modal (with fake close & countdown)
   - Floating bottom banner
   - Side floating ads (left & right)
   - Fullscreen interstitial overlay
   - Corner notification ad
   ============================================================ */

// ── Fake ad content data ──
const POPUP_ADS = [
  {
    bg: "linear-gradient(135deg, #ff6b35, #f72585)",
    emoji: "🎰",
    title: "JACKPOT MENANTI!",
    subtitle: "Daftar sekarang & dapatkan bonus 500%",
    cta: "CLAIM BONUS →",
    small: "18+ | Syarat & Ketentuan Berlaku",
  },
  {
    bg: "linear-gradient(135deg, #00b4d8, #0077b6)",
    emoji: "🛡️",
    title: "VPN PREMIUM GRATIS!",
    subtitle: "Lindungi privasi kamu. Download sekarang!",
    cta: "DOWNLOAD GRATIS →",
    small: "Tersedia untuk Windows, Mac, Android & iOS",
  },
  {
    bg: "linear-gradient(135deg, #f72585, #7209b7)",
    emoji: "💋",
    title: "TEMUKAN JODOHMU!",
    subtitle: "1.247 orang di sekitarmu sedang online sekarang...",
    cta: "CHAT SEKARANG →",
    small: "Gratis daftar, gratis chat!",
  },
  {
    bg: "linear-gradient(135deg, #ffd60a, #e85d04)",
    emoji: "🏆",
    title: "SELAMAT! Kamu Terpilih!",
    subtitle: "Klaim hadiah iPhone 16 Pro Max sekarang juga!",
    cta: "KLAIM HADIAH →",
    small: "Penawaran terbatas, berlaku hari ini!",
  },
  {
    bg: "linear-gradient(135deg, #06d6a0, #118ab2)",
    emoji: "💰",
    title: "PENGHASILAN DARI RUMAH!",
    subtitle: "Raih Rp 50.000.000/bulan tanpa modal!",
    cta: "MULAI SEKARANG →",
    small: "Sudah terbukti oleh 500.000+ member!",
  },
];

const BANNER_ADS = [
  {
    bg: "linear-gradient(90deg, #e63946, #f72585)",
    text: "🔥 SLOT GACOR! Menang hingga 100 JUTA! Main sekarang! 🔥",
  },
  {
    bg: "linear-gradient(90deg, #2ec4b6, #0077b6)",
    text: "🛡️ Browsing tanpa iklan? Download AdBlock VPN GRATIS! 🛡️",
  },
  {
    bg: "linear-gradient(90deg, #ff6b35, #ffd60a)",
    text: "⚡ KAMU PENGUNJUNG KE-1.000.000! Klik untuk hadiah spesial! ⚡",
  },
  {
    bg: "linear-gradient(90deg, #7209b7, #f72585)",
    text: "💘 Ada 23 wanita di daerahmu ingin berkenalan! Klik di sini! 💘",
  },
];

const SIDE_ADS = [
  { emoji: "🎮", text: "MAIN\nGRATIS!", sub: "Klik →", bg: "linear-gradient(180deg, #f72585, #b5179e)" },
  { emoji: "💊", text: "DIET\n10KG!", sub: "7 Hari!", bg: "linear-gradient(180deg, #06d6a0, #118ab2)" },
  { emoji: "📱", text: "IPHONE\nGRATIS!", sub: "Klaim!", bg: "linear-gradient(180deg, #ffd60a, #e85d04)" },
  { emoji: "🎰", text: "JACKPOT\nHARI INI!", sub: "Daftar!", bg: "linear-gradient(180deg, #e63946, #d00000)" },
];

const CORNER_ADS = [
  { emoji: "⚠️", title: "Virus Terdeteksi!", desc: "Klik untuk scan komputer anda!", bg: "#1a1a2e", border: "#e63946" },
  { emoji: "🔔", title: "1 Pesan Baru!", desc: "Seseorang mengirim pesan untuk anda", bg: "#1a1a2e", border: "#00b4d8" },
  { emoji: "🎁", title: "Hadiah Menunggu!", desc: "Kamu mendapat voucher Rp 500.000!", bg: "#1a1a2e", border: "#ffd60a" },
];

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Popup Ad Component ──
function PopupAd({ ad, onClose }) {
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);
  const [showFakeClose, setShowFakeClose] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          setCanClose(true);
          clearInterval(timer);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFakeClose = () => {
    // Fake close just shows another popup lol
    setShowFakeClose(false);
  };

  return (
    <div className="spam-overlay" onClick={(e) => e.target === e.currentTarget && canClose && onClose()}>
      <div className="spam-popup" style={{ background: ad.bg }}>
        {/* Fake X button that doesn't work initially */}
        {showFakeClose && (
          <button className="spam-popup-fake-close" onClick={handleFakeClose} title="Close">
            ✕
          </button>
        )}
        {/* Real close (appears after countdown) */}
        {canClose && (
          <button className="spam-popup-close" onClick={onClose} title="Close">
            ✕
          </button>
        )}
        {!canClose && (
          <div className="spam-popup-countdown">
            Tutup dalam {countdown}s
          </div>
        )}
        <div className="spam-popup-body">
          <div className="spam-popup-emoji">{ad.emoji}</div>
          <h2 className="spam-popup-title">{ad.title}</h2>
          <p className="spam-popup-subtitle">{ad.subtitle}</p>
          <button className="spam-popup-cta" onClick={onClose}>{ad.cta}</button>
          <p className="spam-popup-small">{ad.small}</p>
        </div>
      </div>
    </div>
  );
}

// ── Interstitial Fullscreen Ad ──
function InterstitialAd({ onClose }) {
  const [countdown, setCountdown] = useState(7);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          setCanSkip(true);
          clearInterval(timer);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="spam-interstitial">
      <div className="spam-interstitial-content">
        <div className="spam-interstitial-badge">IKLAN</div>
        {canSkip ? (
          <button className="spam-interstitial-skip" onClick={onClose}>
            Lewati Iklan ▶
          </button>
        ) : (
          <div className="spam-interstitial-timer">
            Iklan dapat dilewati dalam {countdown} detik...
          </div>
        )}
        <div className="spam-interstitial-body">
          <div style={{ fontSize: 80, marginBottom: 16 }}>🎰</div>
          <h1>SLOTS ONLINE #1 INDONESIA</h1>
          <p>Deposit Rp 25.000 → Bonus Rp 1.000.000</p>
          <div className="spam-interstitial-features">
            <span>✅ Withdraw Cepat</span>
            <span>✅ Bonus Harian</span>
            <span>✅ 24/7 Support</span>
          </div>
          <button className="spam-interstitial-cta" onClick={onClose}>
            DAFTAR & MAIN SEKARANG!
          </button>
          <div className="spam-interstitial-urgency">
            <span className="spam-blink">🔴 LIVE</span>
            &nbsp;— 2.847 orang sedang bermain sekarang
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Floating Bottom Banner ──
function FloatingBanner({ ad, onClose }) {
  return (
    <div className="spam-bottom-banner" style={{ background: ad.bg }}>
      <span className="spam-bottom-text">{ad.text}</span>
      <button className="spam-bottom-cta">KLIK DI SINI</button>
      <button className="spam-bottom-close" onClick={onClose}>✕</button>
    </div>
  );
}

// ── Side Floating Ad ──
function SideAd({ ad, side, onClose }) {
  return (
    <div className={`spam-side-ad spam-side-${side}`} style={{ background: ad.bg }}>
      <button className="spam-side-close" onClick={onClose}>✕</button>
      <div className="spam-side-emoji">{ad.emoji}</div>
      <div className="spam-side-text">{ad.text}</div>
      <div className="spam-side-sub">{ad.sub}</div>
    </div>
  );
}

// ── Corner Notification Ad ──
function CornerAd({ ad, onClose }) {
  return (
    <div className="spam-corner-ad" style={{ background: ad.bg, borderColor: ad.border }}>
      <button className="spam-corner-close" onClick={onClose}>✕</button>
      <div className="spam-corner-content">
        <span className="spam-corner-emoji">{ad.emoji}</span>
        <div>
          <div className="spam-corner-title">{ad.title}</div>
          <div className="spam-corner-desc">{ad.desc}</div>
        </div>
      </div>
      <button className="spam-corner-cta">Lihat Sekarang</button>
    </div>
  );
}

// ── Inline Banner Ad (flashy in-content banner) ──
export function InlineBannerAd() {
  const banners = [
    {
      bg: "linear-gradient(90deg, #e63946, #f72585, #e63946)",
      text: "🎰 MAIN SLOT SEKARANG — BONUS 100% DEPOSIT PERTAMA! 🎰",
    },
    {
      bg: "linear-gradient(90deg, #ffd60a, #ff6b35, #ffd60a)",
      text: "⚡ DOWNLOAD GAME GRATIS — 10 JUTA PLAYER SUDAH BERGABUNG! ⚡",
    },
    {
      bg: "linear-gradient(90deg, #7209b7, #f72585, #7209b7)",
      text: "💋 SINGLE? TEMUKAN JODOHMU DI SINI — 100% GRATIS! 💋",
    },
  ];
  // Use state + effect to pick random banner only on client to avoid hydration mismatch
  const [bannerIndex, setBannerIndex] = useState(0);
  useEffect(() => {
    setBannerIndex(Math.floor(Math.random() * banners.length));
  }, []);
  const banner = banners[bannerIndex];

  return (
    <div className="spam-inline-banner" style={{ background: banner.bg, backgroundSize: "200% 100%" }}>
      <span>{banner.text}</span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// ── MAIN ADS MANAGER ──
// ══════════════════════════════════════════════════════════
export default function SpamAdsManager() {
  // State for each ad type
  const [popup, setPopup] = useState(null);
  const [interstitial, setInterstitial] = useState(false);
  const [bottomBanner, setBottomBanner] = useState(null);
  const [sideLeft, setSideLeft] = useState(null);
  const [sideRight, setSideRight] = useState(null);
  const [cornerAd, setCornerAd] = useState(null);

  // Track if already showed interstitial
  const shownInterstitial = useRef(false);
  const popupCount = useRef(0);
  const popupTimerRef = useRef(null);
  const cornerTimerRef = useRef(null);

  // Show popup ad
  const showPopup = useCallback(() => {
    if (popupCount.current >= 10) return; // cap at 10 popups per session
    popupCount.current++;
    setPopup(randomPick(POPUP_ADS));
  }, []);

  // Show corner notification
  const showCorner = useCallback(() => {
    setCornerAd(randomPick(CORNER_ADS));
  }, []);

  useEffect(() => {
    // 1) Show bottom banner immediately
    setBottomBanner(randomPick(BANNER_ADS));

    // 2) Show side ads after 2s
    const sideTimer = setTimeout(() => {
      setSideLeft(randomPick(SIDE_ADS));
      setSideRight(randomPick(SIDE_ADS));
    }, 2000);

    // 3) First popup after 5s
    const firstPopupTimer = setTimeout(() => {
      showPopup();
    }, 5000);

    // 4) Recurring popups every 45s
    popupTimerRef.current = setInterval(() => {
      showPopup();
    }, 45000);

    // 5) Corner notification after 8s, then every 30s
    const firstCornerTimer = setTimeout(() => {
      showCorner();
    }, 8000);
    cornerTimerRef.current = setInterval(() => {
      showCorner();
    }, 30000);

    // 6) Interstitial on first click anywhere (only once)
    const handleClick = () => {
      if (!shownInterstitial.current) {
        shownInterstitial.current = true;
        setInterstitial(true);
      }
    };
    // Delay adding click listener so it doesn't fire on initial load
    const clickTimer = setTimeout(() => {
      document.addEventListener("click", handleClick, { once: true });
    }, 3000);

    return () => {
      clearTimeout(sideTimer);
      clearTimeout(firstPopupTimer);
      clearTimeout(firstCornerTimer);
      clearTimeout(clickTimer);
      clearInterval(popupTimerRef.current);
      clearInterval(cornerTimerRef.current);
      document.removeEventListener("click", handleClick);
    };
  }, [showPopup, showCorner]);

  return (
    <>
      {/* Popup Ad */}
      {popup && (
        <PopupAd
          ad={popup}
          onClose={() => setPopup(null)}
        />
      )}

      {/* Interstitial Fullscreen */}
      {interstitial && (
        <InterstitialAd onClose={() => setInterstitial(false)} />
      )}

      {/* Floating Bottom Banner */}
      {bottomBanner && (
        <FloatingBanner
          ad={bottomBanner}
          onClose={() => {
            setBottomBanner(null);
            // Re-appear after 15s with different ad
            setTimeout(() => setBottomBanner(randomPick(BANNER_ADS)), 15000);
          }}
        />
      )}

      {/* Side Ads */}
      {sideLeft && (
        <SideAd
          ad={sideLeft}
          side="left"
          onClose={() => {
            setSideLeft(null);
            setTimeout(() => setSideLeft(randomPick(SIDE_ADS)), 20000);
          }}
        />
      )}
      {sideRight && (
        <SideAd
          ad={sideRight}
          side="right"
          onClose={() => {
            setSideRight(null);
            setTimeout(() => setSideRight(randomPick(SIDE_ADS)), 20000);
          }}
        />
      )}

      {/* Corner Notification */}
      {cornerAd && (
        <CornerAd
          ad={cornerAd}
          onClose={() => setCornerAd(null)}
        />
      )}
    </>
  );
}
