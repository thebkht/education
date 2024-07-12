import { Icons } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";

export default function Index() {
     return (
          <>
               <div className="flex flex-col gap-6 w-[250px] border-r border-border p-4">
                    <Link href="/">
                         <Image src="/logo.png" alt="Logo" width={141} height={45} />
                    </Link>
                    <div className="flex flex-col gap-4 flex-1">
                         <div className="flex gap-3 items-center">
                              <div className="h-10 w-10 rounded-[4px] p-2 bg-primary">
                                   <Icons.home className="h-6 w-6 text-primary-foreground" />
                              </div>
                              <span className="font-medium text-sm">
                                   Мои курсы
                              </span>
                         </div>
                    </div>
               </div>
          </>
     )
}