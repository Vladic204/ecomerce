import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server"; 
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps {
<<<<<<< HEAD
  params: Promise<{
    storeId?: string;
    storeld?: string;
  }>;
}

const SettingsPage = async ({ params: routeParams }: SettingsPageProps) => {
=======
  params: {
    storeId: string;
  };
}

const SettingsPage = async ({ params }: SettingsPageProps) => {
>>>>>>> 479b092133dd5842f4e4fa8aa75d6dcd84931ae6
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

<<<<<<< HEAD
  const { storeId, storeld } = await routeParams;
  const effectiveStoreId = storeId ?? storeld ?? "";

  const store = await prismadb.store.findFirst({
    where: {
      id: effectiveStoreId,
=======
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
>>>>>>> 479b092133dd5842f4e4fa8aa75d6dcd84931ae6
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
<<<<<<< HEAD



=======
>>>>>>> 479b092133dd5842f4e4fa8aa75d6dcd84931ae6
