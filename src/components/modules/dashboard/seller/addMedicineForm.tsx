"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera } from "lucide-react";
import z from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { env } from "@/env";
import { imgBB } from "@/app/utilis/handlePostImgBB";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

export default function AddMedicineForm() {
  const medicineFormSchema = z.object({
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

    unit_type: z.string(""),

    // সংখ্যা ইনপুট স্ট্রিং হিসেবে আসলে সেটিকে নাম্বারে রূপান্তর করে ভ্যালিডেট করবে
    stock_quantity: z
      .string()
      .min(1, "Stock quantity is required.")
      .refine((val) => !isNaN(Number(val)), "Must be a valid number.")
      .transform((val) => Number(val))
      .pipe(z.number().int().positive("Stock must be a positive integer.")),

    category: z.string(""),

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

  const dosageForms = [
    { label: "Tablet", value: "TABLET" },
    { label: "Capsule", value: "CAPSULE" },
    { label: "Syrup", value: "SYRUP" },
    { label: "Injection", value: "INJECTION" },
    { label: "Suspension", value: "SUSPENSION" },
    { label: "Ointment", value: "OINTMENT" },
    { label: "Cream", value: "CREAM" },
    { label: "Gel", value: "GEL" },
    { label: "Drop (Eye/Ear/Nasal)", value: "DROP" },
    { label: "Inhaler", value: "INHALER" },
    { label: "Powder", value: "POWDER" },
    { label: "Suppository", value: "SUPPOSITORY" },
  ];

  const categories = [
    { label: "ANTIBIOTICS", value: "ANTIBIOTICS" },
    { label: "PAIN RELIEF (ANALGESICS)", value: "PAIN_KILLER" },
    { label: "ANTIPYRETICS (FEVER)", value: "ANTIPYRETICS" },
    { label: "ANTISEPTICS", value: "ANTISEPTICS" },
    { label: "CARDIOVASCULAR (HEART)", value: "CARDIOVASCULAR" },
    { label: "GASTROINTESTINAL", value: "GASTROINTESTINAL" },
    { label: "RESPIRATORY", value: "RESPIRATORY" },
    { label: "DERMATOLOGICAL (SKIN)", value: "DERMATOLOGICAL" },
    { label: "DIABETIC CARE", value: "DIABETIC" },
    { label: "VITAMINS & SUPPLEMENTS", value: "SUPPLEMENTS" },
    { label: "HERBAL", value: "HERBAL" },
  ];
  const form = useForm({
    defaultValues: {
      medicine_name: "",
      generic_name: "",
      strength: "",
      unit_type: "TABLET", // Backend sample typical value
      stock_quantity: "",
      category: "ANTIBIOTICS",
      manufacturer: "",
      description: "",
      photo: [] as File[],
    },
    // validators: {
    //   onSubmit: medicineFormSchema,
    // },
    onSubmit: async ({ value }) => {
      // Do something with form data
      const { photo, ...data } = value;
      photo.every((file) => console.log(file.size));
      let medi_url = "";
      if (photo && photo.length > 0) {
        const targetFile = value.photo[0];
        const url = await imgBB(targetFile);
        medi_url = url as string;
      }

      console.log({ ...data, medi_url });
    },
  });
  return (
    <div className="max-w-full mx-auto p-6 bg-[#faf8f4] min-h-screen font-sans">
      {/* Back Button */}
      <Link href={"/seller-dashboard/medicine"}>
        <Button className="mb-4 gap-2 text-gray-900 border border-gray-300 hover:border-black bg-transparent">
          <ChevronLeft size={18} /> <span className="">Back</span>
        </Button>
      </Link>

      <Card className="shadow-sm rounded-xl bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Add New Medicine
          </CardTitle>
          <p className="text-[14px] text-gray-500">
            List a product on MediCare
          </p>
        </CardHeader>

        <CardContent className="mt-4">
          <div className="mb-8">
            <h3 className="text-[16px] font-bold text-gray-800">
              Basic Information
            </h3>
            <p className="text-[13px] text-gray-400">
              Core product identification details
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            {/* Medicine Name */}
            <form.Field
              name="medicine_name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="space-y-0">
                    <FieldLabel className="text-[14px] font-medium text-gray-700">
                      Medicine Name <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      required
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. Napa Extra 500mg Tablet"
                      className="bg-gray-50/50 border-gray-200 focus:bg-white"
                    />
                    <p className="text-[12px] text-gray-400">
                      Use the official DGDA-registered brand name
                    </p>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Generic Name */}
              <form.Field
                name="generic_name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="space-y-2">
                      <FieldLabel className="text-[14px] font-medium text-gray-700">
                        Generic Name <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Input
                        placeholder="e.g. Paracetamol"
                        required
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="bg-gray-50/50 border-gray-200"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Strength */}
              <form.Field
                name="strength"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="space-y-2">
                      <FieldLabel className="text-[14px] font-medium text-gray-700">
                        Strength <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Input
                        placeholder="e.g. 500mg"
                        value={field.state.value}
                        required
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="bg-gray-50/50 border-gray-200"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/*  (unit_type) */}
              <form.Field
                name="unit_type"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field
                      data-invalid={isInvalid}
                      className="space-y-2 w-full"
                    >
                      <FieldLabel className="text-[14px] font-medium text-gray-700">
                        unit-type <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Select
                        onValueChange={field.handleChange}
                        defaultValue={field.state.value}
                        required
                      >
                        <SelectTrigger className="bg-gray-50/50 w-full border-gray-200">
                          <SelectValue placeholder="Select form" />
                        </SelectTrigger>
                        <SelectContent>
                          {dosageForms.map((dosage, idx) => (
                            <SelectItem key={idx} value={dosage.value}>
                              {dosage.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* stock quantity */}
              <form.Field
                name="stock_quantity"
                children={(field) => (
                  <div className="space-y-2">
                    <label className="text-[14px] font-medium text-gray-700">
                      stock-quantity <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="e.g. Strip of 10"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                      className="bg-gray-50/50 border-gray-200"
                    />
                  </div>
                )}
              />

              {/* Category */}
              <form.Field
                name="category"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field
                      data-invalid={isInvalid}
                      className="space-y-2 w-full"
                    >
                      <FieldLabel className="text-[14px] font-medium text-gray-700">
                        Category <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Select
                        onValueChange={field.handleChange}
                        defaultValue={field.state.value}
                        required
                      >
                        <SelectTrigger className="bg-gray-50/50 w-full border-gray-200">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cate, idx) => (
                            <SelectItem key={idx} value={cate.value}>
                              {cate.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Manufacturer */}
              <form.Field
                name="manufacturer"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="space-y-2">
                      <FieldLabel className="text-[14px] font-medium text-gray-700">
                        Manufacturer <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Input
                        placeholder="e.g. Beximco Pharmaceuticals"
                        value={field.state.value}
                        required
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="bg-gray-50/50 border-gray-200"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </div>

            {/* Description */}
            <form.Field
              name="description"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="space-y-2">
                    <FieldLabel className="text-[14px] font-medium text-gray-700">
                      Description <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Textarea
                      placeholder="Describe indications, how it works, key benefits..."
                      value={field.state.value}
                      required
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="min-h-30 bg-gray-50/50 border-gray-200 resize-none"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <div className="w-full max-w-4xl mx-auto p-4">
              {/* Header Section */}
              <div className="mb-4">
                <h3 className="text-[20px] font-bold text-[#1A1C1E]">
                  Product Images <span className="text-red-500">*</span>
                </h3>
                <p className="text-[14px] text-gray-500 mt-1">
                  Upload clear photos
                </p>
              </div>

              {/* Upload Box */}
              <div className="relative border-2 border-dashed border-gray-200 rounded-[12px] bg-[#F9FAFB] p-12 transition-colors hover:bg-gray-50 hover:border-gray-300 cursor-pointer">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  {/* Camera Icon Container */}
                  <div className="relative">
                    <Camera className="h-6 w-6 text-gray-400" />
                    <div className="absolute -top-1 -right-1 h-2 w-2 bg-yellow-400 rounded-full border border-white"></div>
                  </div>

                  {/* Text Instructions */}
                  <div className="space-y-1">
                    <p className="text-[16px] text-gray-600">
                      <span className="font-bold text-gray-900 underline">
                        Click to upload
                      </span>{" "}
                      or drag & drop
                    </p>
                    <p className="text-[12px] text-gray-400 font-medium">
                      PNG, JPG · Max 5MB · Up to 5 images
                    </p>
                  </div>
                </div>

                {/* Hidden Input for Future Use */}
                <form.Field
                  name="photo"
                  children={(field) => (
                    <input
                      type="file"
                      id={field.name}
                      name={field.name}
                      multiple
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const files = e.target.files;
                        if (files) {
                          const arrayOfFiles = Object.values(files);
                          field.handleChange(arrayOfFiles);
                        }
                      }}
                    />
                  )}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="bg-[#1A1C1E] text-white hover:bg-black px-10 py-6 rounded-md"
                  >
                    {isSubmitting ? "Saving..." : "Save Medicine"}
                  </Button>
                )}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
