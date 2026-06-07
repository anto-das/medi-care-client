import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/router";
import { toast } from "sonner";

export const handleSignOut = async () => {
  const toastId = toast.loading("Signing out...");
  try {
    const { data, error } = await authClient.signOut();
    toast.success("Signed out successfully!", { id: toastId });
    if (data?.success) {
      window.location.href = "/"; // Redirect to home page
    } else {
      toast.error("Failed to sign out. Please try again.", { id: toastId });
    }
  } catch (error) {
    // console.log(error);
    return toast.error("Failed to sign out. Please try again.", {
      id: toastId,
    });
  }
};
