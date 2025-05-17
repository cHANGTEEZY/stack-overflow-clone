"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  FieldValues,
  DefaultValues,
  SubmitHandler,
  Path,
} from "react-hook-form";
import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface AuthFormProps<T> extends FieldValues {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  formType,
  defaultValues,
  schema,
  onSubmit,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async () => {};

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10 ">
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem className="flex-col flex w-full gap-2.5">
                <FormLabel className="paragraph-medium text-dark400_light700">
                  {field.name === "email"
                    ? "Email Address"
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    type={field.name === "password" ? "password" : "text"}
                    {...field}
                    className="paragraph-regular background-light900_dark300 light-border-2 
                    text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className=" cursor-pointer primary-gradient paragraph-medium w-full min-h-12 rounded-2 px-4 py-3 font-inter !text-light-900"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Signing in..."
              : "Signing Up..."
            : buttonText}
        </Button>

        {formType === "SIGN_UP" ? (
          <p>
            Already have an account?{" "}
            <Link
              href={"/sign-in"}
              className="paragrah-semibold primary-text-gradient"
            >
              Sign in
            </Link>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <Link
              href={"/sign-up"}
              className="paragrah-semibold primary-text-gradient"
            >
              Sign Up
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
