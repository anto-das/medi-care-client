"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle2,
  Zap,
  ShieldCheck,
  ChevronRight,
  CreditCard,
  Wallet,
  Banknote,
} from "lucide-react";
import Image from "next/image";
import OrderSummary from "@/components/ui/orderSummary";

const CheckoutPage = () => {
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
                    defaultValue="Rahim Ahmed"
                    className="h-12 bg-[#F8F8F5] border-none"
                  />
                  <Input
                    defaultValue="+880 1711-000000"
                    className="h-12 bg-[#F8F8F5] border-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select defaultValue="dhaka">
                    <SelectTrigger className="h-12 bg-[#F8F8F5] border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dhaka">Dhaka</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="dhaka">
                    <SelectTrigger className="h-12 bg-[#F8F8F5] border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dhaka">Dhaka</SelectItem>
                    </SelectContent>
                  </Select>
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

            {/* 2. Prescription Upload */}
            <div className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-sm border border-emerald-50">
              <div className="flex items-center space-x-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                <div>
                  <h3 className="font-bold text-slate-800">
                    Prescription Upload
                  </h3>
                  <p className="text-xs text-slate-400 italic">
                    Required for 1 item
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <Card className="border-none shadow-sm rounded-2xl bg-white">
              <CardContent className="flex flex-row items-center space-x-4 pb-4">
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="shipping"
                  className="max-w-full"
                >
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
                          ৳80
                        </span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* 4. Payment Method - Accordion Style */}
            <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
              <CardHeader className="flex flex-row items-center space-x-4 pb-0">
                <div className="bg-[#064E3B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  4
                </div>
                <CardTitle className="text-xl font-bold">
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <Accordion type="single" collapsible className="space-y-3">
                  <AccordionItem
                    value="bkash"
                    className="border rounded-xl px-4 overflow-hidden bg-[#F8F8F5]"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center font-bold text-pink-600 text-[10px]">
                          bkash
                        </div>
                        <span className="font-bold">bKash</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-slate-500 text-sm">
                      You will be redirected to bKash payment gateway to
                      complete the transaction securely.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="nagad"
                    className="border rounded-xl px-4 overflow-hidden bg-[#F8F8F5]"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center font-bold text-orange-600 text-[10px]">
                          Nagad
                        </div>
                        <span className="font-bold">Nagad</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-slate-500 text-sm">
                      Pay securely using your Nagad account.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="card"
                    className="border rounded-xl px-4 overflow-hidden bg-[#F8F8F5]"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-6 h-6 text-slate-400" />
                        <span className="font-bold">Card / Net Banking</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <p className="text-slate-500 text-sm mb-3">
                        Visa, Mastercard, DBBL Nexus etc.
                      </p>
                      <Input
                        placeholder="Card Number"
                        className="h-10 bg-white"
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="cod"
                    className="border rounded-xl px-4 overflow-hidden bg-[#F8F8F5]"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center space-x-3">
                        <Banknote className="w-6 h-6 text-emerald-500" />
                        <span className="font-bold">Cash on Delivery</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-slate-500 text-sm">
                      Pay with cash when your medicine arrives at your doorstep.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Sticky Order Summary */}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
