import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/components/icons";
import Balancer from "react-wrap-balancer";

export default function Index({
  testimonial,
  ...props
}: { testimonial: any } & React.ComponentPropsWithoutRef<"div">) {
  return (
    <>
      <div className="flex flex-1 gap-6 self-stretch rounded-[20px] border border-border bg-background p-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold text-primary">{testimonial.name}</p>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) =>
                index < testimonial.rate ? (
                  <Icons.starFilled
                    className="h-5 w-5"
                    key={`filled_${index}`}
                  />
                ) : (
                  <Icons.star className="h-5 w-5" key={`empty_${index}`} />
                ),
              )}
            </div>
            <p>
              <Balancer>{testimonial.review}</Balancer>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
