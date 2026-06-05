import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function EmptyHealthBlog() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header & Search Bar */}
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Medical Insights & Health Blog
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Search our library of articles written by qualified healthcare
            professionals.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search topics..."
              className="pl-9 bg-white"
            />
          </div>
        </div>

        {/* Empty State Core Component */}
        <Card className="border-dashed border-2 bg-white flex flex-col items-center justify-center text-center p-12 md:p-20">
          <div className="h-16 w-16 rounded-full bg-teal-50 flex items-center justify-center mb-6">
            <FileText className="h-8 w-8 text-teal-600" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            No Articles Published Yet
          </h2>
          <p className="text-slate-500 max-w-sm mb-6 text-sm">
            We are currently drafting expert medical insights, health tips, and
            clinic updates. Check back soon.
          </p>
          <Link
            href="/customer-dashboard"
            className="inline-flex items-center gap-2"
          >
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              Return to Dashboard
            </Button>
          </Link>
        </Card>

        {/* Skeleton Placeholders for Future Content Layout */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Preview Layout
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-40 pointer-events-none select-none">
            {[1, 2].map((i) => (
              <Card key={i} className="bg-white">
                <div className="h-32 bg-slate-200 animate-pulse" />
                <CardHeader className="space-y-2 p-4">
                  <Badge variant="secondary" className="w-fit">
                    Topic
                  </Badge>
                  <div className="h-5 bg-slate-200 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded w-full animate-pulse" />
                </CardHeader>
                <CardContent className="flex justify-between items-center p-4 pt-0 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-slate-200" />
                    <div className="h-3 bg-slate-200 rounded w-16" />
                  </div>
                  <div className="h-3 bg-slate-200 rounded w-12" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
