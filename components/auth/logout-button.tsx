"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, LogOut } from "lucide-react";

interface LogoutButtonProps {
  redirect?: string;
  className?: string;
}

export default function LogoutButton({
  redirect,
  className = "w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive",
}: LogoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Button
      size="sm"
      variant="ghost"
      className={className}
      onClick={async () => {
        setLoading(true);
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.refresh();
              if (redirect) router.push(redirect);
            },
          },
        });
        setLoading(false);
      }}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="animate-spin size-4" />
      ) : (
        <LogOut className="size-4" />
      )}
      {loading ? "Signing Out..." : "Sign Out"}
    </Button>
  );
}
