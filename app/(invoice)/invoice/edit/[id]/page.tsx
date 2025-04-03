import Edit from "../Edit";

const EditInvoicePage = async ({ params }: { params: { id?: string } }) => {
  const id = params.id;

  return <Edit id={id} />;
};

export default EditInvoicePage;
