"use client";

import Divider from "@/components/separator-with-text-1";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

interface Signup2Props {
  heading?: string;
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
  className?: string;
}

const Signup = ({
  heading = "Signup",
  buttonText = "Create Account",
  signupText = "Already have an account?",
  signupUrl = "/sign-in",
  className,
}: Signup2Props) => {
  const pathname = usePathname();
  const [userType, setUserType] = useState("customer");
  return (
    <section className={cn("h-screen bg-muted", className)}>
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start bg-background shadow-md rounded-3xl w-full max-w-lg">
          {/* Logo */}
          <div className="bg-[#0c705d] py-10 w-full rounded-t-3xl">
            <h1 className="text-4xl text-center">🌱</h1>
            <h2 className="text-3xl font-semibold text-center text-gray-200 py-5">
              Create Your Account{" "}
            </h2>
            <p className="text-center text-gray-300">
              Join 2 million+ MediCare customers
            </p>
          </div>
          {/* sign up sign in button */}

          <div className="w-11/14 mx-auto p-1 flex items-center justify-around bg-[#f8fdfb] border border-[#ddeae7] rounded-md">
            <Link
              href={"/sign-in"}
              className={`font-semibold text-[#738380] ${pathname === "/sign-in" ? "text-[#0c705d] bg-white shadow" : "hover:text-[#0c705d] hover:bg-white"} w-full py-2 text-center rounded-sm`}
            >
              Sign in
            </Link>
            <Link
              href={"/sign-up"}
              className={`font-semibold text-[#738380] ${pathname === "/sign-up" ? "text-[#0c705d] bg-white shadow" : "hover:text-[#0c705d] hover:bg-white"} w-full py-2 text-center rounded-sm`}
            >
              Create Account
            </Link>
          </div>

          {/* join holder div */}
          <div className="w-11/12 mx-auto px-8 rounded-md">
            <h1 className="py-2 text-[#52421b] text-sm font-semibold">
              I want to join as
            </h1>
            <div className="flex items-center justify-around gap-4 ">
              <div
                onClick={() => setUserType("customer")}
                className={`group text-center rounded-md mx-2 py-4 text-2xl hover:border-2 hover:border-[#0c715e] w-1/4 border-2 transition-colors duration-300 hover:bg-[#f0faf8] ${userType === "customer" ? "border-[#0c715e] bg-[#f0faf8] text-[#0c715e]" : "border-gray-300"}`}
              >
                <p>🛒</p>
                <p className="text-sm  font-semibold group-hover:text-[#0c715e]">
                  Customer
                </p>
              </div>
              <div
              
              onClick={() => setUserType("seller")}
                className={`group text-center rounded-md mx-2 py-4 text-2xl hover:border-2 hover:border-[#0c715e] w-1/4 border-2 transition-colors duration-300 hover:bg-[#f0faf8] ${userType === "seller" ? "border-[#0c715e] bg-[#f0faf8] text-[#0c715e]" : "border-gray-300"}`}
              >
                <p>📦</p>
                <p className="text-sm  font-semibold group-hover:text-[#0c715e]">
                  Seller
                </p>
              </div>
              <div
                onClick={() => setUserType("admin")}
                className={`group text-center rounded-md mx-2 py-4 text-2xl hover:border-2 hover:border-[#0c715e] w-1/4 border-2 transition-colors duration-300 hover:bg-[#f0faf8] ${userType === "admin" ? "border-[#0c715e] bg-[#f0faf8] text-[#0c715e]" : "border-gray-300"}`}
              >
                <p>👮</p>
                <p className="text-sm  font-semibold group-hover:text-[#0c715e]">
                  Admin
                </p>
              </div>
            </div>
          </div>
          {/* sign up form */}
          <div className="flex w-full max-w-sm min-w-sm flex-col items-center gap-y-4 rounded-md px-0 py-3">
            <div className="flex w-full flex-col gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Email"
                className="text-sm"
                required
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Password"
                className="text-sm"
                required
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                placeholder="Password"
                className="text-sm"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {buttonText}
            </Button>
          </div>

          <Divider />

          <div className="w-11/15 mx-auto">
            <button className="flex items-center gap-2 border border-[#0c705d] text-[#0c705d] hover:bg-[#0c705d] hover:text-white transition-colors duration-300 rounded-md px-4 py-2 w-full justify-center text-lg font-bold hover:text-lg hover:font-bold">
              {" "}
              <FaGoogle /> Google{""}
            </button>
          </div>

          <div className="flex justify-center items-center gap-1 text-sm text-muted-foreground pb-5">
            <p>{signupText}</p>
            <Link
              href={signupUrl}
              className="font-bold font-[sans-serif] text-[#0c705d]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Signup };
