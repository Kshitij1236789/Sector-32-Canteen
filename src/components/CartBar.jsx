
function CartBar({ cart, onOpenCart }) {

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-2">

      <div className="bg-gray-950 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between">

        <div>

          <p className="text-xs text-gray-300">
            {totalItems} {totalItems === 1 ? "item" : "items"} selected
          </p>

          <p className="text-lg font-extrabold mt-1">
            ₹{totalPrice}
          </p>

        </div>

        <button
          onClick={onOpenCart}
          className="bg-orange-500 hover:bg-orange-600 active:scale-95 px-5 py-3 rounded-xl text-sm font-bold transition-all"
        >
          View Cart →
        </button>

      </div>

    </div>
  );
}

export default CartBar;
