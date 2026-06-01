import DashboardLayout from "@/components/layouts/dashboardLayout";

import Loading from "@/components/ui/loading";

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
      <Suspense fallback={<Loading />}>
        <DashboardLayout
          customerSlot={customerSlot}
          sellerSlot={sellerSlot}
          adminSlot={adminSlot}
        />
      </Suspense>
    </div>
  );
}
