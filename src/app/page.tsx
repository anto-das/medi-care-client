// import { Navbar5 } from "@/components/navbar5";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-bold text-center mt-10">
        Welcome to My Medi Store!
      </h1>
      <Button variant="default" className="mt-5">
        Shop Now
      </Button>
    </main>
  );
}
