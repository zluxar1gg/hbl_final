import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HappyBox - Доставка из Китая | Посредник Taobao, 1688, FBA сервисы",
  description: "Надежный посредник доставки из Китая и Гонконга. Бесплатное хранение, консолидация, фото-отчеты и DDP доставка. Помогаем покупать на Taobao, 1688, Poizon с доставкой в США, Великобританию, ЕС, ОАЭ и Россию.",
  keywords: "посредник китай, доставка из китая, карго из китая, выкуп таобао, выкуп 1688, посредник таобао, консолидация грузов, доставка в россию, доставка в сша, amazon fba подготовка",
  authors: [{ name: "HappyBox Logistics" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://happyboxlogistics.com/ru",
    title: "HappyBox - Быстрая и надежная доставка из Китая",
    description: "Профессиональный посредник и экспедитор. Бесплатное хранение, консолидация и выкуп с 1688/Taobao. Доставка в США, ЕС, ОАЭ, РФ.",
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
    title: "HappyBox - Посредник доставки из Китая",
    description: "Профессиональный посредник и экспедитор. Бесплатное хранение, консолидация и выкуп с 1688/Taobao.",
    images: ["https://i.ibb.co/cS2GvWht/happyboxtop.webp"]
  },
  alternates: {
    canonical: "https://happyboxlogistics.com/ru",
    languages: {
      'en': 'https://happyboxlogistics.com/',
      'ru': 'https://happyboxlogistics.com/ru',
    }
  }
};

export default function RuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
