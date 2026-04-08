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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import * as z from "zod";

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
      console.log("Form Values:", value);
      const res = await authClient.signIn.email(value);
      console.log("Sign In Response:", res);
      // Handle form submission logic here
    },
  });
  const handleLoginWithGoogle = async () => {
    const res = authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
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
              onClick={handleLoginWithGoogle}
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
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
