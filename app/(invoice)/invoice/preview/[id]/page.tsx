import { Invoice } from "../Invoice";

export default async function PreviewInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  return <Invoice id={id} />;
}
