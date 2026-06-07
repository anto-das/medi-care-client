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

  if (data) {
    isAuthenticated = true;
    isAdmin = data?.user.role === Roles.ADMIN;
    isSeller = data?.user.role === Roles.SELLER;
    isCustomer = data?.user.role === Roles.CUSTOMER;
  }

  // ১. হোম রুট (/) এর জন্য প্রটেকশন
  if (pathname === "/") {
    if (isSeller)
      return NextResponse.redirect(new URL("/seller-dashboard", request.url));
    if (isAdmin)
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    return NextResponse.next();
  }

  // ২. লগইন চেক (হোম পেজ ছাড়া বাকি সব ম্যাচড রুটের জন্য)
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // ৩. রোল ভিত্তিক ড্যাশবোর্ড প্রটেকশন ও রিডাইরেকশন
  const isCustomerRoute = pathname.startsWith("/customer-dashboard");
  const isSellerRoute = pathname.startsWith("/seller-dashboard");
  const isAdminRoute = pathname.startsWith("/admin-dashboard");

  // অ্যাডমিন বা সেলার কাস্টমার ড্যাশবোর্ডে যেতে চাইলে তাদের নিজস্ব ড্যাশবোর্ডে পাঠান
  if (isCustomerRoute) {
    if (isAdmin)
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    if (isSeller)
      return NextResponse.redirect(new URL("/seller-dashboard", request.url));
  }

  // অ্যাডমিন ড্যাশবোর্ডে শুধু অ্যাডমিন ঢুকতে পারবে
  if (isAdminRoute && !isAdmin) {
    if (isSeller)
      return NextResponse.redirect(new URL("/seller-dashboard", request.url));
    return NextResponse.redirect(new URL("/customer-dashboard", request.url));
  }

  // সেলার ড্যাশবোর্ডে শুধু সেলার ঢুকতে পারবে
  if (isSellerRoute && !isSeller) {
    if (isAdmin)
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    return NextResponse.redirect(new URL("/customer-dashboard", request.url));
  }

  if (isCustomer && pathname.startsWith("/cart/checkout")) {
    return NextResponse.next();
  }

  // চেকআউট পেজে শুধু একটিভ কাস্টমার যেতে পারবে
  if (pathname.startsWith("/cart/checkout") && !isCustomer) {
    if (isAdmin)
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    if (isSeller)
      return NextResponse.redirect(new URL("/seller-dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/customer-dashboard/:path*",
    "/customer-dashboard",
    "/seller-dashboard/:path*",
    "/seller-dashboard",
    "/admin-dashboard/:path*",
    "/admin-dashboard",
    "/cart/checkout",
  ],
};
