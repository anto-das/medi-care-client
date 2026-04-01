"use client";

import {
  BarChart3,
  ClipboardList,
  HelpCircle,
  LayoutDashboard,
  Settings,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { cn } from "@/lib/utils";
import Logo from "../ui/logo";
import Link from "next/link";
import { Button } from "../ui/button";

type NavItem = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  isActive?: boolean;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

type SidebarData = {
  navGroups: NavGroup[];
  footerGroup: NavGroup;
};

const sidebarData: SidebarData = {
  navGroups: [
    {
      title: "Overview",
      items: [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "/",
          isActive: true,
        },
        { label: "Medicines", icon: ClipboardList, href: "/medicines" },
        { label: "Roadmap", icon: BarChart3, href: "/dashboard/roadmap" },
      ],
    },
  ],
  footerGroup: {
    title: "Support",
    items: [
      { label: "Help Center", icon: HelpCircle, href: "#" },
      { label: "Settings", icon: Settings, href: "#" },
    ],
  },
};

const userInfo = {
  name: "John Doe",
  role: "seller",
};

const SidebarLogo = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <Logo></Logo>
        </SidebarMenuButton>
        <div className="flex justify-start gap-5 items-center py-4 border-t border-b my-6 bg-[#f7faf9]">
          <Button
            variant={"outline"}
            className={`${userInfo.role === "customer" ? "bg-[#0b6e5c] text-white hover:bg-[#0b6e5c] border-none hover:text-white" : ""}`}
          >
            Customer
          </Button>
          <Button
            variant={"outline"}
            className={`${userInfo.role === "seller" ? "bg-[#0b6e5c] text-white hover:bg-[#0b6e5c] border-none hover:text-white" : ""}`}
          >
            Seller
          </Button>
          <Button
            variant={"outline"}
            className={`${userInfo.role === "admin" ? "bg-[#0b6e5c] text-white hover:bg-[#0b6e5c] border-none hover:text-white" : ""}`}
          >
            Admin
          </Button>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.href}>{item.label}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>{sidebarData.footerGroup.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.footerGroup.items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>{item.label}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

interface Sidebar1Props {
  className?: string;
}

const Sidebar1 = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <h1>Dashboard name</h1>
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
