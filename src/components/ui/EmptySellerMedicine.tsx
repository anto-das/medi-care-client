import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Pill, Plus } from "lucide-react";

const EmptySellerMedicine = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 w-full">
      {/* ১. পুরো কার্ডের জন্য পপ-ইন অ্যানিমেশন */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-md w-full"
      >
        <Card className="border-dashed border-2 bg-slate-50/50 dark:bg-zinc-900/30 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center text-center p-8 pt-10">
            {/* ২. আইকনের জন্য স্মুথ ফ্লোটিং (উপর-নিচে ভাসমান) অ্যানিমেশন */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400 mb-6"
            >
              <Pill className="w-8 h-8 transform rotate-45" />
              <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-0.5 border-2 border-white dark:border-zinc-900">
                <Plus className="w-3 h-3 text-white" />
              </div>
            </motion.div>

            {/* ৩. টেক্সটের জন্য ফেড-ইন ও স্লাইড অ্যানিমেশন */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2"
            >
              No Medicines Added Yet
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-8 leading-relaxed"
            >
              Your Medicare shelf is currently empty. Start uploading your
              available pharmacy stock so patients and customers can order from
              you.
            </motion.p>

            {/* ৪. বাটনের জন্য স্লাইড-আপ এবং হোভার/ট্যাপ অ্যানিমেশন */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                className="bg-[#1f6b5d] hover:bg-[#175247] text-white shadow-sm font-medium px-6 py-5 rounded-lg transition-colors gap-2 cursor-pointer"
              >
                <Link href="/seller-dashboard/add-medicine">
                  <Plus className="w-4 h-4" />
                  <span>Add Your First Medicine</span>
                </Link>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EmptySellerMedicine;
