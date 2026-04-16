import { userService } from "@/service/user.service";
import React from "react";
import { Sidebar1 } from "./sidebar";
import { Roles } from "@/constants/Roles";

const DashboardLayout = async ({
  customerSlot,
  sellerSlot,
  adminSlot,
}: Readonly<{
  customerSlot: React.ReactNode;
  sellerSlot: React.ReactNode;
  adminSlot: React.ReactNode;
}>) => {
  const { data } = await userService.getSession();
  const userInfo = {
    role: data?.user?.role,
  };

  return (
    <div className="min-h-full flex flex-col">
      <Sidebar1 userInfo={userInfo}>
        {userInfo.role === Roles.CUSTOMER && customerSlot}
        {userInfo.role === Roles.SELLER && sellerSlot}
        {userInfo.role === Roles.ADMIN && adminSlot}
      </Sidebar1>
    </div>
  );
};

export default DashboardLayout;
