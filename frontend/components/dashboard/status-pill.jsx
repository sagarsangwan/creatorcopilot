import { cn } from "@/lib/utils";

const statusStyles = {
  SUCCESS: "bg-emerald-50 text-emerald-700 border-emerald-200",
  FAILED: "bg-red-50 text-red-700 border-red-200",
  PROCESSING: "bg-amber-50 text-amber-700 border-amber-200",
  DRAFT: "bg-slate-50 text-slate-600 border-slate-200",
  INFO: "bg-sky-50 text-sky-700 border-sky-200",
  UPLOADING: "bg-blue-50 text-blue-700 border-blue-200",
};

export function StatusPill({ status, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border",
        statusStyles[status] || statusStyles.INFO,
        className
      )}
    >
      {status}
    </span>
  );
}
