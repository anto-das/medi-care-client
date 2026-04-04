import { Sidebar1 } from "@/components/layouts/sidebar";
import { role } from "better-auth/client";

export default function RootLayout({
  customerSlot,
  sellerSlot,
  adminSlot,
}: Readonly<{
  customerSlot: React.ReactNode;
  sellerSlot: React.ReactNode;
  adminSlot: React.ReactNode;
}>) {
  const userInfo = {
    role: "SELLER",
  };
  return (
    <div suppressHydrationWarning={true}>
      <div className="min-h-full flex flex-col">
        <Sidebar1 userInfo={userInfo}>
          {userInfo.role === "CUSTOMER" && customerSlot} 
          {userInfo.role === "SELLER" && sellerSlot} 
          {userInfo.role === "ADMIN" && adminSlot}
        </Sidebar1>
      </div>
    </div>
  );
}
