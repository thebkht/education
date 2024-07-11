import Link from "next/link";
import { Icons } from "@/components/icons";

export default function Index() {
     return (<>
          <footer className="bg-secondary">
               <div className="container mx-auto flex justify-between h-16">
                    <p className="text-muted-foreground inline-flex my-auto">Mualliflik huquqi © AYITI.UZ 2024. Barcha huquqlar himoyalangant</p>
                    <div className="flex gap-3 items-center">
                         <Link href="#">
                              <Icons.facebook className="h-6 text-muted-foreground" />
                         </Link>
                         <Link href="#">
                              <Icons.instagram className="h-6 text-muted-foreground" />
                         </Link>
                         <Link href="#">
                              <Icons.telegram className="w-6 h-6 text-muted-foreground" />
                         </Link>
                    </div>
               </div>
          </footer>
     </>)
}