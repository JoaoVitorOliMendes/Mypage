import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "MyPage",
  description: "João Vitor de Oliveira Mendes - Personal Page",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="overflow-x-hidden">
        {/* <CustomCursor /> */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
