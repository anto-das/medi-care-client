"use client";

import { Menu } from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import mediLogo from "../assets/medicine.png";
import { StaticImageData } from "next/image";
import Logo from "../ui/logo";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: StaticImageData | string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Medicines",
      url: "/medicine",
    },
    {
      title: "Health Blog",
      url: "/blog",
    },
    {
      title: "Offers",
      url: "/offers",
    },
    {
      title: "Dashboard",
      url: "/customer-dashboard",
    },
  ],
  auth = {
    login: { title: "Sign in", url: "/sign-in" },
    signup: { title: "Join Free", url: "/sign-up" },
  },
  className,
}: Navbar1Props) => {
  const { data: session } = authClient.useSession();
  // console.log("Session Data in Navbar:", session);
  const handleSignOut = async () => {
    const toastId = toast.loading("Signing out...");
    try {
      const { data, error } = await authClient.signOut();
      if (error) {
        return toast.error("Failed to sign out. Please try again.", {
          id: toastId,
        });
      }
      toast.success("Signed out successfully!", { id: toastId });
      //  setUser(null);
    } catch (error) {
      return toast.error("Failed to sign out. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <section className={cn("py-4 z-10 sticky top-0 bg-[#f8fdfbc2]", className)}>
      <div className="w-11/12 mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Logo></Logo>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex gap-5 items-center justify-end w-1/2">
            <Input
              placeholder="🔍Search medicines,brands and more..."
              className="w-1/2 rounded-md bg-[#f8fdfb] border focus:shadow-none focus:text-lg placeholder:text-lg p-5"
            />
            <Link
              href={auth.login.url}
              className="rounded-md capitalize bg-white text-[#42534e] border border-[#ddeae7] hover:border-[#12725c] hover:text-[#12725c] px-4 py-2 text-sm font-bold font-[Sans-serif]"
            >
              {auth.login.title}
            </Link>
            {session?.user ? (
              <>
                <button
                  onClick={handleSignOut}
                  className="rounded-md capitalize bg-[#e22929] px-4 py-2 text-sm font-bold text-[#e2fff0] font-[Sans-serif]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href={auth.signup.url}
                className="rounded-md capitalize bg-[#0b5e4e] hover:bg-[#0e856d] px-4 py-2 text-sm font-bold text-[#fafcfb] font-[Sans-serif]"
              >
                {auth.signup.title}
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Logo></Logo>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Logo></Logo>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex items-center w-full gap-3">
                    <Link
                      href={auth.login.url}
                      className="rounded-md capitalize bg-white text-[#42534e] border border-[#ddeae7] hover:border-[#12725c] hover:text-[#12725c] px-4 py-1.5 text-sm font-bold w-full font-[Sans-serif] text-center"
                    >
                      {auth.login.title}
                    </Link>
                    {session?.user ? (
                      <>
                        <button
                          onClick={handleSignOut}
                          className="rounded-md capitalize bg-[#e22929] px-4 py-2 text-sm w-full font-bold text-[#e2fff0] font-[Sans-serif]"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <Link
                        href={auth.signup.url}
                        className="rounded-md capitalize bg-[#0b5e4e] hover:bg-[#0e856d] px-4 py-2 text-sm font-bold text-[#fafcfb] font-[Sans-serif] w-full"
                      >
                        {auth.signup.title}
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  const pathname = usePathname();
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
      </NavigationMenuItem>
    );
  }
  const baseClasses =
    "inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-md font-medium transition-colors duration-300 mx-1";
  const inactiveClasses =
    "text-[#7a8d8d] hover:text-[#1f6b5d] hover:bg-[#e6f4f1]";

  return (
    <NavigationMenuItem key={item.title}>
      <Link
        href={item.url}
        className={`${baseClasses} ${pathname === item.url ? "px-4 py-2 text-md font-medium text-[#1f6b5d] bg-[#e6f4f1]" : inactiveClasses}`}
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  const pathname = usePathname();
  const baseClasses =
    "inline-flex h-10 items-center justify-start rounded-md px-4 py-2 text-md font-medium transition-colors duration-300 w-full";
  const inactiveClasses =
    "text-[#7a8d8d] hover:text-[#1f6b5d] hover:bg-[#e6f4f1]";

  return (
    <NavigationMenuItem key={item.title}>
      <Link
        href={item.url}
        className={`${baseClasses} ${pathname === item.url ? "px-4 py-2 text-md font-medium text-[#1f6b5d] bg-[#e6f4f1]" : inactiveClasses}`}
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};

export { Navbar };
