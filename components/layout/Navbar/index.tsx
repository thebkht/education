import Image from "next/image";
import Link from "next/link";
import Button from "@/components/UI/Button";
import { useRouter } from "next/router";
import { IUser } from "@/interfaces/auth";

export default function SiteHeader({ user }: { user?: IUser | null }) {
  const router = useRouter();
  return (
    <nav className="container mx-auto flex w-full items-center justify-between">
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={209} height={59} />
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
