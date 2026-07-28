import { Minus, Plus } from "lucide-react"
import type { AccessoryType } from "../../lib/types/accessory"

export default function AccessoryCard({ accessory }: { accessory: AccessoryType }) {
  return (
    <div className="bg-white relative h-full py-2 px-5 flex flex-col lg:flex-row gap-2 items-center rounded-[10px] border-2 border-white">
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
          <span className="text-blue-600 underline text-sm">Learn More</span>
        </p>
        <div className="flex justify-between items-center gap-2">
          <div className="mt-3 flex gap-3 items-end text-text-primary">
            <button
              disabled
              className="border-2 p-1 disabled:bg-transparent! bg-white rounded-xs"
            >
              <Minus size={12} />
            </button>
            <span className="text-lg">{accessory.quantity}</span>
            <button
              disabled
              className="border-2 p-1 disabled:bg-transparent! bg-white rounded-xs"
            >
              <Plus size={12} />
            </button>
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
                $ {(accessory.price - (accessory.discount / 100) * accessory.price).toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
