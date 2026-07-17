import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/footer";
import { GuestTracker } from "@/components/modules/middleware/GuestTracker";
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
      <GuestTracker>
        <Navbar />
        {children}
        <Footer></Footer>
      </GuestTracker>
    </div>
  );
}
