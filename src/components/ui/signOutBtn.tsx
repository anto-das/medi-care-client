import { Button } from "./button";
import { handleSignOut } from "@/app/utilis/handleSignOUt";
import { LogOut } from "lucide-react";

const SignOut = () => {
  return (
    <Button
      onClick={handleSignOut}
      variant="destructive"
      className=" h-11 rounded-xl font-bold bg-rose-50 border border-rose-100 text-rose-600 gap-2 shadow-none"
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </Button>
  );
};

export default SignOut;
