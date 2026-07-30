import QuantitySelector from "../global/quantity-selector";

interface ReviewItemProps {
  imageSrc: string;
  title: string;
  qty: number;
  max: number;
  price: number;
  discount: number;
  imageSize?: number;
  onMinus: () => void;
  onPlus: () => void;
}

function ReviewItem({
  imageSrc,
  title,
  qty,
  max,
  price,
  discount,
  imageSize = 32,
  onMinus,
  onPlus,
}: ReviewItemProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <div className="p-1 bg-white rounded-sm">
          <img
            src={imageSrc}
            alt={title}
            width={imageSize}
            loading="lazy"
            className="object-contain"
          />
        </div>
        <h6 className="text-sm max-w-[150px]">{title}</h6>
      </div>
      <div className="flex gap-4 items-center">
        <QuantitySelector
          variant="white"
          qty={qty}
          max={max}
          onMinus={onMinus}
          onPlus={onPlus}
        />
        <div className="flex text-[16px] flex-col justify-center items-center">
          <div
            className={`relative text-[14px] font-semibold w-fit ${
              discount !== 0 ? "text-text-primary" : "text-primary"
            }`}
          >
            $ {price.toFixed(2)}
            {discount !== 0 && (
              <div className="absolute top-1/2 w-full h-px bg-text-primary -translate-y-1/2"></div>
            )}
          </div>
          {discount !== 0 && (
            <div className="text-primary text-[14px] font-semibold">
              $ {(price - (discount / 100) * price).toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewItem;
