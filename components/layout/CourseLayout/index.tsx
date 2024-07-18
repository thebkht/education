import Sidebar from '@/components/layout/SideMenu';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.css';
import { cn } from '@/lib/utils';
import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });

export default function Index({ children, className }: { children: React.ReactNode, className?: string }) {
     const [collapsed, setCollapsed] = React.useState<boolean>(false);

     return (
          <>
               <div className={cn(styles.main, collapsed && styles.collapsed, inter.className)}>
                    <div className="flex z-50">
                         <div className={`flex-[1_1_1px] ${collapsed ? "w-[72px]" : "w-[250px]"} h-14 px-4 justify-center flex flex-col fixed z-50 border-r border-border box-border`}>
                              <Link href="/courses" className={"cursor-pointer relative flex select-none border-none rounded-lg"}>
                                   <Image src={collapsed ? "/favicon.ico" : "/logo.png"} alt="Logo" width={collapsed ? 45 : 141} height={45} className='transition-all duration-300 ease-in-out' />
                              </Link>
                         </div>
                    </div>
                    <Header collapsed={collapsed} onCollapse={setCollapsed} />
                    <Sidebar collapsed={collapsed} />
                    <main className="flex relative justify-center z-0 min-h-0 flex-[1_0_auto] bg-accent">
                         <div className="flex w-full flex-[1_0_auto]">
                              <div className="flex flex-1">
                                   <div className="flex justify-center flex-[1_0_1px] overflow-x-auto">
                                        <div className="flex flex-1">
                                             <div className={cn("flex flex-1 justify-center", className)}>
                                                  <div className="flex flex-col py-4 px-6 w-full">
                                                       {children}
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </main>
               </div>
          </>
     )
}