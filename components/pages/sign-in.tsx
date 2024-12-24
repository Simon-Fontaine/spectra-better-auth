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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { SpectraLogo } from "@/components/icons";

const signInSchema = z.object({
  email: z
    .string()
    .email("Email must be a valid email address (e.g. member@owspectra.com)"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  rememberMe: z.boolean(),
});

export default function SignInClientPage() {
  const { toast } = useToast();
  const router = useRouter();

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function handleSignInSubmit(formData: z.infer<typeof signInSchema>) {
    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
        callbackURL: "/dashboard",
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
        description: "You have successfully signed in.",
      });

      if (data.redirect) {
        const url = data.url || "/dashboard";

        router.push(url);
      }
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        title: "Error!",
        description:
          "An error occurred while signing in. Please try again later.",
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
        <Link href="/sign-up">
          Register
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
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <Form {...signInForm}>
          <form
            className="flex flex-col gap-2"
            onSubmit={signInForm.handleSubmit(handleSignInSubmit)}
          >
            <FormField
              control={signInForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="member@owspectra.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signInForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Your password"
                      type="password"
                      autoComplete="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signInForm.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Remember me</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                  <FormDescription>
                    Stay signed in unless you sign out.
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={signInForm.formState.isSubmitting}>
              {signInForm.formState.isSubmitting ? (
                <Loader2 size={4} className="animate-spin" />
              ) : null}
              {signInForm.formState.isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </Form>
        <p className="flex flex-col gap-2 px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/forgot-password"
            className="hover:text-brand underline underline-offset-4"
          >
            Lost your password? Reset it
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
