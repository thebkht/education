import Metadata from "@/components/Metadata";
import { buttonVariants } from "@/components/UI/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function notFound() {
  return (
    <>
      <Metadata title="404" description="Sahifa topilmadi" noFollow />
      <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-background">
        <div className="z-10 flex flex-col items-center justify-center gap-6">
          <h2 className="text-5xl font-bold">404</h2>
          <p className="text-center text-xl">Sahifa topilmadi</p>
          <Link className={cn(buttonVariants({ size: "sm" }), "mt-4")} href="/">
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </>
  );
}
