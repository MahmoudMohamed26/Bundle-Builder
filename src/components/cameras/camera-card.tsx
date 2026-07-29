import { useState } from "react";
import type { CameraType } from "../../lib/types/camera";
import useBundleStore from "../../store/bundle-store";
import QuantitySelector from "../global/quantity-selector";

export default function CameraCard({ cam }: { cam: CameraType }) {
  const firstVariation = cam.variations[0];
  const [activeVariationId, setActiveVariationId] = useState(firstVariation.id);

  const cameraVariations = useBundleStore((s) => s.cameraVariations);
  const setCameraVariationQty = useBundleStore((s) => s.setCameraVariationQty);

  const hasAnyQty = cam.variations.some(
    (v) => (cameraVariations[`${cam.id}-${v.id}`] || 0) > 0,
  );

  const activeVariation =
    cam.variations.find((v) => v.id === activeVariationId) || firstVariation;
  const activeQty =
    cameraVariations[`${cam.id}-${activeVariation.id}`] || 0;

  return (
    <div
      className={`bg-white relative h-full py-2 px-5 flex flex-col lg:flex-row gap-2 items-center rounded-[10px] border-2 ${hasAnyQty ? "border-primary" : "border-white"}`}
    >
      {cam.discount !== 0 && (
        <div className="absolute start-2 top-2 rounded-full text-white bg-primary px-2 py-[2px] text-xs">
          {" "}
          Save <span className="font-semibold">%{cam.discount}</span>
        </div>
      )}
      <img
        src={cam.image.url}
        alt={cam.title}
        width={101}
        loading="lazy"
        className="object-contain"
      />
      <div>
        <h2 className="text-[16px] font-semibold">{cam.title}</h2>
        <p className="text-text-primary text-sm mb-3!">
          {cam.description}{" "}
          <span className="text-blue-600 underline text-sm">Learn More</span>
        </p>
        {cam.variations.length > 1 && (
          <div className="mt-1 flex gap-1 items-center flex-wrap">
            {cam.variations.map(
              (variation) =>
                variation.color && (
                  <button
                    key={variation.id}
                    onClick={() => setActiveVariationId(variation.id)}
                    className={`flex items-center gap-px px-2 py-px rounded-xs border cursor-pointer transition-colors ${
                      activeVariationId === variation.id
                        ? "bg-green-100 border-green-500"
                        : "border"
                    }`}
                  >
                    <img
                      src={variation.color.image.url}
                      alt={cam.title}
                      width={28}
                      loading="lazy"
                      className="object-contain"
                    />
                    <p className="text-text-primary text-xs">
                      {variation.color.title}
                    </p>
                  </button>
                ),
            )}
          </div>
        )}
        <div className="flex justify-between items-center gap-2">
          <div className="mt-3">
            <QuantitySelector
              qty={activeQty}
              max={activeVariation.quantity}
              onMinus={() =>
                setCameraVariationQty(cam.id, activeVariation.id, activeQty - 1)
              }
              onPlus={() =>
                setCameraVariationQty(cam.id, activeVariation.id, activeQty + 1)
              }
            />
          </div>

          <div
            className={`flex text-[16px] flex-col mt-4 justify-center items-center`}
          >
            <div
              className={`relative w-fit ${cam.discount !== 0 ? "text-red-600" : "text-text-primary"}`}
            >
              $ {cam.price}
              {cam.discount !== 0 && (
                <div className="absolute top-1/2 w-full h-px bg-red-500 -translate-y-1/2"></div>
              )}
            </div>
            <div>
              {cam.discount !== 0 && (
                <div className="text-text-primary">
                  ${" "}
                  {(
                    cam.price -
                    (cam.discount / 100) * cam.price
                  ).toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
