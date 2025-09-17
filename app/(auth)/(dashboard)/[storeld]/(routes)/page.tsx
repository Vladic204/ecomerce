import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: Promise<{ storeId?: string; storeld?: string }>;
}

const DashboardPage = async ({ params: routeParams }: DashboardPageProps) => {
  const { storeId: pStoreId, storeld } = await routeParams;
  const storeId = pStoreId ?? storeld ?? "";
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
    },
  });

  return (
    <div>
      Active Store: {store?.name}
    </div>
  );
};

export default DashboardPage;
