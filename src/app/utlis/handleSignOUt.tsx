import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const handleSignOut = async () => {
  const toastId = toast.loading("Signing out...");
  try {
    const { data, error } = await authClient.signOut();
    if (error) {
      return toast.error("Failed to sign out. Please try again.", {
        id: toastId,
      });
    }
    toast.success("Signed out successfully!", { id: toastId });
    //  setUser(null);
  } catch (error) {
    return toast.error("Failed to sign out. Please try again.", {
      id: toastId,
    });
  }
};
