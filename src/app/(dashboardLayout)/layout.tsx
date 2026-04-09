import { Sidebar1 } from "@/components/layouts/sidebar";
import { Roles } from "@/constants/Roles";
import { userService } from "@/service/user.service";
import { user } from "../utlis/user.info";

export default async function RootLayout({
  customerSlot,
  sellerSlot,
  adminSlot,
}: Readonly<{
  customerSlot: React.ReactNode;
  sellerSlot: React.ReactNode;
  adminSlot: React.ReactNode;
}>) {
  const { data } = await userService.getSession();
  const userInfo = {
    role: data?.user?.role,
  };

  return (
    <div suppressHydrationWarning={true}>
      <div className="min-h-full flex flex-col">
        <Sidebar1 userInfo={userInfo}>
          {userInfo.role === Roles.CUSTOMER && customerSlot}
          {userInfo.role === Roles.SELLER && sellerSlot}
          {userInfo.role === Roles.ADMIN && adminSlot}
        </Sidebar1>
      </div>
    </div>
  );
}
