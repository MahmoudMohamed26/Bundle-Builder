import { Link } from "react-router";
import type { SensorType } from "../../lib/types/sensor";
import useBundleStore from "../../store/bundle-store";
import QuantitySelector from "../global/quantity-selector";

export default function SensorCard({ sensor }: { sensor: SensorType }) {
  const storeSensors = useBundleStore((s) => s.sensors);
  const setSensorQty = useBundleStore((s) => s.setSensorQty);
  const sel = storeSensors.find((s) => s.sensorId === sensor.id);
  const qty = sel?.quantity ?? 0;

  return (
    <div
      className={`bg-white duration-300 relative h-full py-2 px-5 flex flex-col lg:flex-row gap-2 items-center rounded-[10px] border-2 ${qty > 0 ? "border-primary" : "border-white"}`}
    >
      {sensor.discount !== 0 && (
        <div className="absolute start-2 top-2 rounded-full text-white bg-primary px-2 py-[2px] text-xs">
          Save <span className="font-semibold">%{sensor.discount}</span>
        </div>
      )}
      <img
        src={sensor.image.url}
        alt={sensor.title}
        width={101}
        loading="lazy"
        className="object-contain"
      />
      <div className="flex-1">
        <h2 className="text-[16px] font-semibold">{sensor.title}</h2>
        <p className="text-text-primary text-sm mb-3!">
          {sensor.description}{" "}
          <Link
            to={`/products/${sensor.id}`}
            className="text-blue-600 underline text-sm"
          >
            Learn More
          </Link>
        </p>
        <div className="flex justify-between items-center gap-2">
          <div className="mt-3">
            <QuantitySelector
              qty={qty}
              max={sensor.quantity}
              onMinus={() => setSensorQty(sensor.id, qty - 1)}
              onPlus={() => setSensorQty(sensor.id, qty + 1)}
            />
          </div>
          <div className="flex text-[16px] flex-col mt-4 justify-center items-center">
            <div
              className={`relative w-fit ${sensor.discount !== 0 ? "text-red-600" : "text-text-primary"}`}
            >
              $ {sensor.price}
              {sensor.discount !== 0 && (
                <div className="absolute top-1/2 w-full h-px bg-red-500 -translate-y-1/2"></div>
              )}
            </div>
            {sensor.discount !== 0 && (
              <div className="text-text-primary">
                ${" "}
                {(
                  sensor.price -
                  (sensor.discount / 100) * sensor.price
                ).toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
