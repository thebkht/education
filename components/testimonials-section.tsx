import { TestimonialCard } from "./testimonial-card";
import { TestimonialForm } from "./testimonial-form";
import { testimonials } from "./testimonials";

export function TestimonialSection() {
     return (
          <>
               <div className="flex flex-col gap-2 mx-auto container">
                    <div className="flex-1">
                         <h3 className="text-2xl font-bold text-second">Kurslar haqida fikr-mulohaza</h3>
                    </div>
                    <div className="flex flex-col items-center gap-6">
                         <div className="flex gap-3 items-stretch">
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