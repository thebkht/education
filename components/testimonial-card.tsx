import Image from "next/image";
import Link from "next/link";
import { Icons } from "./icons";
import Balancer from "react-wrap-balancer";

export function TestimonialCard({ testimonial, ...props }: { testimonial: any } & React.ComponentPropsWithoutRef<"div">) {
     return (
          <>
               <div className="flex flex-1 p-6 bg-background border border-border gap-6 rounded-[20px] self-stretch">
                    <Image className="h-14 w-14 rounded-full object-cover aspect-square" alt={testimonial.name} src={testimonial.image} width={56} height={56} />
                    <div className="flex flex-col gap-2">
                         <div className="flex flex-col gap-2">
                              <p className="text-primary font-bold text-xl">{testimonial.name}</p>
                              <div className="flex gap-1">
                                   {
                                        Array.from({ length: 5 }).map((_, index) => (
                                             index < testimonial.rate ? (
                                                  <Icons.starFilled className="h-5 w-5" key={`filled_${index}`} />
                                             ) : (
                                                  <Icons.star className="h-5 w-5" key={`empty_${index}`} />
                                             )
                                        ))
                                   }
                              </div>
                              <p>
                                   <Balancer>{testimonial.review}</Balancer>
                              </p>
                         </div>
                    </div>
               </div>
          </>
     )
}