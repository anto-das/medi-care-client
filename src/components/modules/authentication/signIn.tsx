"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { Loader2, KeyRound, Mail, ShieldAlert } from "lucide-react";

import Divider from "@/components/separator-with-text-1";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { Roles } from "@/constants/Roles";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

interface Signup2Props {
  heading?: string;
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
  className?: string;
}

const DEMO_ACCOUNTS = [
  { label: "Customer", email: "customer@medi-store.com", pass: "customer123" },
  { label: "Seller", email: "seller@medi-store.com", pass: "seller123" },
  { label: "Admin", email: "admin@medi-store.com", pass: "admin123" },
];

const SignInPage = ({
  buttonText = "Sign In",
  signupText = "Don't have an account?",
  signupUrl = "/sign-up",
  className,
}: Signup2Props) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Sync state explicitly to avoid TanStack field sync mismatches
  const [emailState, setEmailState] = useState("");
  const [passState, setPassState] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setIsPending(true);
      const toastId = toast.loading("Signing in...");
      try {
        const result = await authClient.signIn.email({
          email: value.email || emailState,
          password: value.password || passState,
        });
        const { data, error } = result;
        if (error) {
          setIsPending(false);
          return toast.error(error.message, { id: toastId });
        }

        const user: any = data?.user;
        toast.success("Signed in successfully!", { id: toastId });

        if (user?.role === Roles.SELLER) {
          window.location.href = "/seller-dashboard";
        } else if (user?.role === Roles.ADMIN) {
          window.location.href = "/admin-dashboard";
        } else {
         window.location.href = "/";
        }
      } catch (e) {
        setIsPending(false);
        toast.error("Failed to sign in. Please try again.", { id: toastId });
      }
    },
  });

  const handleDemoInject = (email: string, pass: string) => {
    setEmailState(email);
    setPassState(pass);
    form.setFieldValue("email", email);
    form.setFieldValue("password", pass);
  };

  const handleSignWithGoogle = async () => {
    setGoogleLoading(true);
    const toastId = toast.loading("Redirecting to Google...");
    try {
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/`,
      });
      if (res?.error) {
        setGoogleLoading(false);
        toast.error(res.error.message, { id: toastId });
        return;
      }
    } catch (error) {
      setGoogleLoading(false);
      toast.error("Failed to redirect to Google.", { id: toastId });
    }
  };

  if (!mounted) return null;

  return (
    <section
      className={cn(
        "min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 select-none",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6"
      >
        {/* Brand Header */}
        <div className="space-y-1.5 text-center">
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Medi<span className="text-[#0c705d] font-black">Care</span>
          </span>
          <p className="text-xs font-medium text-slate-400">
            Sign in to manage your health portal
          </p>
        </div>

        {/* Demo Fast Sandbox Login */}
        <div className="bg-slate-50 border border-slate-100/80 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <ShieldAlert className="h-3 w-3 text-amber-500" /> Quick Sandbox
            Access
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {DEMO_ACCOUNTS.map((account) => (
              <button
                key={account.label}
                type="button"
                onClick={() => handleDemoInject(account.email, account.pass)}
                className="py-1.5 text-[11px] font-bold rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-[#0c705d] hover:border-[#0c705d]/30 hover:bg-emerald-50/10 transition-all active:scale-95"
              >
                {account.label}
              </button>
            ))}
          </div>
        </div>

        {/* Standard Credentials Input Form */}
        <form
          id="medicare-minimal-signin"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <FieldGroup className="flex flex-col gap-3.5">
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field
                    data-invalid={isInvalid}
                    className="flex flex-col gap-1"
                  >
                    <FieldLabel
                      htmlFor="email"
                      className="text-xs font-bold text-slate-600"
                    >
                      Email
                    </FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={emailState}
                        className="pl-9 h-10 text-xs rounded-lg border-slate-200 focus-visible:ring-[#0c705d]"
                        onChange={(e) => {
                          setEmailState(e.target.value);
                          field.handleChange(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <AnimatePresence>
                      {isInvalid && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                        >
                          <FieldError
                            className="text-[11px] font-semibold text-rose-500 mt-0.5"
                            errors={field.state.meta.errors}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Field>
                );
              }}
            />

            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field
                    data-invalid={isInvalid}
                    className="flex flex-col gap-1"
                  >
                    <div className="flex justify-between items-center">
                      <FieldLabel
                        htmlFor="password"
                        className="text-xs font-bold text-slate-600"
                      >
                        Password
                      </FieldLabel>
                      <Link
                        href="/forgot-password"
                        className="text-[11px] font-medium text-[#0c705d] hover:underline"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={passState}
                        className="pl-9 h-10 text-xs rounded-lg border-slate-200 focus-visible:ring-[#0c705d]"
                        onChange={(e) => {
                          setPassState(e.target.value);
                          field.handleChange(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <AnimatePresence>
                      {isInvalid && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                        >
                          <FieldError
                            className="text-[11px] font-semibold text-rose-500 mt-0.5"
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
            disabled={isPending}
            className="w-full h-10 rounded-lg text-xs font-bold bg-[#0c705d] hover:bg-[#084f41] text-white transition-all shadow-none mt-2"
          >
            {isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin mr-1 inline" />
            ) : null}
            {buttonText}
          </Button>
        </form>

        <Divider />

        {/* Third Party Authorization Gateway */}
        <div className="w-full space-y-3">
          <button
            type="button"
            onClick={handleSignWithGoogle}
            disabled={googleLoading}
            className="flex items-center justify-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all rounded-lg h-10 w-full text-xs font-bold"
          >
            {googleLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <FaGoogle className="h-3.5 w-3.5" />
            )}
            Continue with Google
          </button>

          <p className="text-[11px] text-center text-slate-500">
            {signupText}{" "}
            <Link
              href={signupUrl}
              className="font-bold text-[#0c705d] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default SignInPage;
