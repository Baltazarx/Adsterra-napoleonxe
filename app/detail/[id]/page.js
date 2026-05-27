import DetailClient from "./DetailClient";

export const runtime = "edge";

export default async function DetailPage({ params }) {
  const { id } = await params;
  return <DetailClient id={id} />;
}
