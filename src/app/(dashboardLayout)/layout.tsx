import DashboardLayout from "@/components/layouts/dashboardLayout";
import { Sidebar1 } from "@/components/layouts/sidebar";
import { Roles } from "@/constants/Roles";
import { userService } from "@/service/user.service";
import { Suspense } from "react";

export default function RootLayout({
  customerSlot,
  sellerSlot,
  adminSlot,
}: Readonly<{
  customerSlot: React.ReactNode;
  sellerSlot: React.ReactNode;
  adminSlot: React.ReactNode;
}>) {
  return (
    <div suppressHydrationWarning={true}>
      <Suspense fallback={<div>Loading....</div>}>
        <DashboardLayout
          customerSlot={customerSlot}
          sellerSlot={sellerSlot}
          adminSlot={adminSlot}
        />
      </Suspense>
    </div>
  );
}
