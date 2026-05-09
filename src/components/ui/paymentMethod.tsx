"use client";
import { Card, CardHeader } from "./card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { toast } from "sonner";

import { createOrder } from "@/app/utlis/CreateOrder";

import { useEffect, useState } from "react";
import { deleteAllCart } from "@/app/actions/cart.action";
import ReviewModal from "./ReviewModal";

const PaymentMethod = ({
  subtotal,
  orderedItems,
}: {
  subtotal: number;
  orderedItems: any;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guest_id, setGuestId] = useState<string | null>(null);
  const payload = {
    guest_id: guest_id as string,
  };
  useEffect(() => {
    const id = localStorage.getItem("guest_id");
    setGuestId(id);
  }, []);
  const handleConfirmOrder = async ({
    subtotal,
    orderedItems,
  }: {
    subtotal: number;
    orderedItems: any;
  }) => {
    const loadingId = toast.loading("confirming your order..");
    try {
      const result = await createOrder({ subtotal, orderedItems });
      // console.log("confirm ordered: ", result);
      if (result.success) {
        toast.success(result.message, { id: loadingId });
        setIsModalOpen(true);
        await deleteAllCart(payload);
        // router.push("/customer-dashboard/orders");
      } else {
        toast.error("Failed to place order", { id: loadingId });
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return (
    <div>
      <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="flex flex-row items-center space-x-4 pb-0">
          <Accordion type="single" collapsible className="max-w-full">
            <AccordionItem value="payment">
              <AccordionTrigger className="text-xl border font-bold hover:no-underline flex justify-start items-center gap-3">
                <span className="bg-[#064E3B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  4
                </span>
                Payment Method
              </AccordionTrigger>
              <AccordionContent className="h-16">
                <div
                  onClick={() => handleConfirmOrder({ subtotal, orderedItems })}
                  className="flex items-center space-x-3 border rounded-xl px-4 bg-[#F8F8F5] h-16 group hover:border-green-500 transition duration-500"
                >
                  <div className="w-8 h-8  rounded flex items-center justify-center font-bold text-lg">
                    💵
                  </div>
                  <span className="font-bold group-hover:text-green-600 transition duration-500">
                    Cash on Delivery
                  </span>
                </div>
              </AccordionContent>
              <ReviewModal open={isModalOpen} onOpenChange={setIsModalOpen} />
            </AccordionItem>
          </Accordion>
        </CardHeader>
      </Card>
    </div>
  );
};

export default PaymentMethod;

{
  /* <AccordionContent className="h-16">
                <div className="group flex items-center space-x-3 border rounded-xl px-4 bg-[#F8F8F5] h-16 hover:border-pink-500 transition duration-500">
                  <div className="w-8 h-8  rounded flex items-center justify-center font-bold text-lg">
                    📱
                  </div>
                  <span className="font-bold group-hover:text-pink-500 transition duration-500">
                    bKash
                  </span>
                </div>
              </AccordionContent>
              <AccordionContent className="h-16 my-4">
                <div className="flex items-center space-x-3 border rounded-xl px-4 bg-[#F8F8F5] h-16 group hover:border-amber-500 transition duration-500">
                  <div className="w-8 h-8  rounded flex items-center justify-center font-bold text-lg">
                    💳
                  </div>
                  <span className="font-bold group-hover:text-amber-800 transition duration-500">
                    Nagad
                  </span>
                </div>
              </AccordionContent>
              <AccordionContent className="h-16 my-4">
                <div className="flex items-center space-x-3 border rounded-xl px-4 bg-[#F8F8F5] h-16 group hover:border-blue-500 transition duration-500">
                  <div className="w-8 h-8  rounded flex items-center justify-center font-bold text-lg">
                    🏦
                  </div>
                  <span className="font-bold group-hover:text-blue-500 transition duration-500">
                    Card/Net Banking
                  </span>
                </div>
              </AccordionContent> */
}
