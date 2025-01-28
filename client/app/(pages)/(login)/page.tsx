"use client";

import React from "react";
import {
  Form,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Button,
} from "@heroui/react";
import Image from "next/image";
import { ThemeSwitch } from "@/components/theme-switch";

export default function App() {
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<any>({});

  // Real-time password validation
  const getPasswordError = (value: any) => {
    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password needs at least 1 uppercase letter";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password needs at least 1 symbol";
    }

    return null;
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Custom validation checks
    const newErrors: {
      password?: string;
      email?: string;
    } = {};

    // Password validation
    const passwordError = getPasswordError(data.password);

    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }
    // Clear errors and submit
    setErrors({});
    console.log(data);
  };

  return (
    <main className="w-full h-[100vh] flex flex-col md:flex-row-reverse md:gap-20 justify-around items-center">
      <section className=" flex flex-col items-center md:w-1/2">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          ChatterBox
        </h1>
        <Image
          alt="message bubble"
          height={1000}
          width={1000}
          className="object-cover w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px]"
          src="/hero.png"
        />
        <h1 className="md:text-lg lg:text-xl mt-5 md:mt-10 text-center md:text-start">
          Where Communication Meets Simplicity
        </h1>
      </section>
      <section className="md:w-1/2">
        <div className="w-full flex justify-center items-center">
          <ThemeSwitch />
        </div>
        <h1 className="mt-5 text-2xl text-center">Login</h1>
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
              errorMessage={getPasswordError(password)}
              isInvalid={getPasswordError(password) !== null}
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
                className="w-full text dark:text-white"
                color="primary"
                type="submit"
              >
                Login
              </Button>
              <Button type="reset" variant="bordered">
                Reset
              </Button>
            </div>
          </div>
        </Form>
      </section>
    </main>
  );
}
