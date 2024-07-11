import InstructorCard from "@/components/InstructorCard";
import { instructors } from "@/data/instructors";

export function InstructorSection() {
     return (<>
          <div className="flex flex-col gap-2 mx-auto container xl:p-0 px-4">
               <div className="flex-1">
                    <h3 className="text-2xl font-bold">Bizning o&apos;qituvchilar</h3>
               </div>
               <div className="grid lg:grid-cols-4 grid-cols-2 gap-6">
                    {
                         instructors.map((instructor, index) => (
                              <InstructorCard instructor={instructor} key={index} />
                         ))
                    }
               </div>
          </div>
     </>)
}