import Edit from "../Edit";

interface PageProps {
  id: string;
}

const EditInvoicePage = async ({ params }: { params: PageProps }) => {
  const { id } = params;

  return <Edit id={id} />;
};

export default EditInvoicePage;
