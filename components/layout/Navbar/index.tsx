import Image from "next/image";
import Link from "next/link";
import Button from "@/components/UI/Button";
import { useRouter } from "next/router";
import { IUser } from "@/interfaces/auth";

export default function SiteHeader({ user }: { user?: IUser | null }) {
  const router = useRouter();
  return (
    <nav className="container mx-auto flex w-full items-center justify-between">
      <Link
        href="/"
        className="flex items-center justify-start gap-1.5 rounded-lg"
      >
        <div className="relative h-[60px] w-[60px]">
          <Image
            src={"/logo.png"}
            alt="Logo"
            placeholder="empty"
            // blurDataURL={getImageBase64()}
            priority={true}
            fill={true}
            objectFit="contain"
            className={`h-auto transition-all duration-300 ease-in-out`}
            sizes="(max-width: 1920px) 100vw"
          />
        </div>
        <div
          className={
            "text-center text-[10px] font-bold text-primary transition-all duration-300 ease-in-out"
          }
        >
          AVTOMOBIL YO‘LLARI <br /> ILMIY-TADQIQOT <br /> INSTITUTI
        </div>
      </Link>
      <div className="flex items-center justify-end gap-6">
        <Link href="tel:+998711234567" className="font-medium text-primary">
          +998 71 123 45 67
        </Link>
        <Button size={"sm"} onClick={() => router.push("/?code=123")}>
          {user ? "Shaxsiy kabinet" : "Kirish"}
        </Button>
      </div>
    </nav>
  );
}
