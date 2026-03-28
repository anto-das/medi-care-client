import { Sidebar1 } from "@/components/layouts/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Sidebar1 />
        {children}
      </body>
    </html>
  );
}
