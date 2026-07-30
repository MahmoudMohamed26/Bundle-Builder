import { Truck } from "lucide-react";
import { toast } from "sonner";
import Seperator from "../global/seperator";
import ReviewItem from "./review-item";
import { Button } from "../ui/button";
import useBundleStore from "../../store/bundle-store";
import cameras from "../../data/cameras-data";
import sensors from "../../data/sensors-data";
import accessories from "../../data/accessories-data";
import plans from "../../data/plans-data";
import badge from "../../assets/badge.png";

function discountedValue(price: number, discount: number) {
  return price - (discount / 100) * price;
}

function ReviewSidebar() {
  const store = useBundleStore();

  const hasSelection =
    store.cameras.length > 0 ||
    store.sensors.length > 0 ||
    store.accessories.length > 0 ||
    store.plan !== null;

  const selectedCameraVariations = store.cameras
    .map((sel) => {
      const cam = cameras.find((c) => c.id === sel.cameraId);
      if (!cam) return null;
      const variation = cam.variations.find((v) => v.id === sel.variationId);
      if (!variation) return null;
      return {
        ...variation,
        camId: cam.id,
        camTitle: cam.title,
        camDiscount: cam.discount,
        camPrice: cam.price,
        camImage: cam.image,
        qty: sel.quantity,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item != null);

  const selectedSensors = store.sensors
    .map((sel) => {
      const s = sensors.find((s) => s.id === sel.sensorId);
      return s ? { ...s, qty: sel.quantity } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item != null);

  const selectedAccessories = store.accessories
    .map((sel) => {
      const a = accessories.find((a) => a.id === sel.accessoryId);
      return a ? { ...a, qty: sel.quantity } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item != null);

  const totalOriginal = (() => {
    let sum = 0;
    for (const v of selectedCameraVariations) sum += v.qty * v.camPrice;
    for (const s of selectedSensors) sum += s.qty * s.price;
    for (const a of selectedAccessories) sum += a.qty * a.price;
    return sum;
  })();

  const totalDiscounted = (() => {
    let sum = 0;
    for (const v of selectedCameraVariations)
      sum += v.qty * discountedValue(v.camPrice, v.camDiscount);
    for (const s of selectedSensors)
      sum += s.qty * discountedValue(s.price, s.discount);
    for (const a of selectedAccessories)
      sum += a.qty * discountedValue(a.price, a.discount);
    return sum;
  })();

  const savings = totalOriginal - totalDiscounted;
  const installment = totalDiscounted / 12;

  if (!hasSelection) return null;

  return (
    <div className="bg-secondary py-3 px-4 xl:rounded-lg">
      <span className="uppercase tracking-wider text-xs text-text-primary font-semibold">
        review
      </span>
      <h2 className="text-[22px] font-semibold mt-4">Your security system</h2>
      <p className="mt-2 text-sm text-text-primary max-w-xs">
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>

      {selectedCameraVariations.length > 0 && (
        <>
          <Seperator />
          <h6 className="uppercase text-[12px] text-[#A8B2BD]">cameras</h6>
          <div className="mt-2 space-y-4">
            {selectedCameraVariations.map((v) => (
              <ReviewItem
                key={`${v.camId}-${v.id}`}
                imageSrc={v.color?.image.url || v.camImage.url}
                title={v.camTitle}
                qty={v.qty}
                max={v.quantity}
                price={v.camPrice}
                discount={v.camDiscount}
                onMinus={() =>
                  store.setCameraVariationQty(v.camId, v.id, v.qty - 1)
                }
                onPlus={() =>
                  store.setCameraVariationQty(v.camId, v.id, v.qty + 1)
                }
              />
            ))}
          </div>
        </>
      )}

      {selectedSensors.length > 0 && (
        <>
          <Seperator />
          <h6 className="uppercase text-[12px] text-[#A8B2BD]">
            sensors & modules
          </h6>
          <div className="mt-2 space-y-4">
            {selectedSensors.map((s) => (
              <ReviewItem
                key={s.id}
                imageSrc={s.image.url}
                title={s.title}
                qty={s.qty}
                max={s.quantity}
                price={s.price}
                discount={s.discount}
                imageSize={28}
                onMinus={() => store.setSensorQty(s.id, s.qty - 1)}
                onPlus={() => store.setSensorQty(s.id, s.qty + 1)}
              />
            ))}
          </div>
        </>
      )}

      {selectedAccessories.length > 0 && (
        <>
          <Seperator />
          <h6 className="uppercase text-[12px] text-[#A8B2BD]">
            accessories
          </h6>
          <div className="mt-2 space-y-4">
            {selectedAccessories.map((a) => (
              <ReviewItem
                key={a.id}
                imageSrc={a.image.url}
                title={a.title}
                qty={a.qty}
                max={a.quantity}
                price={a.price}
                discount={a.discount}
                imageSize={28}
                onMinus={() => store.setAccessoryQty(a.id, a.qty - 1)}
                onPlus={() => store.setAccessoryQty(a.id, a.qty + 1)}
              />
            ))}
          </div>
        </>
      )}

      {store.plan !== null &&
        (() => {
          const plan = plans.find((p) => p.id === store.plan);
          if (!plan) return null;
          return (
            <>
              <Seperator />
              <h6 className="uppercase text-[12px] text-[#A8B2BD]">plan</h6>
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <h6 className="text-sm">{plan.title}</h6>
                  <div className="flex text-[16px] flex-col justify-center items-center">
                    {plan.price === 0 ? (
                      <span className="text-primary text-[14px] font-semibold">
                        Free
                      </span>
                    ) : (
                      <>
                        <div
                          className={`relative text-[14px] font-semibold w-fit ${
                            plan.discount !== 0
                              ? "text-text-primary"
                              : "text-primary"
                          }`}
                        >
                          $ {plan.price.toFixed(2)}
                          {plan.discount !== 0 && (
                            <div className="absolute top-1/2 w-full h-px bg-text-primary -translate-y-1/2"></div>
                          )}
                        </div>
                        {plan.discount !== 0 && (
                          <div className="text-primary text-[14px] font-semibold">
                            $ {(plan.price - (plan.discount / 100) * plan.price).toFixed(2)}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        })()}

      <Seperator />
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-white rounded-sm w-fit">
            <Truck size={25} className="text-[#0aa288]" />
          </div>
          <p className="text-[14px] font-semibold">Fast Shipping</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative text-text-primary text-[14px] font-semibold">
            <span>$5.99</span>
            <div className="absolute top-1/2 w-full h-px bg-text-primary -translate-y-1/2"></div>
          </div>
          <div className="text-primary uppercase text-[14px] font-semibold">
            free
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-between items-center gap-2">
        <img
          src={badge}
          alt="badge"
          loading="lazy"
          className="object-contain w-[100px]"
        />
        <div className="flex flex-col gap-2 items-end">
          <p className="rounded-sm bg-primary px-2 font-semibold py-1 text-xs text-white">
            as low as ${installment.toFixed(2)}/mo
          </p>
          <div className="flex gap-2 items-end">
            <div className="relative text-text-primary text-lg font-semibold">
              <span>${totalOriginal.toFixed(2)}</span>
              <div className="absolute top-1/2 w-full h-px bg-text-primary -translate-y-1/2"></div>
            </div>
            <p className="font-bold text-primary text-2xl">
              ${totalDiscounted.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      {savings > 0 && (
        <p className="mt-4 text-green-600 text-center font-semibold text-xs">
          Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
        </p>
      )}
      <Button className="w-full mt-2 h-[48px] text-[17px] font-semibold rounded-sm">
        Checkout
      </Button>
      <button
        onClick={() => {
          store.saveForLater();
          toast.success("Bundle saved for later!");
        }}
        className="underline mx-auto block text-text-primary cursor-pointer text-sm italic mt-1 text-center"
      >
        Save my bundle for later
      </button>
    </div>
  );
}

export default ReviewSidebar;
