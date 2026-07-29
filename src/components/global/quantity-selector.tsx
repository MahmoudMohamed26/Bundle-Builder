import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  qty,
  max,
  onMinus,
  onPlus,
  variant = "gray",
}: {
  qty: number;
  max: number;
  onMinus: () => void;
  onPlus: () => void;
  variant?: "gray" | "white";
}) {
  const btnClass =
    variant === "white"
      ? "border-3 border-white disabled:opacity-50! disabled:cursor-not-allowed disabled:bg-transparent! bg-white rounded-xs cursor-pointer"
      : "border-3 border-[#f1f5f7] p-[2px] disabled:opacity-50! disabled:cursor-not-allowed disabled:bg-transparent! bg-[#f1f5f7] rounded-xs cursor-pointer";
  return (
    <div className="flex gap-3 items-end text-text-primary">
      <button disabled={qty === 0} onClick={onMinus} className={btnClass}>
        <Minus size={12} />
      </button>
      <span className="font-bold text-[16px] min-w-[20px] flex justify-center">{qty}</span>
      <button disabled={qty >= max} onClick={onPlus} className={btnClass}>
        <Plus size={12} />
      </button>
    </div>
  );
}
