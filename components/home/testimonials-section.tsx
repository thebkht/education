import TestimonialCard from "@/components/TestimonialCard";
import TestimonialForm from "@/components/TestimonialForm";
import { testimonials } from "@/data/testimonials";

export function TestimonialSection() {
     return (
          <>
               <div className="flex flex-col gap-2 mx-auto container xl:p-0 px-4">
                    <div className="flex-1">
                         <h3 className="text-2xl font-bold text-second">Kurslar haqida fikr-mulohaza</h3>
                    </div>
                    <div className="flex flex-col items-center gap-6">
                         <div className="flex lg:flex-row flex-col flex-wrap gap-3 items-stretch lg:justify-normal lg:w-fit w-full justify-stretch">
                              {
                                   testimonials.map((testimonial, index) => (
                                        <TestimonialCard key={index} testimonial={testimonial} />
                                   ))
                              }
                         </div>
                         <TestimonialForm />
                    </div>
               </div>
          </>
     )
}