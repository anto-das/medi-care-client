import { Sidebar1 } from "@/components/layouts/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div suppressHydrationWarning={true}>
      <div className="min-h-full flex flex-col">
          <Sidebar1>{children}</Sidebar1>
      </div>
    </div>
  );
}
