import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LayoutDashboard,
  Shield,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "@/lib/auth-types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LogoutButton from "./logout-button";

interface UserAvatarProps {
  session: Session;
  className?: string;
}

const UserAvatar = ({ session, className }: UserAvatarProps) => {
  const username = session.user.username as string;

  return (
    <Avatar className={cn("h-8 w-8 rounded-lg", className)}>
      <AvatarImage src={session.user.image || ""} alt={username} />
      <AvatarFallback className="rounded-lg">
        {username.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

interface UserInfoProps {
  session: Session;
  className?: string;
}

const UserInfo = ({ session, className }: UserInfoProps) => (
  <div className={cn("grid flex-1 text-left text-sm leading-tight", className)}>
    <span className="truncate font-semibold">
      {session.user.name || session.user.username}
    </span>
    <span className="truncate text-xs text-muted-foreground">
      {session.user.email}
    </span>
  </div>
);

interface MenuItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const MenuItem = ({ icon, children, className }: MenuItemProps) => (
  <DropdownMenuItem className={cn("gap-2", className)}>
    {icon}
    {children}
  </DropdownMenuItem>
);

interface UserMenuProps {
  session: Session;
  variant?: "default" | "sidebar";
  side?: "bottom" | "right";
  align?: "start" | "end";
}

export default async function UserMenu({
  session,
  variant = "default",
  side = "bottom",
  align = "end",
}: UserMenuProps) {
  const isSidebar = variant === "sidebar";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          variant="ghost"
          className={cn(
            "group relative gap-2",
            isSidebar
              ? "h-auto px-2 py-2 w-full justify-start hover:bg-sidebar-accent data-[state=open]:bg-sidebar-accent"
              : "hover:bg-accent/80 px-2 py-2"
          )}
        >
          <UserAvatar session={session} />
          <UserInfo session={session} />
          <ChevronsUpDown className="ml-auto size-4 transition-transform group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={side}
        align={align}
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0">
          <div className="flex items-center gap-2 p-2">
            <UserAvatar session={session} />
            <UserInfo session={session} />
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <MenuItem
            icon={<BadgeCheck size={4} />}
            className="hover:bg-accent/80"
          >
            <Link href="/dashboard/profile/settings" className="w-full">
              Account
            </Link>
          </MenuItem>
          <MenuItem
            icon={<LayoutDashboard size={4} />}
            className="hover:bg-accent/80"
          >
            <Link href="/dashboard" className="w-full">
              Dashboard
            </Link>
          </MenuItem>
          {session.user.role === "admin" && (
            <MenuItem icon={<Shield size={4} />} className="hover:bg-accent/80">
              <Link href="/dashboard/admin" className="w-full">
                Admin Panel
              </Link>
            </MenuItem>
          )}
          <MenuItem icon={<Bell size={4} />} className="hover:bg-accent/80">
            <Link href="/dashboard/profile/notifications" className="w-full">
              Notifications
            </Link>
          </MenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
