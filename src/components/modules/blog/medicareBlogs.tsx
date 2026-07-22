import MedicalCard, {
  Article,
} from "@/components/modules/blog/medicareBlogCard";
import EmptyBlog from "./emptyBlog";
import blogService from "@/service/blog.service";

export default async function MedicareBlogs() {
  const articles = await blogService.getBlogs();

  // যদি কোনো ব্লগ না থাকে
  if (!articles || articles.length === 0) {
    return <EmptyBlog />;
  }

  return (
    <div
      data-aos="fade-up"
      className="w-full min-h-screen bg-slate-50/50 dark:bg-slate-950/20 py-12 md:py-20 transition-colors duration-300"
    >
      {/* ১. প্রফেশনাল হেডার/হিরো সেকশন */}
      <div className="w-11/12 max-w-7xl mx-auto mb-12 md:mb-16 text-center md:text-start flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-slate-100 dark:border-slate-900 pb-8">
        <div className="space-y-2">
          {/* ছোট ট্রেন্ডিং বা ক্যাটাগরি ব্যাজ */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100/60 dark:border-emerald-900/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Medicare Health Insights
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
            Latest Medical Articles & Blogs
          </h1>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-2xl font-medium">
            Stay updated with expert health advice, medical breakthroughs, and
            wellness tips curated by our professional healthcare team.
          </p>
        </div>

        {/* আর্টিকেলের সংখ্যা কাউন্টার */}
        <div className="text-xs md:text-sm font-semibold text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm shadow-slate-100/20 dark:shadow-none w-fit mx-auto md:mx-0">
          Showing{" "}
          <span className="text-emerald-500 font-bold">{articles.length}</span>{" "}
          published articles
        </div>
      </div>

      {/* ২. প্রিমিয়াম ইউজার ফ্রেন্ডলি গ্রিড লেআউট */}
      <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-6 items-stretch">
        {articles.map((item: Article, idx: number) => (
          <div
            // ইউনিক আইডি ব্যবহার করা ভালো, না থাকলে item.id বা ব্যাকআপ হিসেবে index দিন
            key={idx}
            className="flex h-full transform transition-all duration-300 hover:-translate-y-1.5"
          >
            <MedicalCard article={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
