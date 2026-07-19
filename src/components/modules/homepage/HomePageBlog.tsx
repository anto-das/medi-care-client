import blogService from "@/service/blog.service";
import EmptyBlog from "../blog/emptyBlog";
import MedicalCard, { Article } from "../blog/medicareBlogCard";
import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react"; // npm i lucide-react (না থাকলে সাধারণ তীর চিহ্ন দিতে পারেন)

const HomePageBlog = async () => {
  const articles = await blogService.getBlogs();

  if (!articles || articles.length === 0) {
    return <EmptyBlog />;
  }

  return (
    <div className="w-full py-12 bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* ১. প্রফেশনাল হোমপেজ টাইটেল বক্স */}
      <div className="w-11/12 max-w-7xl mx-auto mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-900 pb-6">
        <div className="space-y-2">
          {/* ছোট ট্রেন্ডিং ব্যাজ উইথ অ্যানিমেটেড লাইভ ডট */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100/60 dark:border-emerald-900/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Our Journal
          </span>

          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
            Featured Health Articles
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium max-w-xl">
            Explore fresh medical updates, health guidelines, and expert advice
            curated just for your well-being.
          </p>
        </div>

        {/* 'সব ব্লগ দেখুন' অ্যাকশন বাটন */}
        <Link
          href="/blog" // আপনার ব্লগ পেজের সঠিক রাউটটি এখানে দিন
          className="group inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors duration-200"
        >
          Explore All Articles
          <ArrowUpRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* ২. মার্কি ব্লগ ক্যারোসেল */}
      <div className="w-full overflow-hidden">
        <Marquee className="[--duration:45s] hover:[--play-state:paused] py-4">
          <MarqueeContent className="gap-6">
            {articles?.map((item: Article, idx: number) => (
              <MarqueeItem
                key={`blog-${idx}`}
                className="w-[320px] md:w-90 shrink-0"
              >
                <div className="h-full transform transition-all duration-300 hover:scale-[1.01]">
                  <MedicalCard article={item} />
                </div>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </div>
  );
};

export default HomePageBlog;
