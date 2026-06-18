"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { loadStripe } from "@stripe/stripe-js/pure";
import { useRouter } from "next/navigation";

import { CartItem, OrderItem } from "@/types";

import { handlePayment } from "@/app/actions/payment.action";

const PaymentModal = ({
  open,
  onOpenChange,
  subtotal,
  carts,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subtotal: number;
  carts: CartItem[];
}) => {
  const { data } = authClient.useSession();
  const router = useRouter();
  const user = data?.user;

  const handleModalClose = (isOpen: boolean) => {
    onOpenChange(isOpen);
  };

  const handleStripePayment = async (e: any) => {
    try {
      e.preventDefault();
      const res = await handlePayment(carts);
      if (res.url) {
        window.location.href = res.url;
      } else {
        alert("Could not create payment link. Please try again.");
      }
      onOpenChange(open);
    } catch (err: any) {
      router.push("/");
      // return { data: null, error: err };
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleModalClose}>
      {/* sm:max-w-[425px] ব্যবহার করা হয়েছে পারফেক্ট সাইজের জন্য */}
      <DialogContent className="sm:max-w-[425px] rounded-2xl p-6">
        {/* হেডার সেকশন */}
        <DialogHeader className="text-center sm:text-left">
          <DialogTitle className="text-xl font-bold text-[#0b5e4e] flex items-center gap-2">
            💳 Medi Care Payment
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Complete your secure payment via Stripe.
          </DialogDescription>
        </DialogHeader>
        {/* এমাউন্ট ডিসপ্লে সেকশন (টাকা দেখানোর জন্য প্রিমিয়াম বক্স) */}
        <div className="my-2 p-4 bg-[#f0f7f5] border border-[#d1e7e2] rounded-xl flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
              Total Payable
            </p>
            <p className="text-sm text-gray-600 mt-0.5">
              Medical Services & Care
            </p>
          </div>
          <div className="text-2xl font-black text-[#0b5e4e] tracking-tight">
            ${subtotal}
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-3 sm:flex-col mt-2">
          <Button
            onClick={handleStripePayment}
            className="w-full bg-[#0b5e4e] hover:bg-[#084a3e] text-white font-bold py-6 text-base shadow-md transition duration-300 rounded-xl"
          >
            Pay ${subtotal} Now
          </Button>

          {/* স্ট্রাইপ সিকিউরড ব্যাজ এবং টেক্সট */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 tracking-wide font-medium mt-1">
            🔒{" "}
            <span>
              Secured by <strong>stripe</strong>
            </span>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
