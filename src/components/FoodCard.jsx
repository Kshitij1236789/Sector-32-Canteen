
import { useState } from "react";

function FoodCard({ item, cart, onAdd, onChangeQty }) {
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [selectedSize, setSelectedSize] = useState(
    item.sizes?.[0] || "Regular"
  );

  const price = item.options
    ? item.price
    : selectedSize === "Half"
    ? item.halfPrice
    : item.price;

  const cartItem = cart.find(
    (entry) =>
      entry.id === item.id &&
      entry.size === selectedSize
  );

  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    if (item.options) {
      setIsOptionModalOpen(true);
      return;
    }

    onAdd(item, selectedSize, price);
  };

  const handleOptionSelect = (option) => {
    onAdd(item, option.label, option.price);
    setIsOptionModalOpen(false);
  };

  const [paymentMethod, setPaymentMethod] = useState("cod");

  return (
    <>
      <div className="min-w-0">

        {/* PHOTO CARD */}
      <div
  className={`relative h-32 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 ${
    item.imageOrientation === "landscape" ? "landscape-photo" : ""
  }`}
>
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />

          <span className="absolute top-2 left-2 bg-white/95 text-gray-600 text-[10px] font-semibold px-2 py-1 rounded-lg">
            {item.category}
          </span>

        </div>

        {/* FOOD DETAILS OUTSIDE PHOTO CARD */}
        <div className="pt-2.5 px-0.5">

          <h3 className="text-[14px] font-bold text-gray-900 leading-tight">
            {item.name}
          </h3>

          <p className="text-[11px] text-gray-500 mt-1 leading-snug line-clamp-1">
            {item.description}
          </p>

          {/* SIZE */}
          {item.sizes && (
            <div className="flex gap-1.5 mt-2.5">

              {item.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border ${
                    selectedSize === size
                      ? "border-orange-500 bg-orange-50 text-orange-600 font-bold"
                      : "border-gray-200 text-gray-500"
                  }`}
                >
                  {size}
                </button>
              ))}

            </div>
          )}

          {/* PRICE + ADD */}
          <div className="flex items-center justify-between mt-3">

            <span className="text-[16px] font-extrabold text-gray-900">
              {item.options
                ? `From ₹${price}`
                : `₹${price}`}
            </span>

            {quantity === 0 ? (

              <button
                onClick={handleAdd}
                className="bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold px-3.5 py-2 rounded-xl active:scale-95"
              >
                Add +
              </button>

            ) : (

              <div className="flex items-center gap-2.5 bg-orange-50 rounded-xl px-2 py-1">

                <button
                  onClick={() => onChangeQty(item, selectedSize, -1)}
                  className="text-orange-600 font-bold text-base"
                >
                  −
                </button>

                <span className="text-xs font-bold text-gray-900">
                  {quantity}
                </span>

                <button
                  onClick={() => onChangeQty(item, selectedSize, 1)}
                  className="text-orange-600 font-bold text-base"
                >
                  +
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

      {/* OPTIONS MODAL */}
      {isOptionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center">

          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-5">

            <div className="flex items-start justify-between">

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Choose your {item.name}
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Select an option to add it to your cart.
                </p>
              </div>

              <button
                onClick={() => setIsOptionModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-600"
              >
                ×
              </button>

            </div>

            <div className="mt-4 space-y-2">

              {item.options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleOptionSelect(option)}
                  className="w-full flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left hover:border-orange-500 hover:bg-orange-50"
                >
                  <span className="text-sm font-semibold text-gray-900">
                    {option.label}
                  </span>

                  <span className="text-sm font-bold text-orange-600">
                    ₹{option.price}
                  </span>
                </button>
              ))}

            </div>

          </div>
        </div>
      )}

    </>
  );
}

export default FoodCard;
