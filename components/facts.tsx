import Balancer from "react-wrap-balancer";

export function Facts() {
     return (
          <>
               <div className="container flex justify-between mx-auto">
                    <h1 className="text-2xl font-semibold text-second w-[296px]">
                         <Balancer>
                              Istalgan joyda, o&apos;zingizga qulay vaqtda o&apos;qish imkoniyati
                         </Balancer>
                    </h1>
                    <div className="flex justify-between flex-col w-44">
                         <p className="text-3xl font-bold text-primary">
                              5 000+
                         </p>
                         <span className="text-muted-foreground">
                              <Balancer>
                                   Malaka oshirgan tinglovchilar
                              </Balancer>
                         </span>
                    </div>
                    <div className="flex justify-between flex-col w-44">
                         <p className="text-3xl font-bold text-primary">
                              50+
                         </p>
                         <span className="text-muted-foreground">
                              <Balancer>
                                   Malaka oshirish kurslari
                              </Balancer>
                         </span>
                    </div>
                    <div className="flex justify-between flex-col w-44">
                         <p className="text-3xl font-bold text-primary">
                              30+
                         </p>
                         <span className="text-muted-foreground">
                              <Balancer>
                                   Uzoq yillik tajribaga ega ustozlarimiz
                              </Balancer>
                         </span>
                    </div>
               </div>
          </>
     )
}