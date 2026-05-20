export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";
export const renderStatusBadge = (status: StockStatus) => {
  const styles = {
    "In Stock": "bg-[#EBF7EE] text-[#1E7E34]",
    "Low Stock": "bg-[#FFF4E5] text-[#B76E00]",
    "Out of Stock": "bg-[#FCE8E6] text-[#C53030]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${status === "In Stock" ? "bg-[#1E7E34]" : status === "Low Stock" ? "bg-[#B76E00]" : "bg-[#C53030]"}`}
      />
      {status}
    </span>
  );
};
