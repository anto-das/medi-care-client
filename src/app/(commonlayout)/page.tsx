// import { Navbar5 } from "@/components/navbar5";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { userService } from "@/service/user.service";

export default async function Home() {
  // const getUser = await userService.getSession(); // Call the getSession function to retrieve user session data
  // console.log("User Session:", getUser.data?.session); // Log the session data to the console
  // const { data } = await userService.getSession();
  // console.log("User Session:", data.user.role); // Log the session data to the console
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
