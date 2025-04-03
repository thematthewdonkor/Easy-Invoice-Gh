import Edit from "../Edit";

const EditInvoicePage = async ({
  params,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { id } = params;

  return <Edit id={id} />;
};

export default EditInvoicePage;
