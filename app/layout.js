import "./globals.css";
import AdsWrapper from "./components/AdsWrapper";

export const metadata = {
  title: "StreamFlix - Nonton Film & Series Online",
  description: "Platform streaming film dan series terbaik. Tonton ribuan konten hiburan berkualitas tinggi kapan saja, di mana saja.",
  keywords: "streaming, film, series, nonton online, movie",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {children}
        <AdsWrapper />
      </body>
    </html>
  );
}

