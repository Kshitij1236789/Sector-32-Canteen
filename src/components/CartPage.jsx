import upiQrImage from "../images/canteen-upi-qr.png.jpeg";
import { useState } from "react";

function CartPage({
  cart,
  onClose,
  onChangeQty,
  onClearCart,
}) {
  const [doctorName, setDoctorName] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [instructions, setInstructions] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");


  // Calculate total quantity
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total price
  const itemsTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Validate checkout form
  const validateForm = () => {
    const newErrors = {};

    if (!doctorName.trim()) {
      newErrors.doctorName = "Please enter your name";
    }

    if (!department) {
      newErrors.department = "Please select your department";
    }

    if (!location.trim()) {
      newErrors.location = "Please enter your room or location";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit order to backend
  const handleCheckout = async (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // Prepare order data

      const orderData = {
        doctorName: doctorName.trim(),
        department,
        location: location.trim(),
        instructions: instructions.trim(),
         // Payment method selected by customer
        paymentMethod: paymentMethod.toUpperCase(),
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          size: item.size || "Regular",
          price: item.price,
          quantity: item.quantity,
        })),
      };


      // Send order to backend
      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      // Handle backend errors
      if (!response.ok) {
        throw new Error(
          data.message || "Unable to place your order."
        );
      }

      // Save order number from backend response
      setOrderNumber(
        data.order?.orderNumber ||
        data.orderNumber ||
        ""
      );

      // Clear cart after successful order
      if (onClearCart) {
        onClearCart();
      }

      // Show confirmation screen
      setOrderConfirmed(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message || "Unable to place your order.");
    }
  };
  // ==============================
  // ORDER CONFIRMATION SCREEN
  // ==============================

  if (orderConfirmed) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col">

        {/* Header */}
        <header className="bg-white px-4 py-4 border-b">
          <button
            onClick={onClose}
            className="text-orange-600 font-bold"
          >
            ← Back to Menu
          </button>
        </header>

        {/* Confirmation */}
        <main className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-6 py-8 text-center">

          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-4xl mb-5">
            ✓
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-extrabold text-gray-900">
            Order Placed Successfully!
          </h1>

          <p className="text-sm text-gray-500 mt-3">
            Your order has been sent to the canteen.
          </p>

          {/* Order Details */}
          <div className="bg-white rounded-2xl p-5 mt-6 w-full text-left border">

            {/* Order Number */}
            {orderNumber && (
              <>
                <p className="text-sm text-gray-500">
                  Order Number
                </p>

                <p className="font-extrabold text-orange-600 mb-4">
                  {orderNumber}
                </p>
              </>
            )}

            {/* Doctor */}
            <p className="text-sm text-gray-500">
              Doctor
            </p>

            <p className="font-bold mb-3">
              {doctorName}
            </p>

            {/* Department */}
            <p className="text-sm text-gray-500">
              Department
            </p>

            <p className="font-bold mb-3">
              {department}
            </p>

            {/* Location */}
            <p className="text-sm text-gray-500">
              Delivery Location
            </p>

            <p className="font-bold mb-3">
              {location}
            </p>

            {/* Payment Method */}
            <p className="text-sm text-gray-500">
              Payment Method
            </p>

            <p className="font-bold mb-3">
              {paymentMethod === "upi"
                ? "UPI QR Payment"
                : "Cash on Delivery"}
            </p>

            {/* Payment Status */}
            <p className="text-sm text-gray-500">
              Payment Status
            </p>

            <p className="font-bold mb-3">
              Pending
            </p>

            {/* Items */}
            <p className="text-sm text-gray-500">
              Total Items
            </p>

            <p className="font-bold mb-3">
              {totalItems}
            </p>

            {/* Total */}
            <div className="border-t pt-3 flex justify-between">

              <span className="font-bold">
                Total
              </span>

              <span className="font-extrabold text-orange-600">
                ₹{itemsTotal}
              </span>

            </div>

          </div>

          {/* Instructions */}
          {instructions.trim() && (
            <div className="bg-white rounded-2xl p-4 mt-4 w-full text-left border">

              <p className="text-sm text-gray-500">
                Order Instructions
              </p>

              <p className="font-medium mt-1">
                {instructions}
              </p>

            </div>
          )}

          {/* Back Button */}
          <button
            onClick={onClose}
            className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl"
          >
            Back to Menu
          </button>

        </main>

      </div>
    );
  }

  // ==============================
  // CHECKOUT SCREEN
  // ==============================

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3 shadow-sm">

        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center text-xl font-bold"
        >
          ←
        </button>

        <div className="flex-1">

          <h1 className="text-xl font-extrabold text-gray-900">
            Checkout
          </h1>

          <p className="text-xs text-gray-500">
            {totalItems} {totalItems === 1 ? "item" : "items"} selected
          </p>

        </div>

      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto px-4 py-4 pb-6">

        {/* ==============================
            SELECTED ITEMS
        ============================== */}

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">

          <h2 className="text-lg font-extrabold text-gray-900 mb-4">
            Your Items
          </h2>

          {cart.length === 0 ? (

            <div className="text-center py-10">

              <div className="text-5xl mb-3">
                🛒
              </div>

              <h3 className="font-bold text-gray-900">
                Your cart is empty
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Add some items from the menu.
              </p>

              <button
                onClick={onClose}
                className="mt-4 bg-orange-500 text-white px-5 py-2.5 rounded-xl font-bold"
              >
                Browse Menu
              </button>

            </div>

          ) : (

            <div className="divide-y divide-gray-100">

              {cart.map((item) => (

                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
                >

                  {/* Food Image */}
                  <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />

                  </div>

                  {/* Food Details */}
                  <div className="flex-1 min-w-0">

                    <h3 className="font-bold text-sm text-gray-900">
                      {item.name}
                    </h3>

                    {item.size && item.size !== "Regular" && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.size}
                      </p>
                    )}

                    <p className="text-orange-600 font-extrabold mt-2">
                      ₹{item.price}
                    </p>

                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-xl px-2 py-1.5">

                    <button
                      type="button"
                      onClick={() => onChangeQty(item, -1)}
                      className="text-orange-600 font-bold text-xl w-5"
                    >
                      −
                    </button>

                    <span className="font-bold text-sm min-w-4 text-center">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => onChangeQty(item, 1)}
                      className="text-orange-600 font-bold text-xl w-5"
                    >
                      +
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* ==============================
            BILL DETAILS
        ============================== */}

        {cart.length > 0 && (

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mt-4">

            <h2 className="text-lg font-extrabold text-gray-900 mb-4">
              Bill Details
            </h2>

            {/* Items Total */}
            <div className="flex items-center justify-between mb-3">

              <span className="text-sm text-gray-600">
                Items total ({totalItems} items)
              </span>

              <span className="font-semibold text-gray-900">
                ₹{itemsTotal}
              </span>

            </div>

            {/* Delivery Charge */}
            <div className="flex items-center justify-between mb-3">

              <span className="text-sm text-gray-600">
                Delivery charge
              </span>

              <span className="text-sm font-semibold text-green-600">
                FREE
              </span>

            </div>

            <div className="border-t border-gray-100 my-4" />

            {/* Grand Total */}
            <div className="flex items-center justify-between">

              <span className="font-extrabold text-gray-900">
                Grand Total
              </span>

              <span className="text-xl font-extrabold text-orange-600">
                ₹{itemsTotal}
              </span>

            </div>

          </section>

        )}

        {/* ==============================
            DOCTOR DETAILS FORM
        ============================== */}

        {cart.length > 0 && (

          <form
            id="checkout-form"
            onSubmit={handleCheckout}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mt-4"
          >

            <h2 className="text-lg font-extrabold text-gray-900 mb-4">
              Doctor Details
            </h2>

            {/* Doctor Name */}
            <div className="mb-4">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Doctor's Name *
              </label>

              <input
                type="text"
                value={doctorName}
                onChange={(event) => {
                  setDoctorName(event.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    doctorName: "",
                  }));
                }}
                placeholder="Enter your full name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />

              {errors.doctorName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.doctorName}
                </p>
              )}

            </div>

            {/* Department */}
            <div className="mb-4">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Department *
              </label>

              <select
                value={department}
                onChange={(event) => {
                  setDepartment(event.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    department: "",
                  }));
                }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none focus:border-orange-500"
              >

                <option value="">
                  Select department
                </option>

                <option value="Emergency">
                  Emergency
                </option>

                <option value="Medicine">
                  Medicine
                </option>

                <option value="Surgery">
                  Surgery
                </option>

                <option value="Orthopaedics">
                  Orthopaedics
                </option>

                <option value="Paediatrics">
                  Paediatrics
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

              {errors.department && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.department}
                </p>
              )}

            </div>

            {/* Delivery Location */}
            <div className="mb-4">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Room / Delivery Location *
              </label>

              <input
                type="text"
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    location: "",
                  }));
                }}
                placeholder="Enter room number or location"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />

              {errors.location && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.location}
                </p>
              )}

            </div>

            {/* Order Instructions */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Order Instructions
              </label>

              <textarea
                value={instructions}
                onChange={(event) =>
                  setInstructions(event.target.value)
                }
                placeholder="Any special instructions? (Optional)"
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 resize-none"
              />

            </div>

            {/* PAYMENT METHOD */}

            <div className="mt-5">
              <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                Payment Method
              </h2>

              {/* UPI PAYMENT */}
              <label className="flex items-center gap-3 border rounded-xl p-4 mb-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />

                <div>
                  <p className="font-bold">UPI QR Payment</p>
                  <p className="text-sm text-gray-500">
                    Pay using Google Pay, PhonePe, Paytm or another UPI app
                  </p>
                </div>
              </label>


              {/* CASH ON DELIVERY */}
              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />

                <div>
                  <p className="font-bold">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">
                    Pay when your order is delivered
                  </p>
                </div>
              </label>

              {/* UPI QR CODE */}
              {paymentMethod === "upi" && (
                <div className="mt-4 p-4 bg-orange-50 rounded-xl text-center">

                  <h3 className="font-bold text-gray-900">
                    Scan & Pay
                  </h3>

                  <p className="text-sm text-gray-600 mt-2">
                    Scan this QR code using your UPI app
                  </p>

            <div className="mt-4 flex justify-center">
  <img
    src={upiQrImage}
    alt="Canteen UPI QR Code"
    className="w-full max-w-[260px] h-auto object-contain rounded-xl"
  />
</div>
                  <p className="text-sm text-gray-500 mt-3">
                    After payment, confirm your order.
                  </p>

                </div>
              )}

            </div>


          </form>

        )}

      </main>

      {/* ==============================
          FIXED BOTTOM CHECKOUT
      ============================== */}

      {cart.length > 0 && (

        <footer className="bg-white border-t border-gray-100 px-4 pt-3 pb-5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">

          {/* Total */}
          <div className="flex items-center justify-between mb-3">

            <div>

              <p className="text-xs text-gray-500">
                Total Amount
              </p>

              <p className="text-xl font-extrabold text-gray-900">
                ₹{itemsTotal}
              </p>

            </div>

            <p className="text-xs text-gray-500">
              {totalItems} items
            </p>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            form="checkout-form"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 active:scale-[0.98] text-white font-extrabold py-4 rounded-2xl transition-all"
          >

            {loading
              ? "Placing Order..."
              : "Confirm Order →"}

          </button>

        </footer>

      )}

    </div>
  );
}

export default CartPage;