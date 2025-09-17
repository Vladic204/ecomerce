import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server"; 
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps {
  params: Promise<{
    storeId?: string;
    storeld?: string;
  }>;
}

const SettingsPage = async ({ params: routeParams }: SettingsPageProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { storeId, storeld } = await routeParams;
  const effectiveStoreId = storeId ?? storeld ?? "";

  const store = await prismadb.store.findFirst({
    where: {
      id: effectiveStoreId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
         <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;



