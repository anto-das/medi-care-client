"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { Loader2, KeyRound, Mail, User, Sparkles } from "lucide-react";

import Divider from "@/components/separator-with-text-1";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

interface SignupProps {
  buttonText?: string;
  signupText?: string;
  signupUrl?: string;
  className?: string;
}

const Signup = ({
  buttonText = "Create Account",
  signupText = "Already have an account?",
  signupUrl = "/sign-in",
  className,
}: SignupProps) => {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formSchema = z.object({
    name: z.string().min(5, "Name must be at least 5 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setIsPending(true);
      const toastId = toast.loading("Creating secure profile registry...");
      try {
        const { data, error } = await authClient.signUp.email(value);
        if (error) {
          setIsPending(false);
          return toast.error(error.message, { id: toastId });
        }
        toast.success("Account initialized successfully!", { id: toastId });
        if (data?.user) {
          router.push("/sign-in");
        }
      } catch (error) {
        setIsPending(false);
        toast.error("Something went wrong. Please check configurations.", {
          id: toastId,
        });
      }
    },
  });

  const handleSignUpWithGoogle = async () => {
    setGoogleLoading(true);
    const toastId = toast.loading("Connecting safely to Google network...");
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/customer-dashboard`,
      });
    } catch (error) {
      setGoogleLoading(false);
      toast.error("Failed to redirect to Google.", { id: toastId });
    }
  };

  if (!mounted) return null;

  return (
    <section
      className={cn(
        "min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/20 to-slate-100 p-4 font-sans select-none relative overflow-hidden",
        className,
      )}
    >
      {/* Decorative Aurora Glow Balls */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-teal-200/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[32px] border border-white/60 shadow-[0_25px_50px_-12px_rgba(12,112,93,0.08)] overflow-hidden p-6 sm:p-8 relative z-10"
      >
        {/* Fancy Top Branding */}
        <div className="text-center space-y-2 pb-6">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 5 }}
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#0c705d] to-[#129179] text-white shadow-md shadow-emerald-900/20 mb-1 text-2xl"
          >
            🌱
          </motion.div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text">
            Join Medi<span className="text-[#0c705d]">Care</span>
          </h2>
          <p className="text-xs font-semibold text-slate-400 flex items-center justify-center gap-1">
            <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" /> 2
            million+ active global customers
          </p>
        </div>

        {/* Input Form Fields Box */}
        <div className="space-y-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <FieldGroup className="flex flex-col gap-3.5">
              {/* FULL NAME INPUT */}
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field
                      data-invalid={isInvalid}
                      className="flex flex-col gap-1.5 group"
                    >
                      <FieldLabel
                        htmlFor="signup-name"
                        className="text-xs font-bold text-slate-700 tracking-wide transition-colors group-focus-within:text-[#0c705d]"
                      >
                        Full Name
                      </FieldLabel>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none transition-colors group-focus-within:text-[#0c705d]" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Doe"
                          value={field.state.value}
                          className="pl-10 h-11 text-xs rounded-xl border-slate-200/80 bg-white/50 focus-visible:ring-2 focus-visible:ring-[#0c705d]/20 focus-visible:border-[#0c705d] transition-all placeholder:text-slate-400"
                          onChange={(e) => field.handleChange(e.target.value)}
                          required
                        />
                      </div>
                      <AnimatePresence>
                        {isInvalid && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <FieldError
                              className="text-[11px] font-bold text-rose-500 mt-1 flex items-center gap-1"
                              errors={field.state.meta.errors}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Field>
                  );
                }}
              />

              {/* EMAIL ADDRESS INPUT */}
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field
                      data-invalid={isInvalid}
                      className="flex flex-col gap-1.5 group"
                    >
                      <FieldLabel
                        htmlFor="signup-email"
                        className="text-xs font-bold text-slate-700 tracking-wide transition-colors group-focus-within:text-[#0c705d]"
                      >
                        Email Address
                      </FieldLabel>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none transition-colors group-focus-within:text-[#0c705d]" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="name@example.com"
                          value={field.state.value}
                          className="pl-10 h-11 text-xs rounded-xl border-slate-200/80 bg-white/50 focus-visible:ring-2 focus-visible:ring-[#0c705d]/20 focus-visible:border-[#0c705d] transition-all placeholder:text-slate-400"
                          onChange={(e) => field.handleChange(e.target.value)}
                          required
                        />
                      </div>
                      <AnimatePresence>
                        {isInvalid && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <FieldError
                              className="text-[11px] font-bold text-rose-500 mt-1 flex items-center gap-1"
                              errors={field.state.meta.errors}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Field>
                  );
                }}
              />

              {/* PASSWORD INPUT */}
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field
                      data-invalid={isInvalid}
                      className="flex flex-col gap-1.5 group"
                    >
                      <FieldLabel
                        htmlFor="signup-password"
                        className="text-xs font-bold text-slate-700 tracking-wide transition-colors group-focus-within:text-[#0c705d]"
                      >
                        Security Password
                      </FieldLabel>
                      <div className="relative">
                        <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none transition-colors group-focus-within:text-[#0c705d]" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={field.state.value}
                          className="pl-10 h-11 text-xs rounded-xl border-slate-200/80 bg-white/50 focus-visible:ring-2 focus-visible:ring-[#0c705d]/20 focus-visible:border-[#0c705d] transition-all placeholder:text-slate-400"
                          onChange={(e) => field.handleChange(e.target.value)}
                          required
                        />
                      </div>
                      <AnimatePresence>
                        {isInvalid && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <FieldError
                              className="text-[11px] font-bold text-rose-500 mt-1 flex items-center gap-1"
                              errors={field.state.meta.errors}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Field>
                  );
                }}
              />
            </FieldGroup>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#0c705d] text-white text-sm font-semibold tracking-wide transition hover:bg-[#0f9b7a] focus-visible:ring-2 focus-visible:ring-[#0c705d]/30"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finalizing Profile...
                </>
              ) : (
                buttonText
              )}
            </Button>
          </form>

          <div className="text-xs uppercase tracking-[0.24em] text-slate-400 text-center">
            Or continue with
          </div>

          <Button
            type="button"
            className="w-full h-11 rounded-xl border border-slate-200 bg-white/90 text-slate-700 hover:bg-slate-50"
            onClick={handleSignUpWithGoogle}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redirecting...
              </>
            ) : (
              <>
                <FaGoogle className="mr-2 h-4 w-4" />
                Continue with Google
              </>
            )}
          </Button>

          <p className="text-center text-sm text-slate-500">
            {signupText}{" "}
            <Link
              href={signupUrl}
              className="font-semibold text-[#0c705d] hover:text-[#0f9b7a]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export { Signup };
