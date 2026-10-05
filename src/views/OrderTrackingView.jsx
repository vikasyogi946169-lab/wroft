import { useState } from "react";
import {
  MapPin,
  Truck,
  CheckCircle2,
  Search,
  Play
} from "lucide-react";
import { useApp } from "../context/AppContext";
const OrderTrackingView = () => {
  const { orders, activeOrderId, advanceOrderTracking, navigate, formatPrice, showToast } = useApp();
  const [searchId, setSearchId] = useState("");
  const currentOrder = orders.find((o) => o.id === (searchId.trim() || activeOrderId)) || orders[0];
  const handleSearchOrder = (e) => {
    e.preventDefault();
    const found = orders.find(
      (o) => o.id.toLowerCase() === searchId.trim().toLowerCase() || o.trackingNumber.toLowerCase() === searchId.trim().toLowerCase()
    );
    if (!found) {
      showToast(`No order found with ID "${searchId}". Showing recent order.`, "info");
    }
  };
  const statusSteps = [
    { key: "placed", label: "Order Placed" },
    { key: "confirmed", label: "Confirmed" },
    { key: "packed", label: "Packed" },
    { key: "shipped", label: "Shipped" },
    { key: "out_for_delivery", label: "Out for Delivery" },
    { key: "delivered", label: "Delivered" }
  ];
  const currentStepIndex = currentOrder ? statusSteps.findIndex((s) => s.key === currentOrder.status) : 0;
  return <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {
    /* Header and Lookup Box */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
            Live Order Tracking
          </h1>
          <p className="text-xs text-slate-500">
            Real-time GPS updates from WROFT SuperFast Delivery Network
          </p>
        </div>

        {
    /* Order ID Search */
  }
        <form onSubmit={handleSearchOrder} className="flex gap-2 max-w-xs w-full">
          <div className="relative flex-1">
            <input
    type="text"
    placeholder="Search by Order ID / AWB..."
    value={searchId}
    onChange={(e) => setSearchId(e.target.value)}
    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-mono"
  />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
          <button
    type="submit"
    className="px-3.5 py-2 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
  >
            Track
          </button>
        </form>
      </div>

      {currentOrder ? <div className="space-y-6">
          {
    /* Order Details Card with Simulation Stepper Button */
  }
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-8 shadow-sm">
            {
    /* Top Bar: Order ID, Courier Partner & Advance Demo Button */
  }
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Tracking Order
                </span>
                <div className="text-xl font-black font-mono text-slate-900 dark:text-white">
                  #{currentOrder.id}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Courier: <span className="font-semibold text-slate-700 dark:text-slate-300">{currentOrder.courierName}</span> · AWB: <span className="font-mono text-blue-600 dark:text-blue-400">{currentOrder.trackingNumber}</span>
                </p>
              </div>

              {
    /* Interactive Demo Simulation Button */
  }
              <button
    onClick={() => advanceOrderTracking(currentOrder.id)}
    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer self-start sm:self-center"
    title="Click to advance tracking status to the next step"
  >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>Advance Order Status (Live Demo)</span>
              </button>
            </div>

            {
    /* Visual Tracking Timeline Stepper */
  }
            <div>
              {
    /* Progress Line */
  }
              <div className="relative mb-6 hidden sm:block">
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
    className="h-full bg-linear-to-r from-blue-600 to-emerald-500 transition-all duration-500 rounded-full"
    style={{
      width: `${currentStepIndex / (statusSteps.length - 1) * 100}%`
    }}
  />
                </div>

                <div className="flex justify-between items-center -mt-3.5">
                  {statusSteps.map((step, idx) => {
    const isPassed = idx <= currentStepIndex;
    const isCurrent = idx === currentStepIndex;
    return <div key={step.key} className="flex flex-col items-center">
                        <div
      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${isPassed ? "bg-emerald-600 text-white shadow-md" : "bg-slate-200 dark:bg-slate-800 text-slate-500"} ${isCurrent ? "ring-4 ring-emerald-500/20 scale-110" : ""}`}
    >
                          {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                        <span
      className={`text-[11px] mt-2 font-semibold transition-colors ${isPassed ? "text-slate-900 dark:text-white" : "text-slate-400"}`}
    >
                          {step.label}
                        </span>
                      </div>;
  })}
                </div>
              </div>

              {
    /* Detailed Timeline Events */
  }
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Shipment Activity Log
                </h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                  {currentOrder.timeline.map((step, idx) => <div key={idx} className="relative">
                      {
    /* Node Bullet */
  }
                      <div
    className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 transition-all ${step.done ? "bg-emerald-600 border-white dark:border-slate-900 ring-2 ring-emerald-500/20" : "bg-slate-200 dark:bg-slate-800 border-white dark:border-slate-900"}`}
  />

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
    className={`text-xs font-bold ${step.done ? "text-slate-900 dark:text-white" : "text-slate-400"}`}
  >
                            {step.title}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">· {step.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>

            {
    /* Delivery Agent and Address Snapshot */
  }
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Delivery Destination
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {currentOrder.shippingAddress.fullName}
                </p>
                <p className="text-slate-500">
                  {currentOrder.shippingAddress.houseNo}, {currentOrder.shippingAddress.street}
                </p>
                <p className="text-slate-500">
                  {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} - {currentOrder.shippingAddress.pincode}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  Delivery Schedule
                </span>
                <p className="text-slate-500">Expected by:</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {currentOrder.expectedDeliveryDate}
                </p>
                <p className="text-[11px] text-slate-400">
                  Secure OTP delivery enabled. Verification code sent on registered mobile.
                </p>
              </div>
            </div>
          </div>
        </div> : <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-4">
          <p className="text-sm text-slate-500">No active shipment found to track.</p>
          <button
    onClick={() => navigate("home")}
    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
  >
            Start Shopping
          </button>
        </div>}
    </div>;
};
export {
  OrderTrackingView
};
