
function CartModal({ cart, onClose, onChangeQty }) {

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (!cart.length) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center">

      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-5 max-h-[85vh] overflow-y-auto">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-xl font-extrabold">
              My Cart
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {totalItems} items selected
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 text-xl"
          >
            ×
          </button>

        </div>

        {/* Cart Items */}

        <div className="mt-5 space-y-4">

          {cart.map((item) => (

            <div
              key={`${item.id}-${item.size}`}
              className="flex items-center gap-3 border-b border-gray-100 pb-4"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-xl object-cover"
              />

              <div className="flex-1">

                <h3 className="text-sm font-bold">
                  {item.name}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {item.size}
                </p>

                <p className="text-sm font-bold text-orange-600 mt-1">
                  ₹{item.price}
                </p>

              </div>

              <div className="flex items-center gap-2 bg-orange-50 rounded-lg px-2 py-1">

                <button
                  onClick={() =>
                    onChangeQty(item, -1)
                  }
                  className="text-orange-600 font-bold"
                >
                  −
                </button>

                <span className="text-sm font-bold">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    onChangeQty(item, 1)
                  }
                  className="text-orange-600 font-bold"
                >
                  +
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* Total */}

        <div className="mt-5 bg-gray-50 rounded-2xl p-4">

          <div className="flex justify-between items-center">

            <span className="text-sm text-gray-600">
              Total Amount
            </span>

            <span className="text-xl font-extrabold">
              ₹{totalPrice}
            </span>

          </div>

        </div>

        {/* Checkout */}

        <button
          onClick={() => {
            alert("Cart is working! Checkout will be added in the next phase.");
          }}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl mt-4"
        >
          Proceed to Checkout →
        </button>

      </div>

    </div>
  );
}

export default CartModal;
