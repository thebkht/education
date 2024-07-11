import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
     return (
          <nav className="container flex items-center justify-between w-full mx-auto">
               <Link href="/">
                    <Image src="/logo.png" alt="Logo" width={209} height={59} />
               </Link>
               <div className="flex items-center justify-end gap-6">
                    <Link href="tel:+998711234567" className="text-primary font-medium">
                         +998 71 123 45 67
                    </Link>
                    <button className="border border-secondary bg-background hover:bg-secondary hover:text-primary-foreground px-4 py-2 text-xs font-bold rounded-[4px]">Ro&apos;yxatdan o&apos;tish</button>
                    <button className="bg-primary border border-primary text-primary-foreground px-4 py-2 text-xs font-bold rounded-[4px]">Kirish</button>
               </div>
          </nav>
     );
}