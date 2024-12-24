import SignUpClientPage from "@/components/pages/sign-up";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Sign up for a new account",
};

export default function SignUpPage() {
  return <SignUpClientPage />;
}
