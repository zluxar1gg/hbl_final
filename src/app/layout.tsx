import { Header } from '../components/Header'; // если не так — поправить путь

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <head> ... </head>
      <body>
        <Header language="en" onLoginClick={() => {}} />
        {/* main получает отступ равный --header-height */}
        <main className="site-main">
          {children}
        </main>
      </body>
    </html>
  );
}
