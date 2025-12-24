// "use client";
import { HistoryDetailContent } from "./history-detail-context";

export default async function HistoryDetailPage() {
  const id = "gen-001";
  console.log(id);
  return <HistoryDetailContent id={id} />;
}
