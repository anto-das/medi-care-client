import z from "zod";

const UnitTypeEnum = z.enum([
  "TABLET",
  "CAPSULE",
  "SYRUP",
  "INJECTION",
  "DROPS",
]);
const CategoryEnum = z.enum([
  "ANTIBIOTICS",
  "PAINKILLERS",
  "VITAMINS",
  "DIABETES",
  "CARDIAC",
]);

export const medicineFormSchema = z.object({
  medicine_name: z
    .string()
    .min(2, "Medicine name must be at least 2 characters.")
    .trim(),

  generic_name: z
    .string()
    .min(2, "Generic name must be at least 2 characters.")
    .trim(),

  strength: z
    .string()
    .min(1, "Strength is required (e.g., 500mg, 10ml).")
    .trim(),

  unit_type: UnitTypeEnum,

  // সংখ্যা ইনপুট স্ট্রিং হিসেবে আসলে সেটিকে নাম্বারে রূপান্তর করে ভ্যালিডেট করবে
  stock_quantity: z
    .string()
    .min(1, "Stock quantity is required.")
    .refine((val) => !isNaN(Number(val)), "Must be a valid number.")
    .transform((val) => Number(val))
    .pipe(z.number().int().positive("Stock must be a positive integer.")),

  category: CategoryEnum,

  manufacturer: z.string().min(2, "Manufacturer name is required.").trim(),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters long.")
    .max(500, "Description cannot exceed 500 characters.")
    .trim(),

  // ফাইলের জন্য অ্যাডভান্সড অ্যারে ভ্যালিডেশন
  photo: z
    .array(z.instanceof(File))
    .min(1, "Please upload a medicine photo.") // ফটো বাধ্যতামূলক করতে চাইলে
    .refine(
      (files) => files.every((file) => file.size / (1024 * 1024) <= 4),
      "Each image must be less than 4MB.",
    )
    .refine(
      (files) =>
        files.every((file) =>
          ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        ),
      "Only JPG, PNG, and WEBP formats are allowed.",
    ),
});
