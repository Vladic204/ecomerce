import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

export default async function DashboardLayout({
children,
params,
}: {
children: React.ReactNode;
params: { storeld: string }
}) {
const { userId } = await auth();

if (!userId) {
 redirect("/sign-in");
}

const store = await prismadb.store.findFirst({
 where: {
   id: params.storeld,
   userId,
 },
});

if (!store) {
 redirect("/");
}

return (
 <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
   <div>This will be a Navbar</div>
   <div style={{ width: "100%" }}>
     {children}
   </div>
 </div>
);
}

