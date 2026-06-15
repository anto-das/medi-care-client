"use client";

import React, { useState } from "react";
import { FolderPlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { addCategory, getCategories } from "@/app/actions/category.action";
import MedicineCategoriesGrid from "@/components/ui/categoryType";
import { Textarea } from "@/components/ui/textarea";

// Define what a Field looks like

export default function CreateCategory() {
  const [category_name, setCategoryName] = useState("");
  const [category_description, setCategoryDescription] = useState("");
  const [category, setCategories] = useState<any[]>([]);

  const fetchCategoryType = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching medicines in page component:", error);
    }
  };

  // Handle Form Submission
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await addCategory({
        category_type: category_name.toUpperCase(),
        category_description,
      });

      if (data.category_id) {
        toast.success(
          `${data.category_type} category type added successfully.`,
        );
        await fetchCategoryType();
      }
    } catch (error) {
      toast.error("internal server error.");
      return {
        data: null,
        error: { message: "internal server error", details: error },
      };
    }
  };

  return (
    <div className=" bg-slate-50 p-4 space-y-6">
      <Card className="w-full mx-auto max-w-2xl bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#0B6E5C] flex items-center gap-2">
            <FolderPlus className="w-5 h-5  text-[#0B6E5C] " />
            Create New Category
          </CardTitle>
          <CardDescription>
            Name your category and add custom fields for your data.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSave}>
          <CardContent className="space-y-6">
            {/* Category Name Input */}
            <div className="space-y-2">
              <Label
                htmlFor="category-name"
                className="text-[#0B6E5C] text-sm font-semibold"
              >
                Category Name
              </Label>
              <Input
                id="category-name"
                placeholder="e.g., Antacids, Painkiller"
                value={category_name}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="category-description"
                className="text-[#0B6E5C] text-sm font-semibold"
              >
                Category Detail
              </Label>
              <Textarea
                id="category-description"
                placeholder="Bacterial infections"
                value={category_description}
                onChange={(e) => setCategoryDescription(e.target.value)}
                required
              />
            </div>
          </CardContent>

          {/* Form Actions */}
          <CardFooter className="flex justify-end gap-3 border-t pt-4 mt-4">
            <Button type="button" variant="ghost">
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0B6E5C] ">
              Save Category
            </Button>
          </CardFooter>
        </form>
      </Card>
      <MedicineCategoriesGrid
        fetchCategoryType={fetchCategoryType}
        category={category}
      />
    </div>
  );
}
