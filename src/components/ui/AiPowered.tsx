"use client"; // স্টেটস ব্যবহারের জন্য এটি নিশ্চিত করুন

import { useState } from "react";
import Testimonial from "@/components/ui/testimonial";
import Prescription from "@/components/ui/prescription";

// import Medicines from "./medicines";

import WhyMedicineCare from "@/components/ui/WhyMedicineCare";
import Banner from "@/components/ui/banner";
import CategoriesMarque from "@/components/ui/categoriesMarque";
// import CustomerVoiceSection from "./feedback";
// import { ChartBarDemoLegend } from "./chart";
// import HomePageBlog from "./HomePageBlog";
import MedicareNewsletter from "@/components/ui/medicareNewsLetter";

const AiHomepage = () => {
  // AI UI এর জন্য স্টেট ম্যানেজমেন্ট
  const [isOpen, setIsOpen] = useState(false); // চ্যাট বক্স খোলা বা বন্ধ রাখার জন্য
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const handleAiAnalysis = async () => {
    if (!symptoms.trim()) {
      alert("অনুগ্রহ করে আপনার সমস্যার কথাটি লিখুন।");
      return;
    }

    setLoading(true);
    setAiResponse("Gemini আপনার লক্ষণগুলো বিশ্লেষণ করছে, একটু অপেক্ষা করুন...");

    try {
      // ব্যাকএন্ড ইন্টিগ্রেশনের সময় এখানে fetch কলটি যুক্ত করবেন
      // আপাতত ডেমো রেসপন্স দেখানোর জন্য সেট করা হলো
      setTimeout(() => {
        setAiResponse("এটি একটি ডেমো রেসপন্স। আপনার ব্যাকএন্ড API যুক্ত করার পর Gemini-র আসল উত্তর এখানে প্রদর্শিত হবে।");
        setLoading(false);
      }, 2000);
    } catch (error) {
      setAiResponse("দুঃখিত, এই মুহূর্তে এআই রেসপন্স করতে পারছে না।");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Banner />
      {/* <CategoriesMarque></CategoriesMarque> */}

      <div suppressHydrationWarning={true} className="my-10">
        <WhyMedicineCare />
      </div>

      {/* <Medicines />
      <ChartBarDemoLegend />
      {/* prescription */}
      {/* <CustomerVoiceSection></CustomerVoiceSection> */}
      {/* <HomePageBlog /> */}
      <MedicareNewsletter />

      {/* ─── FLOATING AI CHAT ASSISTANT (ডানদিকের নিচের কোণায়) ─── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        
        {/* চ্যাট বক্স উইন্ডো (যখন isOpen === true থাকবে) */}
        {isOpen && (
          <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 mb-4 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
            {/* চ্যাট হেডার */}
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-blue-500 rounded-lg">
                  <svg xmlns="http://w3.org" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Medicare AI অ্যাসিস্ট্যান্ট</h4>
                  <p className="text-xs text-blue-100">অনলাইন স্বাস্থ্য পরামর্শ</p>
                </div>
              </div>
              {/* বন্ধ করার বাটন */}
              <button onClick={() => setIsOpen(false)} className="text-blue-100 hover:text-white transition">
                <svg xmlns="http://w3.org" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 4.293z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* চ্যাট বডি এবং ইনপুট */}
            <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
              <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-lg font-medium text-center">
                ⚠️ এটি কোনো অফিসিয়াল প্রেসক্রিপশন নয়
              </p>
              
              <textarea 
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={3} 
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none placeholder-gray-400 text-sm text-gray-700"
                placeholder="আপনার শারীরিক সমস্যা বা লক্ষণগুলো এখানে লিখুন..."></textarea>
              
              <button 
                onClick={handleAiAnalysis}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-200 text-sm disabled:opacity-50">
                {loading ? "বিশ্লেষণ হচ্ছে..." : "AI পরামর্শ নিন"}
              </button>

              {/* এআই এর উত্তর দেখানোর জায়গা */}
              {aiResponse && (
                <div className="mt-2 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                  <h5 className="font-bold text-blue-800 text-xs mb-1">AI এর পরামর্শ:</h5>
                  <div className={`text-gray-700 text-xs leading-relaxed whitespace-pre-line ${loading ? "animate-pulse text-gray-400" : ""}`}>
                    {aiResponse}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* গোল কোণার মূল আইকন বাটন */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition duration-300 transform hover:scale-105 flex items-center justify-center group relative">
          
          {isOpen ? (
            // ক্রস আইকন (যখন চ্যাট খোলা থাকবে)
            <svg xmlns="http://w3.org" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // এআই বট আইকন (যখন চ্যাট বন্ধ থাকবে)
            <svg xmlns="http://w3.org" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}

          {/* বাটনের পাশে ছোট্ট ব্যাজ টেক্সট (টুলটিপ) */}
          {!isOpen && (
            <span className="absolute right-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
              Ask Medicare AI
            </span>
          )}
        </button>
      </div>
      {/* ─── FLOATING AI CHAT ASSISTANT END ─── */}

    </div>
  );
};

export default AiHomepage;
