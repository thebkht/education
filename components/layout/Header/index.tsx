import { Icons } from "@/components/icons";
import Badge from "@/components/UI/Badge";
import Button from "@/components/UI/Button";

import DropdownMenu, {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu";

import { formatDeadline } from "@/lib/formatter";
import React from "react";
import styles from "./styles.module.css";
import { cn } from "@/lib/utils";
import { IUser } from "@/interfaces/auth";
import { useRouter } from "next/router";

type DeadlineProps = {
  days: number;
  hours: number;
  minutes: number;
};

export default function Index({
  collapsed: initialCollapsed,
  onCollapse,
  session,
}: {
  collapsed: boolean;
  onCollapse: () => void;
  session: IUser;
}) {
  const router = useRouter();

  const [nextWeek, setNextWeek] = React.useState<Date>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  );
  const [deadline, setDeadline] = React.useState<DeadlineProps | null>(null);
  const [collapsed, setCollapsed] = React.useState<boolean>(initialCollapsed);

  // Corrected code to update deadline every minute
  React.useEffect(() => {
    const updateDeadline = () => {
      setDeadline(formatDeadline(nextWeek.toISOString()));
    };

    updateDeadline(); // Update immediately on effect run
    const intervalId = setInterval(updateDeadline, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on unmount or nextWeek change
  }, [nextWeek]);

  return (
    <>
      <div className="flex h-14 flex-[0_0_auto]">
        <div
          className={`fixed box-border flex h-14 flex-[1_1_1px] px-6 py-2 ${
            collapsed ? "w-[calc(100vw-72px)]" : "w-[calc(100vw-250px)]"
          } z-0 items-center justify-between border-b border-popover`}
        >
          <div className="flex items-center gap-4">
            <Button
              className="flex items-center gap-2 border-none bg-background p-2 text-foreground"
              onClick={() => {
                setCollapsed((prev) => !prev);
                onCollapse();
              }}
            >
              <Icons.menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
            {collapsed && <Badge>Mening kurslarim</Badge>}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm font-medium">
              <div className="w-7 rounded-[2px] bg-primary p-1 text-center text-sm text-primary-foreground">
                {deadline?.days || 0}
              </div>
              Kun
            </div>
            <div className="flex items-center gap-1 text-sm font-medium">
              <div className="w-7 rounded-[2px] bg-primary p-1 text-center text-sm text-primary-foreground">
                {deadline?.hours || 0}
              </div>
              Soat
            </div>
            <div className="flex items-center gap-1 text-sm font-medium">
              <div className="w-7 rounded-[2px] bg-primary p-1 text-center text-sm text-primary-foreground">
                {deadline?.minutes || 0}
              </div>
              Daqiqa
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/15",
                styles.dropdown,
              )}
            >
              <div className="flex items-center gap-2 rounded px-2 py-2.5">
                <span className="text-sm font-medium text-second">
                  {session?.fullName ?? "jz015yv4"}
                </span>
                <Icons.chevronDown className={cn("w-3", styles.select)} />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Icons.user className="h-5 w-5 text-primary" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="flex items-center gap-3 px-3 py-2 text-sm"
                onSelect={() => {
                  router.push("/logout");
                }}
              >
                <Icons.logout className="h-4 w-4" /> Tizimdan chiqish
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
