import SignInClientPage from "@/components/pages/sign-in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your account",
};

export default function SignInPage() {
  return <SignInClientPage />;
}
