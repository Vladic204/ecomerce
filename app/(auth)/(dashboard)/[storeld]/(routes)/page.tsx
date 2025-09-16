import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: { storeId?: string; storeld?: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const storeId = params.storeId;
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
