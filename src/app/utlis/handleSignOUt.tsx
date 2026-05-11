import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const handleSignOut = async () => {
  const toastId = toast.loading("Signing out...");
  try {
    const { data, error } = await authClient.signOut();
    toast.success("Signed out successfully!", { id: toastId });
  } catch (error) {
    return toast.error("Failed to sign out. Please try again.", {
      id: toastId,
    });
  }
};
