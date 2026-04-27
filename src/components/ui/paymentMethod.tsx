import React from "react";
import { Card, CardHeader } from "./card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

const PaymentMethod = () => {
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
                <div className="flex items-center space-x-3 border rounded-xl px-4 bg-[#F8F8F5] h-16">
                  <div className="w-8 h-8  rounded flex items-center justify-center font-bold text-lg">
                    📱
                  </div>
                  <span className="font-bold">bKash</span>
                </div>
              </AccordionContent>
              <AccordionContent className="h-16 my-4">
                <div className="flex items-center space-x-3 border rounded-xl px-4 bg-[#F8F8F5] h-16">
                  <div className="w-8 h-8  rounded flex items-center justify-center font-bold text-lg">
                    💳
                  </div>
                  <span className="font-bold">Nagad</span>
                </div>
              </AccordionContent>
              <AccordionContent className="h-16 my-4">
                <div className="flex items-center space-x-3 border rounded-xl px-4 bg-[#F8F8F5] h-16">
                  <div className="w-8 h-8  rounded flex items-center justify-center font-bold text-lg">
                    🏦
                  </div>
                  <span className="font-bold">Card/Net Banking</span>
                </div>
              </AccordionContent>
              <AccordionContent className="h-16">
                <div className="flex items-center space-x-3 border rounded-xl px-4 bg-[#F8F8F5] h-16">
                  <div className="w-8 h-8  rounded flex items-center justify-center font-bold text-lg">
                    💵
                  </div>
                  <span className="font-bold">Cash on Delivery</span>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardHeader>
      </Card>
    </div>
  );
};

export default PaymentMethod;
