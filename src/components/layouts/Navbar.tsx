"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, LogOut, UserPlus, LogIn } from "lucide-react";
import { v4 as uuid } from "uuid";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

import { Navbar1Props } from "@/types";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "../ui/logo";

import SignOut from "../ui/signOutBtn";
import { useCart } from "@/hooks/MedicineContext";

// Standardizing menu styles for professional layout unity
const navLinkClasses = (isActive: boolean) =>
  cn(
    "relative inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-semibold transition-all duration-200 select-none",
    isActive
      ? "text-emerald-700 bg-emerald-50/80 shadow-sm border border-emerald-100/50"
      : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50",
  );

const mobileNavLinkClasses = (isActive: boolean) =>
  cn(
    "flex w-full items-center rounded-xl px-4 py-3 text-sm font-bold transition-all",
    isActive
      ? "text-emerald-700 bg-emerald-50 border border-emerald-100/40"
      : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50",
  );

const Navbar = ({
  menu = [
    { title: "Home", url: "/" },
    { title: "Medicines", url: "/medicine" },
    { title: "Health Blog", url: "/blog" },
    { title: "Offers", url: "/offers" },
    { title: "Dashboard", url: "/customer-dashboard" },
  ],
  auth = {
    login: { title: "Sign in", url: "/sign-in" },
    signup: { title: "Join Free", url: "/sign-up" },
  },
  className,
}: Navbar1Props) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  const { carts } = useCart();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md transition-all",
        className,
      )}
    >
      <div className="mx-auto w-11/12 max-w-7xl h-16 flex items-center justify-between">
        {/* DESKTOP VIEW LAYOUT */}
        <div className="hidden lg:flex items-center justify-between w-full">
          {/* Left section: Logo & Nav items */}
          <div className="flex items-center gap-8">
            <Logo />
            <NavigationMenu>
              <NavigationMenuList className="gap-1.5">
                {menu.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <NavigationMenuItem key={item.title}>
                      <Link
                        href={item.url}
                        className={navLinkClasses(isActive)}
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right section: System Utilities & Profiles */}
          <div className="flex items-center gap-4">
            {/* Interactive Cart Button */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-full border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all text-slate-600 hover:text-slate-900 group"
            >
              <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-105" />
              {/* Dynamic Cart Floating Counter Badge */}
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 rounded-full bg-emerald-600 text-white font-bold text-[10px] border border-white">
                {carts?.length || 0}
              </Badge>
            </Link>

            {/* Conditional Authentication Gate elements */}
            <div className="h-5 w-px bg-slate-200 mx-1" />

            <Link
              href={auth.login.url}
              className="inline-flex h-10 items-center justify-center rounded-xl text-sm font-bold text-slate-700 hover:text-emerald-700 px-4 transition-colors"
            >
              {auth.login.title}
            </Link>

            {user?.emailVerified ? (
              <SignOut />
            ) : (
              <Button
                asChild
                className="h-10 px-5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white active:scale-[0.98] transition-all shadow-md shadow-emerald-600/10"
              >
                <Link href={auth.signup.url}>{auth.signup.title}</Link>
              </Button>
            )}
          </div>
        </div>

        {/* MOBILE VIEW LAYOUT */}
        <div className="flex lg:hidden items-center justify-between w-full">
          <Logo />

          <div className="flex items-center gap-3">
            {/* Direct Access Mobile Cart shortcut */}
            <Link
              href="/cart"
              className="relative p-2 rounded-xl border border-slate-100 text-slate-600"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-600 text-white text-[9px] font-black flex items-center justify-center">
                0
              </span>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl border-slate-200"
                >
                  <Menu className="h-5 w-5 text-slate-700" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[340px] flex flex-col justify-between p-6"
              >
                <div className="space-y-6">
                  <SheetHeader className="text-left border-b border-slate-50 pb-4">
                    <SheetTitle>
                      <Logo />
                    </SheetTitle>
                  </SheetHeader>

                  {/* Mobile Navigation Structure */}
                  <div className="flex flex-col gap-1">
                    {menu.map((item) => {
                      const isActive = pathname === item.url;
                      return (
                        <Link
                          key={item.title}
                          href={item.url}
                          className={mobileNavLinkClasses(isActive)}
                        >
                          {item.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Footer User Profiles inside Mobile Sheet */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <Link
                    href={auth.login.url}
                    className="flex h-11 items-center justify-center rounded-xl text-sm font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors w-full"
                  >
                    <LogIn className="h-4 w-4 mr-2 text-slate-500" />
                    {auth.login.title}
                  </Link>

                  {user?.emailVerified ? (
                    <SignOut />
                  ) : (
                    <Button
                      asChild
                      className="w-full h-11 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-none"
                    >
                      <Link href={auth.signup.url}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        {auth.signup.title}
                      </Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navbar };
