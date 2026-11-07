
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/orders";

const statuses = [
  "All",
  "Placed",
  "Preparing",
  "Ready",
  "Delivered",
  "Cancelled",
];

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [updatingPaymentId, setUpdatingPaymentId] = useState(null);


  // Fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingOrderId(orderId);

      const response = await fetch(`${API_URL}/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update order status");
      }

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? {
              ...order,
              orderStatus: data.order.orderStatus,
            }
            : order
        )
      );
    } catch (err) {
      alert(err.message || "Something went wrong");
      fetchOrders();
    } finally {
      setUpdatingOrderId(null);
    }
  };


  // Update payment status
  const updatePaymentStatus = async (orderId, newPaymentStatus) => {
    try {
      setUpdatingPaymentId(orderId);

      const response = await fetch(`${API_URL}/${orderId}/payment`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentStatus: newPaymentStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to update payment status"
        );
      }

      // Update payment status in dashboard
      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? {
              ...order,
              paymentStatus: data.order.paymentStatus,
            }
            : order
        )
      );

      alert("Payment status updated successfully!");
    } catch (err) {
      alert(err.message || "Something went wrong");
      fetchOrders();
    } finally {
      setUpdatingPaymentId(null);
    }
  };


  // Statistics
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Placed"
  ).length;

  const preparingOrders = orders.filter(
    (order) => order.orderStatus === "Preparing"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;

  // Filter orders
  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter(
        (order) => order.orderStatus === selectedStatus
      );

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Status colors
  const getStatusStyle = (status) => {
    const styles = {
      Placed: "bg-yellow-100 text-yellow-800",
      Preparing: "bg-orange-100 text-orange-800",
      Ready: "bg-blue-100 text-blue-800",
      Delivered: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
    };

    return styles[status] || "bg-gray-100 text-gray-800";
  };

  // Status dropdown
  const StatusDropdown = ({ order }) => (
    <select
      value={order.orderStatus}
      disabled={updatingOrderId === order._id}
      onChange={(e) =>
        updateOrderStatus(order._id, e.target.value)
      }
      className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold outline-none ${getStatusStyle(
        order.orderStatus
      )} disabled:cursor-wait disabled:opacity-50`}
    >
      {statuses
        .filter((status) => status !== "All")
        .map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
    </select>
  );


  // Payment status dropdown
  const PaymentStatusDropdown = ({ order }) => (
    <select
      value={order.paymentStatus || "Pending"}
      disabled={updatingPaymentId === order._id}
      onChange={(e) =>
        updatePaymentStatus(order._id, e.target.value)
      }
      className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold outline-none
        ${order.paymentStatus === "Paid"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
        }
        disabled:cursor-wait disabled:opacity-50`}
    >
      <option value="Pending">Pending</option>
      <option value="Paid">Paid</option>
    </select>
  );


  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Pending",
      value: pendingOrders,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Preparing",
      value: preparingOrders,
      color: "bg-orange-100 text-orange-700",
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      color: "bg-green-100 text-green-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-5 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Admin Dashboard
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Sector 32 Hospital Canteen
            </p>
          </div>

          <button
            onClick={fetchOrders}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50 sm:w-auto"
          >
            {loading ? "Loading..." : "Refresh Orders"}
          </button>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl bg-white p-4 shadow-sm sm:p-5"
            >
              <p className="text-xs font-medium text-gray-500 sm:text-sm">
                {stat.title}
              </p>

              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {stat.value}
                </h2>

                <span
                  className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${stat.color}`}
                >
                  {stat.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Orders Section */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">

          {/* Orders Header */}
          <div className="border-b border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              Recent Orders
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Orders received from doctors
            </p>

            {/* Status Filters */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${selectedStatus === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Loading orders...
            </div>
          ) : error ? (
            <div className="p-6 text-center">
              <p className="mb-4 text-red-600">{error}</p>

              <button
                onClick={fetchOrders}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                Try Again
              </button>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No orders found.
            </div>
          ) : (
            <>
              {/* MOBILE ORDER CARDS */}
              <div className="space-y-4 p-3 md:hidden">
                {filteredOrders.map((order) => (
                  <div
                    key={order._id}
                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    {/* Order Number */}
                    <div>
                      <p className="text-xs text-gray-500">
                        Order Number
                      </p>

                      <h3 className="mt-1 break-all font-bold text-gray-900">
                        {order.orderNumber}
                      </h3>
                    </div>

                    {/* Doctor Information */}
                    <div className="mt-4 rounded-lg bg-gray-50 p-3">
                      <p className="font-semibold text-gray-900">
                        {order.doctorName}
                      </p>

                      <p className="mt-1 text-sm text-gray-600">
                        {order.department}
                      </p>

                      <p className="mt-1 break-words text-sm text-gray-500">
                        📍 {order.location}
                      </p>
                    </div>

                    {/* Items */}
                    <div className="mt-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Order Items
                      </p>

                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item._id || item.id}
                            className="flex justify-between gap-3 text-sm"
                          >
                            <span className="text-gray-700">
                              {item.name} × {item.quantity}
                            </span>

                            <span className="shrink-0 font-medium text-gray-900">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Total */}
                    <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3">
                      <span className="text-sm text-gray-500">
                        Total Amount
                      </span>

                      <span className="text-lg font-bold text-gray-900">
                        ₹{order.itemsTotal}
                      </span>
                    </div>


                    {/* Payment Information */}
                    <div className="mt-4 rounded-lg border border-gray-200 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Payment Method
                      </p>

                      <p className="mt-1 font-semibold text-gray-900">
                        {order.paymentMethod || "COD"}
                      </p>

                      <div className="mt-3">
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Payment Status
                        </label>

                        <PaymentStatusDropdown order={order} />

                        {updatingPaymentId === order._id && (
                          <p className="mt-2 text-xs text-blue-600">
                            Updating payment...
                          </p>
                        )}
                      </div>
                    </div>


                    {/* Status Update */}
                    <div className="mt-4">
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Update Order Status
                      </label>

                      <StatusDropdown order={order} />

                      {updatingOrderId === order._id && (
                        <p className="mt-2 text-xs text-blue-600">
                          Updating status...
                        </p>
                      )}
                    </div>

                    {/* Date */}
                    <p className="mt-3 text-xs text-gray-500">
                      {formatDate(order.createdAt)}
                    </p>

                    {/* Instructions */}
                    {order.instructions && (
                      <div className="mt-3 rounded-lg bg-yellow-50 p-3">
                        <p className="text-xs font-semibold text-yellow-800">
                          Instructions
                        </p>

                        <p className="mt-1 text-sm text-yellow-900">
                          {order.instructions}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* DESKTOP TABLE */}

              {/* DESKTOP TABLE */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-sm text-gray-500">
                    <tr>
                      <th className="px-6 py-4">Order</th>
                      <th className="px-6 py-4">Doctor</th>
                      <th className="px-6 py-4">Department</th>
                      <th className="px-6 py-4">Items</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4">Payment Method</th>
                      <th className="px-6 py-4">Payment Status</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Date</th>
                    </tr>
                  </thead>


                  <tbody className="divide-y divide-gray-100">
                    {filteredOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-gray-50"
                      >
                        {/* Order */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <p className="font-semibold text-gray-900">
                            {order.orderNumber}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {order.location}
                          </p>
                        </td>

                        {/* Doctor */}
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {order.doctorName}
                        </td>

                        {/* Department */}
                        <td className="px-6 py-4 text-gray-600">
                          {order.department}
                        </td>

                        {/* Items */}
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            {order.items.map((item) => (
                              <p
                                key={item._id || item.id}
                                className="text-sm text-gray-700"
                              >
                                {item.name} × {item.quantity}
                              </p>
                            ))}
                          </div>
                        </td>

                        {/* Total */}
                        <td className="whitespace-nowrap px-6 py-4 font-semibold">
                          ₹{order.itemsTotal}
                        </td>

                        {/* Payment Method */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className="font-medium text-gray-700">
                            {order.paymentMethod || "COD"}
                          </span>
                        </td>

                        {/* Payment Status */}
                        <td className="min-w-40 px-6 py-4">
                          <PaymentStatusDropdown order={order} />

                          {updatingPaymentId === order._id && (
                            <p className="mt-1 text-xs text-blue-600">
                              Updating payment...
                            </p>
                          )}
                        </td>

                        {/* Status Dropdown */}
                        <td className="min-w-40 px-6 py-4">
                          <StatusDropdown order={order} />

                          {updatingOrderId === order._id && (
                            <p className="mt-1 text-xs text-blue-600">
                              Updating...
                            </p>
                          )}
                        </td>

                        {/* Date */}
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <p className="mt-4 text-center text-xs text-gray-500">
          Showing {filteredOrders.length} of {totalOrders} orders
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;
  