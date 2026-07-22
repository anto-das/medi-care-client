import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/footer";
import { GuestTracker } from "@/components/modules/middleware/GuestTracker";
import { Roles } from "@/constants/Roles";
import { CartProvider } from "@/hooks/MedicineContext";
import { userService } from "@/service/user.service";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <Suspense>{children}</Suspense>
      <Footer></Footer>
    </div>
  );
}
