"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Zap, MapPin, Truck, ShieldCheck, Loader2 } from "lucide-react";
import OrderSummary from "@/components/ui/orderSummary";
import PaymentMethod from "@/components/ui/paymentMethod";
import { authClient } from "@/lib/auth-client";
import { CartItem } from "@/types";
import { getCart } from "@/app/actions/cart.action";
import { useCart } from "@/hooks/MedicineContext";
import Loading from "../../loading";

// Framer Motion Variants for Premium Animations
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as any,
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const CheckoutPage = () => {
  const { data: session } = authClient.useSession();
  const user_id = session?.user.id;
  const { guest_id } = useCart();
  const [carts, setCartsItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const user = session?.user;

  // Fetch Cart Items
  useEffect(() => {
    const fetchCart = async () => {
      if (!guest_id && !user_id) {
        setLoading(false);
        return;
      }
      try {
        const payload = { user_id: user_id, guest_id: guest_id as string };
        const res = await getCart(payload);
        setCartsItems(res || []);
      } catch (error) {
        console.error("Cart fetch error:", error);
      } finally {
        setLoading(false);
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

  const orderedItems = carts.map((item: any) => ({
    medicine_id: item.medicine_id,
    quantity: item.quantity,
    price: Number(item.price),
  }));

  // Premium Loading Screen
  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-[#FDFDFB] px-4 py-8 md:py-16 font-sans text-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] bg-emerald-50 px-3 py-1 rounded-full">
            Secure Checkout
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-3 text-slate-900">
            Review & Order
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Side: Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. Delivery Address */}
            <motion.div variants={cardVariants}>
              <Card className="border border-slate-100 shadow-sm rounded-3xl overflow-hidden bg-white hover:shadow-md transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4 pb-6 border-b border-slate-50 bg-slate-50/50">
                  <div className="bg-[#064E3B] text-white rounded-2xl w-10 h-10 flex items-center justify-center font-bold shadow-sm shadow-emerald-900/20 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold tracking-tight text-slate-800">
                      Delivery Address
                    </CardTitle>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Where should we send your medical essentials?
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500">
                        Full Name
                      </label>
                      <Input
                        defaultValue={user?.name}
                        placeholder="John Doe"
                        className="h-12 bg-[#F8F8F5] border-transparent focus-visible:ring-1 focus-visible:ring-emerald-600 rounded-xl transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500">
                        Email Address
                      </label>
                      <Input
                        defaultValue={user?.email}
                        placeholder="john@example.com"
                        className="h-12 bg-[#F8F8F5] border-transparent focus-visible:ring-1 focus-visible:ring-emerald-600 rounded-xl transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">
                      Street Address
                    </label>
                    <Textarea
                      defaultValue="House 12, Road 4, Mirpur-1, Dhaka"
                      className="min-h-[100px] bg-[#F8F8F5] border-transparent focus-visible:ring-1 focus-visible:ring-emerald-600 rounded-xl resize-none p-4 transition-all"
                    />
                  </div>
                  <Button className="bg-[#064E3B] hover:bg-[#043d2e] shadow-md shadow-emerald-900/10 active:scale-[0.98] transition-all font-semibold rounded-xl h-12 px-8">
                    Save & Continue
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* 2. Delivery Method */}
            <motion.div variants={cardVariants}>
              <Card className="border border-slate-100 shadow-sm rounded-3xl overflow-hidden bg-white hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="shipping" className="border-none">
                      <AccordionTrigger className="px-6 py-6 hover:no-underline flex justify-between items-center group data-[state=open]:bg-slate-50/50">
                        <div className="flex items-center gap-4 text-left">
                          <div className="bg-[#064E3B] text-white rounded-2xl w-10 h-10 flex items-center justify-center font-bold shadow-sm shadow-emerald-900/20 shrink-0">
                            <Truck className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold tracking-tight text-slate-800">
                              Delivery Method
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5 normal-case font-normal">
                              Select your preferred delivery speed
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pt-2">
                        <div className="flex items-center justify-between p-5 border border-emerald-100 rounded-2xl bg-emerald-50/20 relative overflow-hidden group/item cursor-pointer hover:border-emerald-300 transition-all duration-300">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                              <Zap className="w-5 h-5 fill-current" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-base">
                                Express Courier (2 Hours)
                              </p>
                              <p className="text-xs text-slate-400 mt-0.5">
                                Available in Dhaka, Chittagong, Sylhet
                              </p>
                            </div>
                          </div>
                          <span className="text-xl font-black text-[#064E3B]">
                            ৳80
                          </span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>

            {/* 3. Payment Method */}
            <motion.div variants={cardVariants}>
              <PaymentMethod
                subtotal={total}
                orderedItems={orderedItems}
                carts={carts}
              />
            </motion.div>

            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400 pt-2">
              Your personal and medical information is completely encrypted.
            </div>
          </div>
          <OrderSummary
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            discount={discount}
            total={total}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
