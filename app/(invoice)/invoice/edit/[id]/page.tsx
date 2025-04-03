import Edit from "../Edit";

interface PageParams {
  id: string;
}

const EditInvoicePage = async ({ params }: { params: PageParams }) => {
  const { id } = params;

  return <Edit id={id} />;
};

export default EditInvoicePage;
