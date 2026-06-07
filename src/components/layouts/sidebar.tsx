"use client";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import "../../app/globals.css";
import Logo from "../ui/logo";
import Link from "next/link";
import { Button } from "../ui/button";
import { customerRoutes } from "@/routes/customerRoutes";
import { sellerRoutes } from "@/routes/sellerRoutes";
import { adminRoutes } from "@/routes/adminRoutes";
import { Roles } from "@/constants/Roles";
import { Routes } from "@/types";
import { Input } from "../ui/input";
import { usePathname, useRouter } from "next/navigation";
import { Inter } from "next/font/google";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Tailwind-এ ব্যবহারের জন্য CSS variable
  display: "swap",
});

const SidebarLogo = ({ userInfo }: { userInfo: any }) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <Logo></Logo>
        </SidebarMenuButton>
        <div className="flex justify-start gap-5 items-center py-4 border-t border-b my-6 bg-[#f7faf9]">
          <Button
            variant={"outline"}
            className={`${userInfo.role === Roles.CUSTOMER ? "bg-[#0b6e5c] text-white hover:bg-[#0b6e5c] border-none hover:text-white" : ""}`}
          >
            Customer
          </Button>
          <Button
            variant={"outline"}
            className={`${userInfo.role === Roles.SELLER ? "bg-[#0b6e5c] text-white hover:bg-[#0b6e5c] border-none hover:text-white" : ""}`}
          >
            Seller
          </Button>
          <Button
            variant={"outline"}
            className={`${userInfo.role === Roles.ADMIN ? "bg-[#0b6e5c] text-white hover:bg-[#0b6e5c] border-none hover:text-white" : ""}`}
          >
            Admin
          </Button>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const AppSidebar = ({
  userInfo,
  ...props
}: { userInfo: any } & React.ComponentProps<typeof Sidebar>) => {
  let routes: Routes = { title: "", items: [] };
  const role = userInfo.role;
  switch (role) {
    case Roles.CUSTOMER:
      routes = customerRoutes;
      break;
    case Roles.SELLER:
      routes = sellerRoutes;
      break;
    case Roles.ADMIN:
      routes = adminRoutes;
      break;
    default:
      break;
  }
  const baseClasses =
    "inline-flex h-10 w-full justify-start rounded-md px-4 py-2 text-lg font-bold transition-colors duration-300 mx-1 text-md font-bold";
  const inactiveClasses =
    "text-[#7a8d8d] hover:text-[#1f6b5d] hover:bg-[#e6f4f1]";
  const pathname = usePathname();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarLogo userInfo={userInfo} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup key={routes.title}>
          <SidebarGroupLabel className="font-bold tracking-widest uppercase">
            {routes.title}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      className={`${baseClasses} ${inter.variable} ${pathname === item.href ? "px-4 py-2 text-md text-[#1f6b5d] bg-[#e6f4f1]" : inactiveClasses}`}
                    >
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

const Sidebar1 = ({
  children,
  userInfo,
}: {
  children: React.ReactNode;
  userInfo: any;
}) => {
  const handleDashSignOut = async () => {
    const toastId = toast.loading("Signing out...");
    try {
      const result = await authClient.signOut();
      if (result?.data?.success) {
        toast.success("Signed out successfully!", { id: toastId });
        window.location.href = "/"; // Redirect to home page
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to sign out. Please try again.", { id: toastId });
    }
  };
  return (
    <SidebarProvider>
      <AppSidebar userInfo={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div className="flex items-center justify-between w-full mx-1">
            <h1 className="text-xl capitalize text-[#04061f]">
              {userInfo.role === Roles.CUSTOMER
                ? "browse medicines"
                : userInfo.role === Roles.SELLER
                  ? "Seller Dashboard"
                  : userInfo.role === Roles.ADMIN
                    ? "Admin Dashboard"
                    : "Dashboard"}
            </h1>
            <div className="w-1/2 flex items-center justify-end gap-4">
              <button
                onClick={handleDashSignOut}
                className="rounded-md capitalize bg-[#e22929] px-4 py-2 text-sm max-w-full font-bold text-[#e2fff0] font-[Sans-serif]"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-[100vh] flex-1 rounded-xl  md:min-h-min">
            {/* Content goes here */}
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export { Sidebar1 };
