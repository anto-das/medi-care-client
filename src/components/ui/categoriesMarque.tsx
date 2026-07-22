import React from "react";

import { Marquee, MarqueeContent, MarqueeItem } from "../kibo-ui/marquee";
import { categoryService } from "@/service/category.service";
import Link from "next/link";
import { Activity } from "lucide-react";

type category = {
  category_id: string;
  category_description: string;
  category_type: string;
};

const CategoriesMarque = async () => {
  const { data } = await categoryService.getCategory();
  return (
    <div>
      {/* Marquee Track */}
      <Marquee className="[--duration:30s] hover:[--play-state:paused]">
        <MarqueeContent className="gap-4">
          {data?.map((category: category) => (
            <Link href={"/medicine"} key={category.category_id}>
              <MarqueeItem>
                <div className="flex items-center gap-4 bg-white border border-slate-100 rounded-2xl p-4 w-[280px] md:w-[320px] shadow-sm shadow-slate-100/40 hover:shadow-md hover:border-emerald-100/80 transition-all duration-300 cursor-pointer group select-none">
                  {/* Left Dynamic Medical Icon Card Container */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100/60 group-hover:bg-emerald-50 group-hover:border-emerald-100/60 transition-colors duration-300 shrink-0">
                    <Activity className="h-5 w-5 text-emerald-600" />
                  </div>

                  {/* Right Content Meta Blocks */}
                  <div className="flex flex-col space-y-0.5 overflow-hidden text-left">
                    <h3 className="text-sm md:text-base font-bold text-slate-800 tracking-tight group-hover:text-emerald-600 transition-colors truncate">
                      {category.category_type}
                    </h3>
                    <p className="text-xs font-medium text-slate-400 line-clamp-1 truncate pr-2">
                      {category.category_description ||
                        "Explore dynamic healthcare essentials"}
                    </p>
                  </div>
                </div>
              </MarqueeItem>
            </Link>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  );
};

export default CategoriesMarque;
