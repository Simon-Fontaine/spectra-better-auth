import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "../ui/button";
import Link from "next/link";
import UserMenu from "./user-menu";
import { Session } from "@/lib/auth-types";

export default async function AuthButton() {
  const session = (await auth.api.getSession({
    headers: await headers(),
  })) as Session;

  if (!session)
    return (
      <Button asChild size="sm" variant="outline">
        <Link href="/sign-in">Sign in</Link>
      </Button>
    );

  return <UserMenu session={session} />;
}
