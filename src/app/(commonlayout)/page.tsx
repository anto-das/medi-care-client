// import { Navbar5 } from "@/components/navbar5";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default async function Home() {
  const getUser = await authClient.getSession();
  console.log("User Session:", getUser);

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
