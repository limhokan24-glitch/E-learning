import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import Footer from '@/components/Home/Footer/Footer';
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";

const font = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Histiory e-learning",
  description: "E-learning website using Next.js",
};
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <body
        className={font.className}
      >
        <ResponsiveNav />
        {children}
        <Footer />
      </body>
    </>
  );
}
