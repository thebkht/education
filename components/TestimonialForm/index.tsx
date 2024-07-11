import { useState } from "react"
import { Icons } from "@/components/icons"

export default function Index() {
     const [rate, setRate] = useState<number>(0)
     return (
          <>
               <div className="flex flex-col items-center gap-6 p-6 rounded-[20px] border border-input w-fit">
                    <div className="flex flex-col gap-8 items-center">
                         <div className="flex flex-col gap-5">
                              <div className="flex flex-col gap-2.5">
                                   <h4 className="text-sm text-center text-second">
                                        Kurslarni quyida baholang
                                   </h4>
                              </div>
                              <div className="flex gap-9">
                                   <div className="flex gap-5">
                                        {
                                             Array.from({ length: 5 }).map((_, index) => (
                                                  <button key={index} onClick={() => setRate(index + 1)} className={`w-6 h-66`} >
                                                       {
                                                            index < rate ? (
                                                                 <Icons.starFilled className="w-6 h-6" />
                                                            ) : (
                                                                 <Icons.star className="w-6 h-6" />
                                                            )
                                                       }
                                                  </button>
                                             ))

                                        }
                                   </div>
                                   <span className="text-muted-foreground text-sm">
                                        {rate} / 5
                                   </span>
                              </div>
                         </div>
                         <div className="flex flex-col gap-1">
                              <label htmlFor="review" className="text-sm text-muted-foreground pl-3.5">
                                   Qo&apos;shimcha fikr-mulohaza
                              </label>
                              <textarea id="review" className="w-96 min-h-28 py-3 px-3.5 border border-input rounded-lg text-sm text-second" name="review" placeholder="Mening fikrim!!" />
                         </div>
                    </div>
                    <button className="bg-primary w-full border shadow-sm border-primary text-primary-foreground px-4 py-2.5  font-semibold rounded-lg leading-6">Fikr-mulohaza yuboring</button>
               </div>
          </>
     )
}