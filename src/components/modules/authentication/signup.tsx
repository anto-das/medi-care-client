"use client";

import Divider from "@/components/separator-with-text-1";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";

import { FaGoogle } from "react-icons/fa";

import * as z from "zod";

interface Signup2Props {
  heading?: string;
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
  className?: string;
}

const Signup = ({
  buttonText = "Create Account",
  signupText = "Already have an account?",
  signupUrl = "/sign-in",
  className,
}: Signup2Props) => {
  const formSchema = z.object({
    name: z.string().min(5, "Name is required! must be at least 5 characters"),
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
      console.log("Form Values:", value);
      // Handle form submission logic here
    },
  });
  return (
    <section
      className={cn(
        "min-h-screen flex justify-center items-center bg-muted",
        className,
      )}
    >
      <div className="flex flex-col lg:flex-row md:flex-row items-center gap-6 lg:justify-evenly  shadow-md rounded-xl lg:rounded-2xl w-11/12 md:w-11/12 lg:w-11/16 mx-auto bg-[#0c705d] my-10 ">
        {/* Logo */}
        <div className="bg-[#0c705d] w-full rounded-lg space-y-3 py-5">
          <h1 className="text-4xl text-center">🌱</h1>
          <h2 className="text-3xl font-semibold text-center text-gray-200">
            Create Your Account{" "}
          </h2>
          <p className="text-center text-gray-300">
            Join 2 million+ MediCare customers
          </p>
        </div>
        {/* sign up sign in button */}

        <div className="bg-background p-10 w-full flex flex-col justify-center items-center rounded-b-lg md:rounded-l-none md:rounded-r-xl lg:rounded-l-none lg:rounded-r-xl space-y-5">
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
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field
                      data-invalid={isInvalid}
                      className="w-11/16 flex-col gap-2"
                    >
                      <FieldLabel htmlFor="name" className="text-lg font-bold">
                        Name
                      </FieldLabel>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Name"
                        className="w-full text-lg py-5 placeholder:text-lg focus:text-lg"
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
            <button className="flex items-center gap-2 border border-[#0c705d] text-[#0c705d] hover:bg-[#0c705d] hover:text-white transition-colors duration-300 rounded-md px-4 py-2 w-full justify-center text-lg font-bold hover:text-lg hover:font-bold">
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

export { Signup };
