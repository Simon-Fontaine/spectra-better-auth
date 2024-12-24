"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
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

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
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

export default function ResetPasswordClientPage() {
  const { toast } = useToast();
  const router = useRouter();

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function handleResetPasswordSubmit(
    formData: z.infer<typeof resetPasswordSchema>
  ) {
    try {
      const { error } = await authClient.resetPassword({
        newPassword: formData.password,
      });

      if (error) {
        return toast({
          variant: "destructive",
          title: "Error!",
          description: error.message,
        });
      }

      toast({
        title: "Success!",
        description: "Password reset successfully. You can now sign in.",
      });
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        title: "Error!",
        description:
          "An error occurred while resetting your password. Please try again later.",
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
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter and confirm your new password to reset your password
          </p>
        </div>
        <Form {...resetPasswordForm}>
          <form
            className="flex flex-col gap-2"
            onSubmit={resetPasswordForm.handleSubmit(handleResetPasswordSubmit)}
          >
            <FormField
              control={resetPasswordForm.control}
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
              control={resetPasswordForm.control}
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

            <Button
              type="submit"
              disabled={resetPasswordForm.formState.isSubmitting}
            >
              {resetPasswordForm.formState.isSubmitting ? (
                <Loader2 size={4} className="animate-spin" />
              ) : null}
              {resetPasswordForm.formState.isSubmitting
                ? "Reseting Password..."
                : "Reset Password"}
            </Button>
          </form>
        </Form>
        <p className="flex flex-col gap-2 px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/sign-in"
            className="hover:text-brand underline underline-offset-4"
          >
            Found your password? Sign in
          </Link>
          <Link
            href="/sign-up"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
