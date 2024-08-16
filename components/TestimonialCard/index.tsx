import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/components/icons";
import Balancer from "react-wrap-balancer";
import { Feedback } from "@/lib/types";

export default function Index({
  testimonial,
  ...props
}: {
  testimonial: Feedback;
} & React.ComponentPropsWithoutRef<"div">) {
  return (
    <>
      <div className="flex flex-1 gap-6 self-stretch rounded-[20px] border border-border bg-background p-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold text-primary">
              {testimonial.full_name}
            </p>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) =>
                index < testimonial.rating ? (
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
              <Balancer>{testimonial.feedback_text}</Balancer>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
