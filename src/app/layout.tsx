import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HappyBox - China Shipping Agent & Forwarder | Taobao, 1688, FBA Services",
  description: "Trusted shipping agent from China & Hong Kong. Free warehousing, consolidation, photo inspection, and DDP delivery. We help you buy from Taobao, 1688, Poizon and ship to USA, UK, EU, UAE, and Russia.",
  keywords: "china shipping agent, freight forwarder china, taobao agent, 1688 intermediary, amazon fba prep, consolidation service, shipping to usa, shipping to europe, ddp delivery, посредник китай, доставка из китая, выкуп 1688, выкуп таобао, карго китай, доставка в сша, консолидация грузов",
  authors: [{ name: "HappyBox Logistics" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://happyboxlogistics.com/",
    title: "HappyBox - Fast & Reliable Shipping from China",
    description: "Expert intermediary and forwarder. Free storage, consolidation, and repurchase from 1688/Taobao. Delivery to USA, EU, UAE, RU.",
    images: [
      {
        url: "https://i.ibb.co/cS2GvWht/happyboxtop.webp",
        width: 1200,
        height: 630,
        alt: "HappyBox Logistics"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "HappyBox - China Shipping Agent",
    description: "Expert intermediary and forwarder. Free storage, consolidation, and repurchase from 1688/Taobao.",
    images: ["https://i.ibb.co/cS2GvWht/happyboxtop.webp"]
  },
  alternates: {
    canonical: "https://happyboxlogistics.com/",
    languages: {
      'en': 'https://happyboxlogistics.com/',
      'ru': 'https://happyboxlogistics.com/ru',
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://i.ibb.co" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://i.ibb.co" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" 
          as="style" 
        />
        <link 
          rel="preload" 
          href="https://i.ibb.co/cS2GvWht/happyboxtop.webp" 
          as="image" 
          // @ts-ignore
          fetchpriority="high" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
        <link rel="icon" type="image/png" href="https://i.ibb.co/629m3RB/favicon.png" />
      </head>
      <body className="min-h-screen bg-cream font-sans text-brand-dark">
        {children}
      </body>
    </html>
  );
}
