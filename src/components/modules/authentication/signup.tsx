"use client";

import Divider from "@/components/separator-with-text-1";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";

import { FaGoogle } from "react-icons/fa";

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
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
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
      <div className="flex flex-col lg:flex-row md:flex-row items-center gap-6 lg:justify-evenly  shadow-md rounded-xl lg:rounded-2xl w-11/16 mx-auto bg-[#0c705d] my-10 ">
        {/* Logo */}
        <div className="bg-[#0c705d] w-full rounded-lg space-y-5">
          <h1 className="text-4xl text-center">🌱</h1>
          <h2 className="text-3xl font-semibold text-center text-gray-200 py-5">
            Create Your Account{" "}
          </h2>
          <p className="text-center text-gray-300">
            Join 2 million+ MediCare customers
          </p>
        </div>
        {/* sign up sign in button */}

        <div className="bg-background p-10 w-full flex flex-col justify-center items-center rounded-b-lg lg:rounded-r-2xl space-y-5">
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
                  return (
                    <Field className="w-11/16 flex-col gap-2">
                      <FieldLabel className="text-lg font-bold">
                        Name
                      </FieldLabel>
                      <Input
                        type="text"
                        placeholder="Name"
                        className="w-full text-lg py-5 placeholder:text-lg focus:text-lg"
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                      />
                    </Field>
                  );
                }}
              />
              <form.Field
                name="email"
                children={(field) => {
                  return (
                    <Field className="w-11/16 flex-col gap-2">
                      <FieldLabel className="text-lg font-bold">
                        Email
                      </FieldLabel>
                      <Input
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
                  return (
                    <Field className="w-11/16 flex-col gap-2">
                      <FieldLabel className="text-lg font-bold">
                        Password
                      </FieldLabel>
                      <Input
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
