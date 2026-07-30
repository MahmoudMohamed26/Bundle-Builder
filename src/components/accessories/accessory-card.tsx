import { Link } from "react-router";
import type { AccessoryType } from "../../lib/types/accessory";
import useBundleStore from "../../store/bundle-store";
import QuantitySelector from "../global/quantity-selector";

export default function AccessoryCard({
  accessory,
}: {
  accessory: AccessoryType;
}) {
  const storeAccessories = useBundleStore((s) => s.accessories);
  const setAccessoryQty = useBundleStore((s) => s.setAccessoryQty);
  const sel = storeAccessories.find(
    (a) => a.accessoryId === accessory.id,
  );
  const qty = sel?.quantity ?? 0;

  return (
    <div
      className={`bg-white relative h-full py-2 px-5 flex flex-col lg:flex-row gap-2 items-center rounded-[10px] border-2 ${qty > 0 ? "border-primary" : "border-white"}`}
    >
      {accessory.discount !== 0 && (
        <div className="absolute start-2 top-2 rounded-full text-white bg-primary px-2 py-[2px] text-xs">
          Save <span className="font-semibold">%{accessory.discount}</span>
        </div>
      )}
      <img
        src={accessory.image.url}
        alt={accessory.title}
        width={101}
        loading="lazy"
        className="object-contain"
      />
      <div className="flex-1">
        <h2 className="text-[16px] font-semibold">{accessory.title}</h2>
        <p className="text-text-primary text-sm mb-3!">
          {accessory.description}{" "}
           <Link to={`/products/${accessory.id}`} className="text-blue-600 underline text-sm">Learn More</Link>
        </p>
        <div className="flex justify-between items-center gap-2">
          <div className="mt-3">
            <QuantitySelector
              qty={qty}
              max={accessory.quantity}
              onMinus={() => setAccessoryQty(accessory.id, qty - 1)}
              onPlus={() => setAccessoryQty(accessory.id, qty + 1)}
            />
          </div>
          <div className="flex text-[16px] flex-col mt-4 justify-center items-center">
            <div
              className={`relative w-fit ${accessory.discount !== 0 ? "text-red-600" : "text-text-primary"}`}
            >
              $ {accessory.price}
              {accessory.discount !== 0 && (
                <div className="absolute top-1/2 w-full h-px bg-red-500 -translate-y-1/2"></div>
              )}
            </div>
            {accessory.discount !== 0 && (
              <div className="text-text-primary">
                ${" "}
                {(
                  accessory.price -
                  (accessory.discount / 100) * accessory.price
                ).toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
