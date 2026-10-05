import {
  CheckCircle2,
  MapPin,
  Calendar,
  CreditCard,
  ArrowRight,
  ShoppingBag,
  Download
} from "lucide-react";
import { useApp } from "../context/AppContext";
const OrderSuccessView = () => {
  const { orders, activeOrderId, navigate, formatPrice, showToast } = useApp();
  const currentOrder = orders.find((o) => o.id === activeOrderId) || orders[0];
  if (!currentOrder) {
    return <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">No order details found</h2>
        <button
      onClick={() => navigate("home")}
      className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
    >
          Return to Home
        </button>
      </div>;
  }
  const handleDownloadInvoice = () => {
    showToast(`Invoice for ${currentOrder.id} downloaded successfully!`, "success");
  };
  return <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {
    /* Success Hero Header */
  }
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner animate-pulse-subtle">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
          Order Confirmed
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">
          Thank you for shopping with WROFT!
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Your order has been verified and forwarded to our fulfillment hub. A confirmation SMS & email have been sent.
        </p>
      </div>

      {
    /* Order Info Card */
  }
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        {
    /* Order Meta Bar */
  }
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Order Reference
            </span>
            <div className="text-base sm:text-lg font-black font-mono text-blue-600 dark:text-blue-400">
              #{currentOrder.id}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
    onClick={handleDownloadInvoice}
    className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
  >
              <Download className="w-3.5 h-3.5" />
              <span>Download Invoice</span>
            </button>
          </div>
        </div>

        {
    /* Expected Delivery Date Highlight */
  }
        <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-[11px] text-blue-700 dark:text-blue-300 font-medium">
                Estimated Delivery Date
              </p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {currentOrder.expectedDeliveryDate}
              </p>
            </div>
          </div>
          <button
    onClick={() => navigate("tracking", { orderId: currentOrder.id })}
    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
  >
            <span>Track Order</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {
    /* Ordered Items List */
  }
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Items in this shipment ({currentOrder.items.length})
          </h3>
          <div className="space-y-3">
            {currentOrder.items.map((item, idx) => <div
    key={idx}
    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs"
  >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-800 p-1 shrink-0">
                    <img
    src={item.product.image}
    alt={item.product.title}
    className="w-full h-full object-contain"
  />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">
                      {item.product.title}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Qty: {item.quantity} · {formatPrice(item.product.price)} each
                    </p>
                  </div>
                </div>
                <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>)}
          </div>
        </div>

        {
    /* Shipping & Payment Meta */
  }
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Delivery Address:
            </span>
            <p className="font-bold text-slate-900 dark:text-white">
              {currentOrder.shippingAddress.fullName} ({currentOrder.shippingAddress.type})
            </p>
            <p className="text-slate-500">
              {currentOrder.shippingAddress.houseNo}, {currentOrder.shippingAddress.street}
            </p>
            <p className="text-slate-500">
              {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} - {currentOrder.shippingAddress.pincode}
            </p>
            <p className="text-slate-500 font-medium">Mobile: {currentOrder.shippingAddress.mobile}</p>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-blue-600" />
              Payment Details:
            </span>
            <p className="font-bold text-slate-900 dark:text-white">
              {currentOrder.paymentMethod}
            </p>
            {currentOrder.paymentDetails && <p className="text-slate-500">{currentOrder.paymentDetails}</p>}
            <div className="pt-2 text-sm">
              <span className="text-slate-400 text-xs font-semibold">Total Amount Paid: </span>
              <span className="font-black text-slate-900 dark:text-white font-display tabular-nums">
                {formatPrice(currentOrder.totalAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {
    /* Action Buttons */
  }
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
    onClick={() => navigate("tracking", { orderId: currentOrder.id })}
    className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 inline-flex items-center justify-center gap-2 cursor-pointer"
  >
          <span>Track Order Progress</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
    onClick={() => navigate("products")}
    className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
  >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>
    </div>;
};
export {
  OrderSuccessView
};
