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
    isAdmin = data.user.role === Roles.ADMIN;
    isSeller = data.user.role === Roles.SELLER;
    isCustomer = data.user.role === Roles.CUSTOMER;
  }
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
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
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard",
    "/customer-dashboard/:path*",
    "/customer-dashboard",
    "/seller-dashboard/:path*",
    "/seller-dashboard",
    "/admin-dashboard/:path*",
    "/admin-dashboard",
  ],
};
