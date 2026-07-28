import type { PlanType } from "../../lib/types/plan";

export default function PlanCard({
  plan,
  selected,
}: {
  plan: PlanType;
  selected?: boolean;
}) {
  return (
    <div
      className={`relative rounded-[10px] border-2 p-5 text-center transition-all cursor-pointer
        ${selected ? "border-primary bg-primary/5" : "border-white bg-white hover:border-gray-300"}`}
    >
      {plan.discount !== 0 && (
        <div className="absolute -top-2.5 start-1/2 -translate-x-1/2 rounded-full text-white bg-primary px-3 py-[2px] text-xs whitespace-nowrap">
          Save {plan.discount}%
        </div>
      )}
      <div className="flex flex-col justify-between h-full">
        <div>
          <h3 className="text-lg font-semibold">{plan.title}</h3>
          <div className="mt-2">
            {plan.price === 0 ? (
              <span className="text-2xl font-bold">Free</span>
            ) : (
              <>
                <div
                  className={`relative w-fit mx-auto ${plan.discount !== 0 ? "text-red-600 text-sm line-through" : "text-2xl font-bold"}`}
                >
                  $ {plan.price.toFixed(2)}
                </div>
                {plan.discount !== 0 && (
                  <div className="text-2xl font-bold">
                    ${" "}
                    {(plan.price - (plan.discount / 100) * plan.price).toFixed(
                      2,
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          <p className="text-xs text-text-primary mt-1">per month</p>
        </div>
        <button
          className={`mt-3 w-full rounded-xs py-1.5 text-sm font-medium transition-all
          ${selected ? "bg-primary text-white" : "bg-secondary text-text-primary hover:bg-primary hover:text-white"}`}
        >
          {selected ? "Selected" : "Select"}
        </button>
      </div>
    </div>
  );
}
