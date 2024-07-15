import { Icons } from "@/components/icons";
import Badge from "@/components/UI/Badge";
import Button from "@/components/UI/Button";
import { formatDeadline } from "@/lib/formatter";
import React from "react";

export default function Index() {
     const [nextWeek, setNextWeek] = React.useState<Date>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
     const [deadline, setDeadline] = React.useState(formatDeadline(nextWeek.toISOString()));

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
                    <div className="flex flex-[1_1_1px] py-2 px-6 box-border fixed h-14 w-[calc(100vw-250px)] border-b z-40 justify-between items-center">
                         <div className="flex items-center gap-4">
                              <div className="font-medium text-second text-lg">
                                   Обучение
                              </div>
                              <Badge>Мои курсы</Badge>
                         </div>
                         <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-sm font-medium">
                                   <div className="bg-primary rounded-[2px] p-1 w-7 text-primary-foreground text-sm text-center">
                                        {deadline.days}
                                   </div>
                                   Kun
                              </div>
                              <div className="flex items-center gap-1 text-sm font-medium">
                                   <div className="bg-primary rounded-[2px] p-1 w-7 text-primary-foreground text-sm text-center">
                                        {deadline.hours}
                                   </div>
                                   Soat
                              </div>
                              <div className="flex items-center gap-1 text-sm font-medium">
                                   <div className="bg-primary rounded-[2px] p-1 w-7 text-primary-foreground text-sm text-center">
                                        {deadline.minutes}
                                   </div>
                                   Daqiqa
                              </div>
                         </div>
                         <div className="flex gap-6 items-center">
                              <Button className="flex gap-2 rounded-[4px] py-2.5 px-2 bg-background border-none text-foreground">
                                   <span className="text-sm text-second font-medium">jz015yv4</span>
                                   <Icons.chevronDown className="w-3" />
                              </Button>
                              <div className="h-10 w-10 bg-primary/10 rounded-full flex justify-center items-center">
                                   <Icons.user className="h-5 w-5 text-primary" />
                              </div>
                         </div>
                    </div>
               </div>
          </>
     )
}