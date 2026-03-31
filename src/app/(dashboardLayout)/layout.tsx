import { Sidebar1 } from "@/components/layouts/sidebar";

export default function RootLayout({
  customerSlot,
}: Readonly<{
  children: React.ReactNode;
  customerSlot: React.ReactNode;
}>) {
  return (
    <div suppressHydrationWarning={true}>
      <div className="min-h-full flex flex-col">
        <Sidebar1>{customerSlot}</Sidebar1>
      </div>
    </div>
  );
}
