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

import { usePathname, useRouter } from "next/navigation";
import { Inter } from "next/font/google";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ChevronRight, LogOut, Sparkles } from "lucide-react";

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

  const pathname = usePathname();
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
    <Sidebar
      className="border-r border-slate-200/60 dark:border-slate-800/60 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 shadow-xl shadow-slate-200/20 dark:shadow-none"
      {...props}
    >
      {/* Header with Glass Effect */}
      <SidebarHeader className="border-b border-slate-200/50 dark:border-slate-800/50 px-4 py-4 backdrop-blur-md">
        <SidebarLogo userInfo={userInfo} />
      </SidebarHeader>

      {/* Main Content Area */}
      <SidebarContent className="px-3 py-4 space-y-6 scrollbar-none">
        <SidebarGroup key={routes.title} className="p-0">
          <SidebarGroupLabel className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase px-3 mb-3">
            <span className="h-1 w-1 rounded-full bg-[#1f6b5d]" />
            {routes.title}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {routes.items.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "group relative w-full h-10 transition-all duration-300 ease-out rounded-xl px-3.5 font-medium text-sm overflow-hidden",
                        isActive
                          ? "bg-gradient-to-r from-[#1f6b5d] to-[#175247] text-white shadow-lg shadow-[#1f6b5d]/25 font-semibold"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50",
                      )}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center justify-between w-full"
                      >
                        <div className="flex items-center gap-3 z-10">
                          <span>{item.label}</span>
                        </div>

                        {/* Subtle Active Pillar */}
                        {isActive && (
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-white/40 rounded-l-full blur-[0.5px]" />
                        )}

                        {/* Hover Arrow Indicator */}
                        <ChevronRight
                          className={cn(
                            "h-3.5 w-3.5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 z-10",
                            isActive ? "text-white/80" : "text-slate-400",
                          )}
                        />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Premium Call-to-Action Footer */}
      <SidebarFooter className="p-3 mt-auto">
         <button
            onClick={handleDashSignOut}
            className="group relative flex w-full items-center justify-center gap-2 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 ease-in-out hover:bg-red-600 hover:text-white hover:shadow-md hover:shadow-red-500/20 active:scale-[0.98] dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white mb-5"
          >
            <LogOut className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Sign Out</span>
          </button>
      </SidebarFooter>

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
