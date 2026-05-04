import type { Metadata } from "next";
import BootstrapClient from "@/ui/BootstrapClient";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Health Appointmet System",
  description: "Health Appointmet System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body>
        <BootstrapClient />
        {children}
      </body>
    </html>
  );
}
