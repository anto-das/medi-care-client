"use client";

import Divider from "@/components/separator-with-text-1";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { FaGoogle } from "react-icons/fa";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import * as z from "zod";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { Roles } from "@/constants/Roles";

interface Signup2Props {
  heading?: string;
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
  className?: string;
}

const SignInPage = ({
  buttonText = "Sign In",
  signupText = "Don't have an account?",
  signupUrl = "/sign-up",
  className,
}: Signup2Props) => {
  const router = useRouter();
  // console.log(router);
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
      const toastId = toast.loading("Signing in...");
      try {
        const result = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        });
        const { data, error } = result;
        // console.log("Sign-In Response:", data, error);
        const user: any = data?.user;
        if (user?.role === Roles.SELLER) {
          toast.success("Signed in successfully!", { id: toastId });
          console.log("User data after sign-in:", user.role);
          router.push("/");
        } else if (user?.role === Roles.ADMIN) {
          toast.success("Signed in successfully!", { id: toastId });
          router.push("/");
        } else if (user?.role === Roles.CUSTOMER) {
          toast.success("Signed in successfully!", { id: toastId });
          router.push("/");
        }
      } catch (e) {
        toast.error("Failed to sign in. Please try again.", { id: toastId });
      }
      // Handle form submission logic here
    },
  });
  const handleSignInWithGoogle = async () => {
    const res = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/`, // Adjust the callback URL as needed
    });
    const toastId = toast.loading("Redirecting to Google...");
    try {
      const { data, error } = res;
      console.log("Google Sign-In Response:", data, error);
      if (error) {
        toast.error(error.message, { id: toastId });
        return;
      }
      if (data) {
        toast.success("Redirected to Google successfully!", { id: toastId });
        router.push("/");
      }
    } catch (error) {
      toast.error("Failed to redirect to Google.", { id: toastId });
    }
  };

  return (
    <section
      className={cn(
        "min-h-screen flex justify-center items-center bg-muted",
        className,
      )}
    >
      <div className=" items-center gap-6 lg:justify-evenly  shadow-md w-11/12 md:w-11/12 lg:w-1/4 mx-auto my-10 rounded-xl">
        {/* Logo */}
        <div className="bg-[#0c705d] rounded-t-xl py-5 w-full space-y-5">
          <h1 className="text-4xl text-center">🌱</h1>
          <h2 className="text-3xl font-semibold text-center text-gray-200 py-5">
            Create Your Account{" "}
          </h2>
          <p className="text-center text-gray-300">
            Join 2 million+ MediCare customers
          </p>
        </div>
        {/* sign up sign in button */}

        <div className="bg-background rounded-b-xl w-full flex flex-col justify-center items-center  space-y-5">
          {/* sign up form */}
          <form
            id="sign up form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="w-full"
          >
            <FieldGroup className="flex w-full flex-col items-center gap-y-4 rounded-md px-0 py-3 justify-center">
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field
                      data-invalid={isInvalid}
                      className="w-11/16 flex-col gap-2"
                    >
                      <FieldLabel htmlFor="email" className="text-lg font-bold">
                        Email
                      </FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="text-lg py-5 placeholder:text-lg focus:text-lg"
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
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
                      className="w-11/16 flex-col gap-2"
                    >
                      <FieldLabel
                        htmlFor="password"
                        className="text-lg font-bold"
                      >
                        Password
                      </FieldLabel>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="text-lg py-5 placeholder:text-lg focus:text-lg"
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
          <Button type="submit" form="sign up form" className="w-11/16">
            {buttonText}
          </Button>
          <Divider />
          <div className="w-11/16 mx-auto">
            <button
              onClick={handleSignInWithGoogle}
              className="flex items-center gap-2 border border-[#0c705d] text-[#0c705d] hover:bg-[#0c705d] hover:text-white transition-colors duration-300 rounded-md px-4 py-2 w-full justify-center text-lg font-bold hover:text-lg hover:font-bold"
            >
              {" "}
              <FaGoogle /> Google{""}
            </button>
          </div>

          <div className="flex justify-center items-center gap-1 text-sm text-muted-foreground pb-5">
            <p>{signupText}</p>
            <Link
              href={signupUrl}
              className="font-bold font-[sans-serif] text-[#0c705d]"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
