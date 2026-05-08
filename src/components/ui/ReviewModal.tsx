"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { orderService } from "@/service/order.service";
import { getFirstOrder } from "@/app/actions/order.action";

const ReviewModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { data } = authClient.useSession();
  const user = data?.user;
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleReview = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const location = e.target.location.value;
    const comment = e.target.comment.value;
    const order = await getFirstOrder(user?.email as string);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#0b5e4e]">
            Submit Your Review
          </DialogTitle>
          <DialogDescription>Share your experience with us.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleReview} className="grid gap-5 py-4" id="review">
          {/* Star Rating Section */}
          <div className="flex flex-col gap-2 items-center justify-center py-2 bg-gray-50 rounded-lg">
            <Label className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
              Rate Your Experience
            </Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform active:scale-90 focus:outline-none"
                >
                  <Star
                    size={32}
                    className={`${
                      star <= (hover || rating)
                        ? "fill-[#0b5e4e] text-[#0b5e4e]"
                        : "text-gray-300"
                    } transition-colors duration-200`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Rahim Ahmed"
                readOnly
                defaultValue={user?.name}
                className="focus-visible:ring-[#0b5e4e]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="Dhaka, Mirpur"
                className="focus-visible:ring-[#0b5e4e]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review">Your Review</Label>
            <Textarea
              id="review"
              name="comment"
              placeholder="Tell us about the service..."
              className="min-h-25 focus-visible:ring-[#0b5e4e]"
            />
          </div>
        </form>

        <DialogFooter>
          <Button
            type="submit"
            form="review"
            className="w-full bg-[#0b5e4e] hover:bg-[#084a3e] text-white font-bold py-6 text-lg"
          >
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
