"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Trash2Icon } from "lucide-react";
import { useAuth } from "@/app/context/Authcontext";

type OrderItem = {
    productId: string;
    name: string;
    price: number;
    quantity: number;
};

type Customer = {
    _id: string;
    name: string;
    email: string;
};

type Order = {
    _id: string;
    totalAmount: number;
    status: string;
    paymentStatus: string;
    createdAt: string;
    items: OrderItem[];
    customerId: Customer;
};


export default function ManageOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filter, setFilter] = useState<"today" | "all">("today");
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const { user } = useAuth();
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get("/orders");
            setOrders(res.data.orders || []);
        } catch (err: any) {

            const message =
                err?.response?.data?.message || "Failed to fetch admin data";
            setMessage(message);

        } finally {
            setLoading(false);
        }
    };

    const isToday = (date: string) => {
        const d = new Date(date);
        const today = new Date();
        return (
            d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear()
        );
    };

    const filteredOrders =
        filter === "today" ? orders.filter(o => isToday(o.createdAt)) : orders;

    // Update either order status or payment status
    const updateStatus = async (
        id: string,
        field: "status" | "paymentStatus",
        value: string
    ) => {
        try {
            await api.patch(`/orders/${id}`, { [field]: value });
            fetchOrders(); // refresh
        } catch (err: any) {
            alert(
                "Failed to update " +
                field +
                ": " +
                (err.response?.data?.message || err.message)
            );
        }
    };
    const handleDeleteOrder = async (orderid: string) => {
        try {
            await api.delete(`/orders/${orderid}`);
            fetchOrders(); // refresh
        } catch (err: any) {
            alert(
                "Failed to delete order: " +
                (err.response?.data?.message || err.message)
            );
        }
    };

    const printOrder = (order: Order) => {
        const printContent = `
      <html>
        <head>
          <title>Order #${order._id.slice(-6)}</title>
          <style>
            body { font-family: sans-serif; padding: 20px; color: #000; }
            h2 { color: #ffbf00; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #000; padding: 6px; text-align: left; }
          </style>
        </head>
        <body>
          <h2>Order #${order._id.slice(-6)}</h2>
          <p><strong>Customer ID:</strong> ${order.customerId?._id || "N/A"}</p>
         <p>
          
  <strong>Customer:</strong> ${order.customerId?.name || "N/A"}
 
</p>
<p>
  <strong>Email:</strong> ${order.customerId?.email || "N/A"}
</p>

          <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Status:</strong> ${order.status}</p>
          <p><strong>Payment:</strong> ${order.paymentStatus}</p>

          <h3>Items</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items
                .map(
                    i => `
                <tr>
                  <td>${i.name}</td>
                  <td>Rs.${i.price}</td>
                  <td>${i.quantity}</td>
                  <td>Rs.${i.price * i.quantity}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>

          <p><strong>Total Amount:</strong> Rs.${order.totalAmount}</p>
        </body>
      </html>
    `;

        const printWindow = window.open("", "_blank");
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }
    };
    if (!user || user.role !== 'ADMIN') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1f1208] px-6 py-12">
                <p className="text-red-500 text-lg">Access Denied. Admins Only.</p>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-[#1f1208] px-4 sm:px-6 py-6 text-white">
            <h1 className="text-2xl sm:text-4xl font-bold text-amber-400 mb-6">
                📦 Manage Orders
            </h1>

            {/* Tabs */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={() => setFilter("today")}
                    className={`px-4 py-2 rounded-lg text-xs sm:text-sm ${filter === "today"
                        ? "bg-amber-500 text-black"
                        : "bg-gray-800 text-gray-300"
                        }`}
                >
                    Today Orders
                </button>
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-lg text-xs sm:text-sm ${filter === "all"
                        ? "bg-amber-500 text-black"
                        : "bg-gray-800 text-gray-300"
                        }`}
                >
                    All Orders
                </button>
            </div>

            {/* Orders */}
            {loading ? (
                <p className="text-sm text-gray-400">Loading orders...</p>
            ) : filteredOrders.length === 0 ? (
                <p className="text-sm text-gray-400">No orders found</p>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map(order => (
                        <div
                            key={order._id}
                            className="bg-gray-900 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                        >

                            <div className="flex flex-col gap-1">
                                <button onClick={() => handleDeleteOrder(order._id)} className="text-red-500 hover:text-red-700">
                                    <Trash2Icon size={16} />
                                </button>
                                <p className="text-xs sm:text-sm text-gray-200">
                                    Order #{order._id.slice(-6)}

                                </p>
                                <p className="text-xs text-gray-400">
                                    {new Date(order.createdAt).toLocaleString()}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-400">
                                    Status:{" "}
                                    <span className="text-amber-400 font-semibold">
                                        {order.status}
                                    </span>
                                </p>
                                <p className="text-xs sm:text-sm text-gray-400">
                                    Payment:{" "}
                                    <span className="text-green-400 font-semibold">
                                        {order.paymentStatus}
                                    </span>
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                                <p className="text-sm sm:text-base font-bold text-amber-400">
                                    Rs.{order.totalAmount}
                                </p>

                                {/* Order Status */}
                                <select
                                    value={order.status}
                                    onChange={e =>
                                        updateStatus(order._id, "status", e.target.value)
                                    }
                                    className="bg-gray-800 text-xs sm:text-sm px-3 py-2 rounded-lg text-white"
                                >
                                    <option value="PLACED">Placed</option>
                                    <option value="PREPARING">Preparing</option>
                                    <option value="READY">Ready</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>

                                {/* Payment Status */}
                                <select
                                    value={order.paymentStatus}
                                    onChange={e =>
                                        updateStatus(order._id, "paymentStatus", e.target.value)
                                    }
                                    className="bg-gray-800 text-xs sm:text-sm px-3 py-2 rounded-lg text-white"
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="PAID">Completed</option>
                                    <option value="FAILED">Failed</option>
                                </select>

                                {/* View Details */}
                                <button
                                    onClick={() => setSelectedOrder(order)}
                                    className="bg-amber-500 text-black px-3 py-2 rounded-lg text-xs sm:text-sm hover:bg-amber-600"
                                >
                                    View Details
                                </button>

                                {/* Print */}
                                <button
                                    onClick={() => printOrder(order)}
                                    className="bg-green-500 text-black px-3 py-2 rounded-lg text-xs sm:text-sm hover:bg-green-600"
                                >
                                    Print
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for Order Details */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
                    <div className="bg-gray-900 rounded-xl w-full max-w-lg p-6 relative">
                        <button
                            className="absolute top-3 right-3 text-gray-300 hover:text-white text-lg"
                            onClick={() => setSelectedOrder(null)}
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-bold text-amber-400 mb-3">
                            Order #{selectedOrder._id.slice(-6)}
                        </h2>
                        <p>
                            <strong>Customer:</strong> {selectedOrder.customerId?.name || "N/A"}
                        </p>
                        <p>
                            <strong>Email:</strong> {selectedOrder.customerId?.email || "N/A"}
                        </p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(selectedOrder.createdAt).toLocaleString()}
                        </p>
                        <p>
                            <strong>Status:</strong> {selectedOrder.status}
                        </p>
                        <p>
                            <strong>Payment:</strong> {selectedOrder.paymentStatus}
                        </p>

                        <h3 className="mt-4 font-semibold text-amber-400">Items</h3>
                        <table className="w-full mt-2 text-xs sm:text-sm border-collapse">
                            <thead>
                                <tr>
                                    <th className="border px-2 py-1">Name</th>
                                    <th className="border px-2 py-1">Price</th>
                                    <th className="border px-2 py-1">Quantity</th>
                                    <th className="border px-2 py-1">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedOrder.items.map(item => (
                                    <tr key={item.productId}>
                                        <td className="border px-2 py-1">{item.name}</td>
                                        <td className="border px-2 py-1">Rs.{item.price}</td>
                                        <td className="border px-2 py-1">{item.quantity}</td>
                                        <td className="border px-2 py-1">
                                            Rs.{item.price * item.quantity}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <p className="mt-4 font-bold text-amber-400">
                            Total: Rs.{selectedOrder.totalAmount}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
