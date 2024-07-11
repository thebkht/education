import { useState } from "react"
import { Icons } from "@/components/icons"
import Button from "@/components/UI/Button"

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
                              <textarea id="review" className="md:w-96 w-64 min-h-28 py-3 px-3.5 border border-input rounded-lg text-sm text-second" name="review" placeholder="Mening fikrim!!" />
                         </div>
                    </div>
                    <Button size={'lg'} className="w-full shadow-sm">Fikr-mulohaza yuboring</Button>
               </div>
          </>
     )
}