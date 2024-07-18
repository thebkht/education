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

type DeadlineProps = {
     days: number;
     hours: number;
     minutes: number;
};

export default function Index({
     collapsed: initialCollapsed,
     onCollapse,
}: {
     collapsed: boolean;
     onCollapse: (collapsed: boolean) => void;
}) {
     const [nextWeek, setNextWeek] = React.useState<Date>(
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
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

     React.useEffect(() => {
          onCollapse(collapsed);
     }, [collapsed]);

     return (
          <>
               <div className="flex h-14 flex-[0_0_auto]">
                    <div
                         className={`flex flex-[1_1_1px] py-2 px-6 box-border fixed h-14 ${collapsed ? "w-[calc(100vw-72px)]" : "w-[calc(100vw-250px)]"
                              } border-b z-40 justify-between items-center transition-all duration-300 ease-in-out`}
                    >
                         <div className="flex items-center gap-4">
                              <Button
                                   className="flex items-center gap-2 bg-background text-foreground border-none"
                                   onClick={() => setCollapsed(!collapsed)}
                              >
                                   <Icons.menu className="w-5 h-5" />
                                   <span className="sr-only">Menu</span>
                              </Button>
                              <Badge>Mening kurslarim</Badge>
                         </div>
                         <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-sm font-medium">
                                   <div className="bg-primary rounded-[2px] p-1 w-7 text-primary-foreground text-sm text-center">
                                        {deadline?.days || 0}
                                   </div>
                                   Kun
                              </div>
                              <div className="flex items-center gap-1 text-sm font-medium">
                                   <div className="bg-primary rounded-[2px] p-1 w-7 text-primary-foreground text-sm text-center">
                                        {deadline?.hours || 0}
                                   </div>
                                   Soat
                              </div>
                              <div className="flex items-center gap-1 text-sm font-medium">
                                   <div className="bg-primary rounded-[2px] p-1 w-7 text-primary-foreground text-sm text-center">
                                        {deadline?.minutes || 0}
                                   </div>
                                   Daqiqa
                              </div>
                         </div>
                         <DropdownMenu>
                              <DropdownMenuTrigger className={cn("focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/15 rounded", styles.dropdown)}>
                                   <div className="flex items-center gap-2 rounded py-2.5 px-2">
                                        <span className="text-sm text-second font-medium">
                                             jz015yv4
                                        </span>
                                        <Icons.chevronDown className={cn("w-3", styles.select)} />
                                   </div>
                                   <div className="h-10 w-10 bg-primary/10 rounded-full flex justify-center items-center">
                                        <Icons.user className="h-5 w-5 text-primary" />
                                   </div>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                   <DropdownMenuItem className="py-2 px-3 flex items-center gap-3 text-sm">
                                        <Icons.logout className="w-4 h-4" /> Tizimdan chiqish
                                   </DropdownMenuItem>
                              </DropdownMenuContent>
                         </DropdownMenu>
                    </div>
               </div>
          </>
     );
}
