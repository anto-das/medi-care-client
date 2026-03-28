import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
