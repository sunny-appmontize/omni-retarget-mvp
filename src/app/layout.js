import { Inter } from "next/font/google";
import "./globals.css";

// Inter is the perfect font for a clean, SaaS/Meta-like aesthetic
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OmniTarget | Retargeting Prototype",
  description: "Internal MVP for omnichannel retargeting platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
