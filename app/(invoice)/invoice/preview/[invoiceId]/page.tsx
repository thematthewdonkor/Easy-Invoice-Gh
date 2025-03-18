import { Invoice } from "../Invoice";

export default async function Page({
  params,
}: {
  params: { invoiceId: string };
}) {
  const invoiceId = await params.invoiceId;

  return <Invoice invoiceId={invoiceId} />;
}
