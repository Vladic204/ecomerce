import prismadb from "@/lib/prismadb";

const BillboardPage = async ({
  params,
}: {
  params: { storeId: string; billboardId: string };
}) => {
  console.log("PARAMS:", params); // vezi exact ce vine din URL

  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  if (!billboard) {
    return <div>Billboard not found</div>;
  }

  return (
    <div>
      <h1>Existing Billboard: {billboard.label}</h1>
      <pre>{JSON.stringify(billboard, null, 2)}</pre>
    </div>
  );
};

export default BillboardPage;
