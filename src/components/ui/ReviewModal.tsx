import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export function ReviewModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How was your experience?</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Textarea placeholder="Write your review here..." />
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Submit Review</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
