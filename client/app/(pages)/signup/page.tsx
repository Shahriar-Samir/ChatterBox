"use client";

import React from "react";
import { Form, Input, Button } from "@heroui/react";
import Image from "next/image";
import { ThemeSwitch } from "@/components/theme-switch";
import { useSignupMutation } from "@/redux/api/apiSlice";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function App() {
  const [signup, { isLoading, isError, error }] = useSignupMutation();
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<any>({});
  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const result = await signup(data).unwrap();
      toast({
        description: result.message,
        duration: 1500,
      });
      router.push("/");
    } catch (err: any) {
      toast({
        title: err.message,
        variant: "destructive",
        duration: 1500,
      });
    }
  };

  return (
    <main className="w-full h-[100vh] flex flex-col justify-center gap-20 items-center">
      <section className=" flex justify-center items-center gap-5 w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          ChatterBox
        </h1>
        <Image
          alt="message bubble"
          height={1000}
          width={1000}
          className="object-cover w-[80px] h-[80px] md:w-[100px] md:h-[100px] "
          src="/hero.png"
        />
      </section>
      <section className="w-full">
        <div className="w-full flex justify-center items-center">
          <ThemeSwitch />
        </div>
        <h1 className="mt-5 text-2xl text-center">Create a new account</h1>
        <Form
          className="justify-center items-center space-y-4 mt-10"
          validationBehavior="native"
          validationErrors={errors}
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-4 !w-full !max-w-[320px]">
            <Input
              isRequired
              errorMessage={({ validationDetails }) => {
                if (validationDetails.valueMissing) {
                  return "Please enter your first name";
                }
                if (validationDetails.typeMismatch) {
                  return "Please enter a valid first name";
                }
              }}
              label="First name"
              labelPlacement="outside"
              name="firstName"
              placeholder="Enter your first name"
              type="text"
            />
            <Input
              isRequired
              errorMessage={({ validationDetails }) => {
                if (validationDetails.valueMissing) {
                  return "Please enter your last name";
                }
                if (validationDetails.typeMismatch) {
                  return "Please enter a valid last name";
                }
              }}
              label="Last name"
              labelPlacement="outside"
              name="lastName"
              placeholder="Enter your last name"
              type="text"
            />
            <Input
              isRequired
              errorMessage={({ validationDetails }) => {
                if (validationDetails.valueMissing) {
                  return "Please enter your email";
                }
                if (validationDetails.typeMismatch) {
                  return "Please enter a valid email address";
                }
              }}
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="Enter your email"
              type="email"
            />

            <Input
              isRequired
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onValueChange={setPassword}
            />

            {errors?.terms && (
              <span className="text-danger text-small">{errors.terms}</span>
            )}

            <div className="flex gap-4">
              <Button
                className="w-full text bg-commonColor text-white "
                type="submit"
              >
                Create an account
              </Button>
              <Button type="reset" variant="bordered">
                Reset
              </Button>
            </div>
            <h1 className="text-center text-sm">
              Don't have an account ?{" "}
              <Link href="/login" className="underline text-bold">
                login
              </Link>
            </h1>
          </div>
        </Form>
      </section>
    </main>
  );
}
