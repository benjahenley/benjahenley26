import "./globals.css";
import "photoswipe/style.css";
import { Provider as JotaiProvider } from "jotai";
import { Source_Sans_3 } from "@next/font/google";
import { ThemeProvider } from "../../presentation/components/providers/Theme";
import { Locales } from "@/infraestructure/interfaces";
import { AudioProvider } from "@/presentation/components/providers/Audio";
import Script from "next/script";
import { locales } from "@/middleware";
import { Metadata } from "next";
import ModalContainer from "@/presentation/components/modals/view";

const sourceSansPro = Source_Sans_3({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio 2024",
  description: "Benja Henley",
};

export async function generateStaticParams() {
  const langs = locales.map((locale) => ({ locale }));

  return langs;
}

export default function RootLayout({
  params: { locale },
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locales };
}>) {
  return (
    <html lang={locale ? locale : "es"}>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body
        className={`${sourceSansPro.className} dark:bg-slate-800 h-full min-h-screen z`}>
        <JotaiProvider>
          <ThemeProvider>
            <AudioProvider>
              <Script
                src="https://unpkg.com/wavesurfer.js"
                strategy="lazyOnload"
              />
              <ModalContainer locale={locale ? locale : "es"}></ModalContainer>
              <div className="h-full min-h-screen relative">{children}</div>
            </AudioProvider>
          </ThemeProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
