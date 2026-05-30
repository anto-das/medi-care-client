import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/footer";
import { Roles } from "@/constants/Roles";
import { userService } from "@/service/user.service";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer></Footer>
    </div>
  );
}
