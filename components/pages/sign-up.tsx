"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { SpectraLogo } from "@/components/icons";

const signUpSchema = z
  .object({
    username: z
      .string()
      .regex(
        /^[a-z0-9_]{1,48}$/,
        "Username must be lowercase and contain only letters, numbers, and underscores"
      ),
    display_name: z
      .string()
      .regex(
        /^[a-zA-Z0-9_ ]{0,32}$/,
        "Display name must contain only letters, numbers, underscores, and spaces"
      ),
    email: z
      .string()
      .email("Email must be a valid email address (e.g. member@owspectra.com)"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    image: z.optional(z.instanceof(File)),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["password"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function SignUpClientPage() {
  const { toast } = useToast();
  const router = useRouter();

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      display_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleSignUpSubmit(formData: z.infer<typeof signUpSchema>) {
    try {
      const image = formData.image
        ? await convertImageToBase64(formData.image)
        : "";

      const { data, error } = await authClient.signUp.email({
        name: formData.display_name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        image: image,
        callbackURL: "/sign-in",
      });

      if (error) {
        return toast({
          variant: "destructive",
          title: "Error!",
          description: error.message,
        });
      }

      if (data.emailVerified) {
        router.push("/dashboard");
      } else {
        toast({
          title: "Success!",
          description: "Please check your email to verify your account",
        });
      }
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        title: "Error!",
        description:
          "An error occurred while signing up. Please try again later.",
      });
    }
  }

  return (
    <main className="container flex h-screen w-screen flex-col items-center justify-center">
      <Button
        variant="ghost"
        className="group absolute left-4 top-4 md:left-8 md:top-8"
        onClick={() => router.back()}
      >
        <ChevronLeft
          size={4}
          className="mr-2 transition-transform group-hover:-translate-x-1"
        />
        Back
      </Button>
      <Button
        asChild
        variant="ghost"
        className="group absolute right-4 top-4 md:right-8 md:top-8"
      >
        <Link href="/sign-in">
          Login
          <ChevronRight
            size={4}
            className="ml-2 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </Button>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:max-w-md px-6 sm:px-0">
        <div className="flex flex-col space-y-2 text-center">
          <SpectraLogo width={40} height={40} className="mx-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your username, email, and password to get started.
          </p>
        </div>
        <Form {...signUpForm}>
          <form
            className="flex flex-col gap-2"
            onSubmit={signUpForm.handleSubmit(handleSignUpSubmit)}
          >
            <FormField
              control={signUpForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="member" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signUpForm.control}
              name="display_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Member" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signUpForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="member@owspectra.com" />
                  </FormControl>
                  <FormDescription>
                    Your email address is used for login and notifications.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signUpForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your new password"
                      type="password"
                      autoComplete="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signUpForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Confirm your new password"
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signUpForm.control}
              name="image"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    An avatar is optional but strongly recommended.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={signUpForm.formState.isSubmitting}>
              {signUpForm.formState.isSubmitting ? (
                <Loader2 size={4} className="animate-spin" />
              ) : null}
              {signUpForm.formState.isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        </Form>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking sign up, you agree to our{" "}
          <Link
            href="/terms-of-service"
            className="hover:text-brand underline underline-offset-4"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy-policy"
            className="hover:text-brand underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
