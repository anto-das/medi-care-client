"use client"; // Error components must be Client Components

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCcw, Home, PhoneCall } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Icon Header */}
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-red-50 rounded-full">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          System Interruption
        </h1>
        <p className="text-slate-600 mb-8">
          We apologize for the inconvenience. Our medical systems encountered an
          unexpected error while processing your request.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md active:scale-95"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-lg transition-all"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>

        {/* Support Footer */}
        <div className="mt-10 pt-8 border-t border-slate-100">
          <p className="text-sm text-slate-500 mb-4">
            If this issue persists, please contact our support team.
          </p>
          <a
            href="tel:+1234567890"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
          >
            <PhoneCall className="w-4 h-4" />
            Contact Emergency Help Desk
          </a>
        </div>

        {/* Error Digest (Optional/Debug) */}
        {error.digest && (
          <p className="mt-4 text-[10px] text-slate-400 uppercase tracking-widest">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
