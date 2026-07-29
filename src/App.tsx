import { useState } from "react";
import { Cable, Camera, MemoryStick, Shield } from "lucide-react";
import "./App.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import cameras from "./data/cameras-data";
import sensors from "./data/sensors-data";
import accessories from "./data/accessories-data";
import plans from "./data/plans-data";
import CameraCard from "./components/cameras/camera-card";
import SensorCard from "./components/sensors/sensor-card";
import AccessoryCard from "./components/accessories/accessory-card";
import PlanCard from "./components/plans/plan-card";
import { Button } from "./components/ui/button";
import Seperator from "./components/global/seperator";
import QuantitySelector from "./components/global/quantity-selector";
import useBundleStore from "./store/bundle-store";

function App() {
  const [open, setOpen] = useState<Record<string, string[]>>({
    cameras: ["cameras"],
    sensors: [],
    accessories: [],
    plans: [],
  });

  const store = useBundleStore();

  const hasSelection =
    Object.values(store.cameraVariations).some((v) => v > 0) ||
    Object.values(store.sensors).some((v) => v > 0) ||
    Object.values(store.accessories).some((v) => v > 0) ||
    store.plan !== null;

  const handleNext = (current: string, next: string) => {
    setOpen((prev) => ({ ...prev, [current]: [], [next]: [next] }));
  };

  const selectedCameraVariations = store.cameraVariationOrder
    .map((key) => {
      const [cid, vid] = key.split("-").map(Number);
      const cam = cameras.find((c) => c.id === cid);
      if (!cam) return null;
      const variation = cam.variations.find((v) => v.id === vid);
      if (!variation) return null;
      return {
        ...variation,
        camId: cam.id,
        camTitle: cam.title,
        camDiscount: cam.discount,
        camPrice: cam.price,
        camImage: cam.image,
        qty: store.cameraVariations[key] || 0,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item != null);

  const selectedSensors = store.sensorOrder
    .map((id) => sensors.find((s) => s.id === id))
    .filter((item): item is NonNullable<typeof item> => item != null);

  const selectedAccessories = store.accessoryOrder
    .map((id) => accessories.find((a) => a.id === id))
    .filter((item): item is NonNullable<typeof item> => item != null);

  const discountPrice = (price: number, discount: number) =>
    (price - (discount / 100) * price).toFixed(2);

  return (
    <div className="container py-10! grid xl:grid-cols-3 items-start gap-10">
      <div className="lg:col-span-2">
        <div className="space-y-3">
          <Accordion
            step={1}
            total={4}
            value={open.cameras}
            onValueChange={(val) =>
              setOpen((prev) => ({ ...prev, cameras: val }))
            }
          >
            <AccordionItem value="cameras">
              <AccordionTrigger className="py-3 text-md sm:text-xl font-medium">
                <div className="flex gap-2 items-center">
                  <Camera className="text-text-primary" />
                  Choose your cameras
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {cameras.map((cam, i) => {
                    const lastOdd =
                      cameras.length % 2 !== 0 && i === cameras.length - 1;
                    return (
                      <div
                        key={cam.id}
                        className={
                          lastOdd
                            ? "sm:col-span-2 xl:max-w-[500px] 2xl:max-w-[379px] m-auto flex justify-center"
                            : ""
                        }
                      >
                        <CameraCard cam={cam} />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-5 justify-center flex">
                  <Button
                    variant="outline"
                    className="text-lg font-bold"
                    onClick={() => handleNext("cameras", "sensors")}
                  >
                    Next: Choose your plan
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            step={2}
            total={4}
            value={open.sensors}
            onValueChange={(val) =>
              setOpen((prev) => ({ ...prev, sensors: val }))
            }
          >
            <AccordionItem value="sensors">
              <AccordionTrigger className="py-3 text-md sm:text-xl font-medium">
                <div className="flex gap-2 items-center">
                  <MemoryStick className="text-text-primary" />
                  Choose your sensors & modules
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {sensors.map((sensor, i) => {
                    const lastOdd =
                      sensors.length % 2 !== 0 && i === sensors.length - 1;
                    return (
                      <div
                        key={sensor.id}
                        className={
                          lastOdd
                            ? "sm:col-span-2 xl:max-w-[500px] 2xl:max-w-[379px] m-auto flex justify-center"
                            : ""
                        }
                      >
                        <SensorCard sensor={sensor} />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-5 justify-center flex">
                  <Button
                    variant="outline"
                    className="text-lg font-bold"
                    onClick={() => handleNext("sensors", "accessories")}
                  >
                    Next: Choose your plan
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            step={3}
            total={4}
            value={open.accessories}
            onValueChange={(val) =>
              setOpen((prev) => ({ ...prev, accessories: val }))
            }
          >
            <AccordionItem value="accessories">
              <AccordionTrigger className="py-3 text-md sm:text-xl font-medium">
                <div className="flex gap-2 items-center">
                  <Cable className="text-text-primary" />
                  Choose your accessories
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {accessories.map((accessory, i) => {
                    const lastOdd =
                      accessories.length % 2 !== 0 &&
                      i === accessories.length - 1;
                    return (
                      <div
                        key={accessory.id}
                        className={
                          lastOdd
                            ? "sm:col-span-2 xl:max-w-[500px] 2xl:max-w-[379px] m-auto flex justify-center"
                            : ""
                        }
                      >
                        <AccessoryCard accessory={accessory} />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-5 justify-center flex">
                  <Button
                    variant="outline"
                    className="text-lg font-bold"
                    onClick={() => handleNext("accessories", "plans")}
                  >
                    Next: Choose your plan
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            step={4}
            total={4}
            value={open.plans}
            onValueChange={(val) =>
              setOpen((prev) => ({ ...prev, plans: val }))
            }
          >
            <AccordionItem value="plans">
              <AccordionTrigger className="py-3 text-md sm:text-xl font-medium">
                <div className="flex gap-2 items-center">
                  <Shield className="text-text-primary" />
                  Choose your plan
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid sm:grid-cols-3 gap-3 py-3">
                  {plans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      {hasSelection && (
        <div className="bg-secondary py-3 px-4 rounded-lg">
          <span className="uppercase tracking-wider text-xs text-text-primary font-semibold">
            review
          </span>
          <h2 className="text-[22px] font-semibold mt-4">
            Your security system
          </h2>
          <p className="mt-2 text-sm text-text-primary max-w-xs">
            Review your personalized protection system designed to keep what
            matters most safe.
          </p>

          {selectedCameraVariations.length > 0 && (
            <>
              <Seperator />
              <h6 className="uppercase text-[12px] text-[#A8B2BD]">
                cameras
              </h6>
              <div className="mt-2 space-y-4">
                {selectedCameraVariations.map((v) => (
                  <div
                    key={`${v.camId}-${v.id}`}
                    className="flex justify-between items-center"
                  >
                    <div className="flex gap-2 items-center">
                      <div className="p-1 bg-white rounded-sm">
                        <img
                          src={
                            v.color?.image.url || v.camImage.url
                          }
                          alt={v.camTitle}
                          width={32}
                          loading="lazy"
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h6 className="text-sm max-w-[150px]">{v.camTitle}</h6>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <QuantitySelector
                        variant="white"
                        qty={v.qty}
                        max={v.quantity}
                        onMinus={() =>
                          store.setCameraVariationQty(
                            v.camId,
                            v.id,
                            v.qty - 1,
                          )
                        }
                        onPlus={() =>
                          store.setCameraVariationQty(
                            v.camId,
                            v.id,
                            v.qty + 1,
                          )
                        }
                      />
                      <div className="flex text-[16px] flex-col justify-center items-center">
                        <div
                          className={`relative text-[14px] font-semibold w-fit ${
                            v.camDiscount !== 0
                              ? "text-text-primary"
                              : "text-primary"
                          }`}
                        >
                          $ {v.camPrice.toFixed(2)}
                          {v.camDiscount !== 0 && (
                            <div className="absolute top-1/2 w-full h-px bg-text-primary -translate-y-1/2"></div>
                          )}
                        </div>
                        {v.camDiscount !== 0 && (
                          <div className="text-primary text-[14px] font-semibold">
                            ${" "}
                            {discountPrice(
                              v.camPrice,
                              v.camDiscount,
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
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
                {selectedSensors.map((s) => {
                  const qty = store.sensors[s.id] || 0;
                  return (
                    <div
                      key={s.id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex gap-2 items-center">
                        <div className="p-1 bg-white rounded-sm">
                          <img
                            src={s.image.url}
                            alt={s.title}
                            width={28}
                            loading="lazy"
                            className="object-contain"
                          />
                        </div>
                        <h6 className="text-sm max-w-[150px]">{s.title}</h6>
                      </div>
                      <div className="flex gap-4 items-center">
                        <QuantitySelector
                          variant="white"
                          qty={qty}
                          max={s.quantity}
                          onMinus={() =>
                            store.setSensorQty(s.id, qty - 1)
                          }
                          onPlus={() =>
                            store.setSensorQty(s.id, qty + 1)
                          }
                        />
                        <div className="flex text-[16px] flex-col justify-center items-center">
                          <div
                            className={`relative text-[14px] font-semibold w-fit ${
                              s.discount !== 0
                                ? "text-text-primary"
                                : "text-primary"
                            }`}
                          >
                            $ {s.price.toFixed(2)}
                            {s.discount !== 0 && (
                              <div className="absolute top-1/2 w-full h-px bg-text-primary -translate-y-1/2"></div>
                            )}
                          </div>
                          {s.discount !== 0 && (
                            <div className="text-primary text-[14px] font-semibold">
                              ${" "}
                              {discountPrice(s.price, s.discount)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                {selectedAccessories.map((a) => {
                  const qty = store.accessories[a.id] || 0;
                  return (
                    <div
                      key={a.id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex gap-2 items-center">
                        <div className="p-1 bg-white rounded-sm">
                          <img
                            src={a.image.url}
                            alt={a.title}
                            width={28}
                            loading="lazy"
                            className="object-contain"
                          />
                        </div>
                        <h6 className="text-sm max-w-[150px]">{a.title}</h6>
                      </div>
                      <div className="flex gap-4 items-center">
                        <QuantitySelector
                          variant="white"
                          qty={qty}
                          max={a.quantity}
                          onMinus={() =>
                            store.setAccessoryQty(a.id, qty - 1)
                          }
                          onPlus={() =>
                            store.setAccessoryQty(a.id, qty + 1)
                          }
                        />
                        <div className="flex text-[16px] flex-col justify-center items-center">
                          <div
                            className={`relative text-[14px] font-semibold w-fit ${
                              a.discount !== 0
                                ? "text-text-primary"
                                : "text-primary"
                            }`}
                          >
                            $ {a.price.toFixed(2)}
                            {a.discount !== 0 && (
                              <div className="absolute top-1/2 w-full h-px bg-text-primary -translate-y-1/2"></div>
                            )}
                          </div>
                          {a.discount !== 0 && (
                            <div className="text-primary text-[14px] font-semibold">
                              ${" "}
                              {discountPrice(a.price, a.discount)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {store.plan !== null && (() => {
            const plan = plans.find((p) => p.id === store.plan);
            if (!plan) return null;
            return (
              <>
                <Seperator />
                <h6 className="uppercase text-[12px] text-[#A8B2BD]">
                  plan
                </h6>
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
                              ${" "}
                              {discountPrice(
                                plan.price,
                                plan.discount,
                              )}
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
        </div>
      )}
    </div>
  );
};

export default App;
