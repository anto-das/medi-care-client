import * as React from "react";
import { Calendar, User, ArrowRight } from "lucide-react";

interface ArticleSource {
  id: string | null;
  name: string;
}

export interface Article {
  source: {
    id?:string,
    name?:string
  };
  author?: string | null;
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string;
  publishedAt?: string;
  content?: string;
}

export interface MedicalCardProps {
  article: Article;
}

const MedicalCard = ({ article }: { article: Article }) => {
  // Format Date Helper
  const formatDate = (dateString?: string) => {
    try {
      return new Date(dateString || new Date()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <article className="group flex flex-col justify-between w-full max-w-sm bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* 1. Card Image & Source Badge */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-gray-800 font-semibold px-2.5 py-1 rounded-md text-xs border border-gray-100 shadow-sm">
          {article.source.name}
        </div>
      </div>

      {/* 2. Card Content Body */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Metadata Row */}
          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#0b5e4e]" />
            {formatDate(article.publishedAt)}
          </div>

          {/* Title */}
          <h4 className="font-bold text-gray-900 group-hover:text-[#0b5e4e] transition-colors line-clamp-2 text-base leading-snug">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </h4>

          {/* Description */}
          <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
            {article.description}
          </p>
        </div>

        {/* 3. Card Footer */}
        <div className="pt-3.5 border-t border-gray-50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 truncate max-w-[140px]">
            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-3 h-3 text-gray-400" />
            </div>
            <span className="font-medium text-gray-500 truncate">
              By {article.author || "Staff Writer"}
            </span>
          </div>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-[#0b5e4e] hover:gap-2 transition-all"
          >
            Read Article <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default MedicalCard;
