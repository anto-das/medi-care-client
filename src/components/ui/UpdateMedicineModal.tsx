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
import { toast } from "sonner";
import { updateMedicine } from "@/app/actions/seller.action";

const updateMedicineInfo = ({
  open,
  onOpenChange,
  medicine,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medicine: any;
}) => {
  const handleModalClose = (isOpen: boolean) => {
    onOpenChange(isOpen);
  };

  const handleUpdateMedicine = async (e: any) => {
    try {
      e.preventDefault();

      // e.currentTarget ব্যবহার করে FormData তৈরি করুন
      const formData = new FormData(e.currentTarget);
      const price = formData.get("price");
      const stock = formData.get("stock");
      const medicineId = medicine?.medicine_id;
      console.log("Form Data:", { price, stock, medicineId });

      // খালি স্ট্রিং চেক এবং নাম্বার এ কনভার্ট করা
      const payload = {
        price: price ? Number(price) : 0,
        stock_quantity: stock ? Number(stock) : 0,
      };

      const medicines = await updateMedicine(medicineId, payload);
      // console.log("Medicines update response:", medicines);
      if (medicines?.data?.success) {
        toast.success("Your medicine successfully update more");

        return onOpenChange(false);
      }

      return toast.error("something went wrong");
    } catch (err: any) {
      return { data: null, error: err };
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleModalClose}>
      <DialogContent
        className="sm:max-w-md transform-gpu"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#0b5e4e]">
            update Your serviced products
          </DialogTitle>
          <DialogDescription>Update your medicine.</DialogDescription>
        </DialogHeader>

        {/* form ট্যাগ এখানে শুরু */}
        <form
          onSubmit={handleUpdateMedicine}
          className="grid gap-5 py-4"
          id="update-medicine"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number" // number টাইপ ব্যবহার করা ভালো
                placeholder="Price"
                defaultValue={medicine?.price} // পূর্বের দাম দেখানোর জন্য
                className="focus-visible:ring-[#0b5e4e]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock update</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                placeholder="12"
                defaultValue={medicine?.stock_quantity} // পূর্বের স্টক দেখানোর জন্য
                className="focus-visible:ring-[#0b5e4e]"
              />
            </div>
          </div>

          {/* DialogFooter এখন ফর্মের ভেতরে */}
          <DialogFooter className="mt-4">
            <Button
              type="submit"
              className="w-full bg-[#0b5e4e] hover:bg-[#084a3e] text-white font-bold py-6 text-lg"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default updateMedicineInfo;
