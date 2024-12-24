import ForgotPasswordClientPage from "@/components/pages/forgot-password";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Send a reset link to your email",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClientPage />;
}
