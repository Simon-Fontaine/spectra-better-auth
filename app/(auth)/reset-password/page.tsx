import ResetPasswordClientPage from "@/components/pages/reset-password";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password",
};

export default function ResetPasswordPage() {
  return <ResetPasswordClientPage />;
}
