import Edit from "../Edit";

const EditInvoicePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <Edit id={id} />;
};

export default EditInvoicePage;
