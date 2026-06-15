"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Zap } from "lucide-react";

import OrderSummary from "@/components/ui/orderSummary";
import PaymentMethod from "@/components/ui/paymentMethod";
import { useEffect, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { CartItem } from "@/types";
import { getCart } from "@/app/actions/cart.action";

const CheckoutPage = () => {
  const { data: session } = authClient.useSession();
  const user_id = session?.user.id;
  const [guest_id, setGuestId] = useState<string | null>(null);
  const [carts, setCartsItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const user = session?.user;
  useEffect(() => {
    const id = localStorage.getItem("guest_id");
    setGuestId(id);
  }, []);

  // get medicine useEffect
  useEffect(() => {
    const fetchCart = async () => {
      if (!guest_id && !user_id) return;
      try {
        setLoading(true);
        const payload = { user_id: user_id, guest_id: guest_id as string };
        const res = await getCart(payload);
        setCartsItems(res || []);
        if (res) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Cart fetch error:", error);
      }
    };
    fetchCart();
  }, [guest_id, user_id]);
  // Calculations
  const subtotal = useMemo(() => {
    return (
      carts?.reduce(
        (acc, item) => acc + parseFloat(item.price) * item.quantity,
        0,
      ) || 0
    );
  }, [carts]);

  const deliveryFee = carts.length > 0 ? 60 : 0;
  const discount = carts.length > 0 ? 25 : 0;
  const total = subtotal + deliveryFee - discount;

  const orderedItems = carts.map((item) => ({
    medicine_id: item.medicine_id,
    quantity: item.quantity,
    price: Number(item.price),
  }));

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-gray-400 animate-pulse">
        Loading Cart...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFB] p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight mb-10 italic">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Side: Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Delivery Address */}
            <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
              <CardHeader className="flex flex-row items-center space-x-4 pb-6">
                <div className="bg-[#064E3B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">
                    Delivery Address
                  </CardTitle>
                  <p className="text-sm text-slate-500 italic">
                    Where should we deliver?
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    defaultValue={user?.name}
                    className="h-12 bg-[#F8F8F5] border-none"
                  />
                  <Input
                    defaultValue={user?.email}
                    className="h-12 bg-[#F8F8F5] border-none"
                  />
                </div>
                <Textarea
                  defaultValue="House 12, Road 4, Mirpur-1, Dhaka"
                  className="min-h-[80px] bg-[#F8F8F5] border-none resize-none"
                />
                <Button className="bg-[#064E3B] hover:bg-[#043d2e] rounded-full px-8">
                  Save & Continue →
                </Button>
              </CardContent>
            </Card>

            {/* 3. Delivery Method */}
            <Card className="border-none shadow-sm rounded-2xl bg-white">
              <CardContent className="flex flex-row items-center space-x-4 pb-4">
                <Accordion type="single" collapsible className="max-w-full">
                  <AccordionItem value="shipping">
                    <AccordionTrigger className="text-xl border font-bold hover:no-underline flex justify-start items-center gap-3">
                      <span className="bg-[#064E3B] text-white rounded-full w-8  flex items-center border justify-center font-bold">
                        3
                      </span>
                      Delivery Method
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center justify-between p-4 border border-emerald-100 rounded-xl bg-emerald-50/20">
                        <div className="flex items-center space-x-3">
                          <Zap className="w-5 h-5 text-orange-400 fill-current" />
                          <div>
                            <p className="font-bold text-slate-800">
                              Express (2 hours)
                            </p>
                            <p className="text-[11px] text-slate-400">
                              Dhaka, Chittagong, Sylhet
                            </p>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-slate-800">
                          $80
                        </span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* 4. Payment Method - Accordion Style */}
            <PaymentMethod
              subtotal={total}
              orderedItems={orderedItems}
            ></PaymentMethod>
          </div>

          {/* Right Side: Sticky Order Summary */}
          <OrderSummary
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            discount={discount}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
