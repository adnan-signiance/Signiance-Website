import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Signiance — Ship the first working agent in weeks",
  description:
    "We help growing businesses move from cloud infrastructure to production AI without the overhead of a full in house team.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Geist:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          fontFamily: "Geist, ui-sans-serif, Helvetica, Arial, sans-serif",
          background: "#FFFFFF",
          color: "#131417",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
