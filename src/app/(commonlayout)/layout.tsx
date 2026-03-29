import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/footer";

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
