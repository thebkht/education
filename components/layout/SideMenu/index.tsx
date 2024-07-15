import { Icons } from "@/components/icons";
import Link from "next/link";

export default function Index() {
     return (
          <>
               <div className="flex flex-col gap-6 w-[250px] border-r border-border p-4">
                    <div className="flex flex-col gap-4">
                         <Link className="flex gap-3 items-center flex-1" href={'/courses'}>
                              <div className="h-10 w-10 rounded-[4px] p-2 bg-primary flex justify-center items-center">
                                   <Icons.home className="h-[18] w-[18px] text-primary-foreground" />
                              </div>
                              <span className="font-medium text-sm text-primary">
                                   Мои курсы
                              </span>
                         </Link>
                    </div>
               </div>
          </>
     )
}