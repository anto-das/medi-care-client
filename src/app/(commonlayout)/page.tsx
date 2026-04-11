// import { Navbar5 } from "@/components/navbar5";

import Homepage from "@/components/modules/homepage/homepage";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { medicineService } from "@/service/medicine.service";
import { userService } from "@/service/user.service";

export default async function Home() {
  // const getUser = await userService.getSession(); // Call the getSession function to retrieve user session data
  // console.log("User Session:", getUser.data?.session); // Log the session data to the console
  // const { data } = await userService.getSession();
  // console.log("User Session:", data.user.role); // Log the session data to the console
  // const { data } = await medicineService.getMedicines();
  // console.log("Medicines:", data.data);

  return (
    <main>
      <Homepage />
    </main>
  );
}
