"use client";

import { cn } from "@/lib/utils";
import  Link  from "next/link";
import { useParams, usePathname } from "next/navigation";


export function MainNav( {
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
   const pathname = usePathname();
   const params = useParams();

   const currentStoreId = (params as Record<string, string | string[] | undefined>).storeId ?? (params as Record<string, string | string[] | undefined>).storeld;
   const storeIdString = Array.isArray(currentStoreId) ? currentStoreId[0] : currentStoreId;

    const routes = [
        {
            href: `/${params.storeId}`,
            label: 'Overview', 
            active: pathname === `/${params.storeId}`,
        },
        {
            href: `/${storeIdString}/billboards`,
            label: 'Billboards', 
            active: pathname === `/${storeIdString}/billboards` 
        },
    
        {
            href: `/${storeIdString}/settings`,
            label: 'Settings', 
            active: pathname === `/${storeIdString}/settings` 
        },     
    ];

    return (
        <nav
           className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        >
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    route.active ?"text-black dark:text-white" : "text-muted-foreground"
                  )}
                  >
                    {route.label}
                  </Link>
                ))}
        </nav>
    );
}


 