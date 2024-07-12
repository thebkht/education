export default function Index({ children }: { children: React.ReactNode }) {
     return (
          <>
               <div className="flex rounded-[4px] py-2.5 px-3 text-primary bg-primary/10 text-sm">{children}</div>
          </>
     )
}