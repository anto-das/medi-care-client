import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Medi Store",
  description:
    "Your one-stop shop for all your medical needs. Find a wide range of products, from prescription medications to health and wellness essentials, all in one convenient place.",
  icons: {
    icon: "/medicine.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {children}{" "}
        <Toaster duration={2000} richColors position="top-right" />{" "}
      </body>
    </html>
  );
}
