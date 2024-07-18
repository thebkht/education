import Image from "next/image";
import Link from "next/link";
import Button from "@/components/UI/Button";

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
                    <Button size={'sm'}>Kirish</Button>
               </div>
          </nav>
     );
}