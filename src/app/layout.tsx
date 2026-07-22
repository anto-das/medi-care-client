import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import Loading from "@/components/ui/loading";
import { Suspense } from "react";
import { GuestTracker } from "@/components/modules/middleware/GuestTracker";
import { CartProvider } from "@/hooks/MedicineContext";
import AOSInit from "@/hooks/AOSInit";

export const metadata: Metadata = {
  title: "MediCare",
  description:
    "Your one-stop shop for all your medical needs. Find a wide range of products, from prescription medications to health and wellness essentials, all in one convenient place.",
  icons: {
    icon: "/medicine.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Tailwind-এ ব্যবহারের জন্য CSS variable
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <GuestTracker>
        <CartProvider>
          <body className={`min-h-full flex flex-col `}>
            <Suspense fallback={<Loading />}>
              <AOSInit />
              {children}{" "}
              <Toaster duration={1000} richColors position="top-right" />{" "}
            </Suspense>
          </body>
        </CartProvider>
      </GuestTracker>
    </html>
  );
}
