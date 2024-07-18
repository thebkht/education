import { Icons } from "@/components/icons";
import Link from "next/link";
import React from "react";

export default function Index({ collapsed }: { collapsed: boolean }) {
     return (
          <>
               <aside className={`flex flex-col gap-6 ${collapsed ? "w-[72px]" : "w-[250px]"} border-r border-border p-4 transition-all duration-300 ease-in-out`}>
                    <div className="flex flex-col gap-4">
                         <Link className="flex gap-3 items-center flex-1" href={'/courses'}>
                              <div className="h-10 w-10 rounded-[4px] p-2 bg-primary flex justify-center items-center">
                                   <Icons.home className="h-[18] w-[18px] text-primary-foreground" />
                              </div>
                              <span className={`font-medium text-sm text-primary transition-all duration-300 ease-in-out ${collapsed && "hidden"}`}>
                                   Mening kurslarim
                              </span>
                         </Link>
                    </div>
               </aside>
          </>
     )
}