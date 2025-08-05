import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../components/page";
import Head from "next/head";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

export const metadata: Metadata = {
  title: "AQARAT",
  description: "Your Real Estate Hub in the UAE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <html lang="en">
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&loading=async&libraries=places`}
        async
      />

      <body>
        <AuthProvider>{children}</AuthProvider>
        {isProduction && <GoogleAnalytics gaId="G-N4J0DSGP16" />}
      </body>
    </html>
  );
}
