import Homepage from "@/components/modules/homepage/homepage";
import Banner from "@/components/ui/banner";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function Home() {
  await delay(3000);
  return (
    <main>
      <Banner />
      <Homepage />
    </main>
  );
}
