import { NextRequest, NextResponse } from "next/server";
import { userService } from "./service/user.service";
import { Roles } from "./constants/Roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let isAdmin = false;
  let isSeller = false;
  let isCustomer = false;
  let isAuthenticated = false;

  const { data } = await userService.getSession();
  // console.log("Session data in proxy:", data);
  if (data) {
    isAuthenticated = true;
    isAdmin = data?.user.role === Roles.ADMIN;
    isSeller = data?.user.role === Roles.SELLER;
    isCustomer =
      data?.user.role === Roles.CUSTOMER && data?.user.status === "ACTIVE";
  }

  // -------------------------------------------------------------
  // ১. হোম রুট (/) এর জন্য বিশেষ প্রটেকশন (সেলার ও অ্যাডমিন ব্লক করা)
  // -------------------------------------------------------------
  if (pathname === "/") {
    // সেলার হোম পেজে আসতে চাইলে ড্যাশবোর্ডে পাঠান
    if (isSeller) {
      return NextResponse.redirect(new URL("/seller-dashboard", request.url));
    }
    // অ্যাডমিন হোম পেজে আসতে চাইলে ড্যাশবোর্ডে পাঠান
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    // কাস্টমার বা আন-অথেন্টিকেটেড ইউজার হলে হোম পেজ দেখতে দিন
    return NextResponse.next();
  }

  // -------------------------------------------------------------
  // ২. অন্যান্য প্রটেক্টেড রুটের জন্য লগইন চেক
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // -------------------------------------------------------------
  // ৩. রোল ভিত্তিক ড্যাশবোর্ড প্রটেকশন ও রিডাইরেকশন
  // -------------------------------------------------------------
  if (isAdmin && pathname.startsWith("/customer-dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }
  if (isSeller && pathname.startsWith("/customer-dashboard")) {
    return NextResponse.redirect(new URL("/seller-dashboard", request.url));
  }
  if (
    (!isAdmin && pathname.startsWith("/admin-dashboard")) ||
    (isCustomer && pathname.startsWith("/seller-dashboard"))
  ) {
    return NextResponse.redirect(new URL("/customer-dashboard", request.url));
  }
  if (isCustomer && pathname.startsWith("/cart/checkout")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/dashboard",
    "/customer-dashboard/:path*",
    "/customer-dashboard",
    "/seller-dashboard/:path*",
    "/seller-dashboard",
    "/admin-dashboard/:path*",
    "/admin-dashboard",
    "/cart/checkout",
  ],
};
