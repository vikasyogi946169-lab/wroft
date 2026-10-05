import {
  Trash2,
  Bookmark,
  ShieldCheck,
  Truck,
  ArrowRight,
  ShoppingBag,
  Plus,
  Minus,
  Tag
} from "lucide-react";
import { useApp } from "../context/AppContext";
const CartView = () => {
  const {
    cart,
    savedForLater,
    updateQuantity,
    removeFromCart,
    saveForLater,
    moveToCartFromSaved,
    navigate,
    formatPrice,
    user
  } = useApp();
  const totalMRP = cart.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountOnMRP = totalMRP - subtotal;
  const deliveryCharge = subtotal >= 499 || cart.length === 0 ? 0 : 49;
  const totalAmount = subtotal + deliveryCharge;
  if (cart.length === 0 && savedForLater.length === 0) {
    return <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-5">
        <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Looks like you haven't added anything to your cart yet. Explore our trending products, lightning deals, and seasonal discounts!
        </p>
        <button
      onClick={() => navigate("products")}
      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
    >
          <span>Start Shopping Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>;
  }
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {
    /* Page Title */
  }
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
            Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
          </h1>
          <p className="text-xs text-slate-500">
            {deliveryCharge === 0 ? "\u2713 Free Express Delivery eligible" : "Add items worth \u20B9" + (499 - subtotal) + " more for FREE delivery"}
          </p>
        </div>

        {user && user.addresses.length > 0 && <div className="hidden sm:block text-right text-xs">
            <span className="text-slate-400">Deliver to: </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {user.addresses[0].fullName}, {user.addresses[0].pincode}
            </span>
          </div>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {
    /* Left Column: Cart Items List */
  }
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => <div
    key={`${item.product.id}-${item.selectedColor || ""}-${item.selectedSize || ""}`}
    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
  >
              {
    /* Product Info */
  }
              <div className="flex items-center gap-4">
                <div
    onClick={() => navigate("product-details", { productId: item.product.id })}
    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-50 dark:bg-slate-800 p-2 shrink-0 cursor-pointer flex items-center justify-center"
  >
                  <img
    src={item.product.image}
    alt={item.product.title}
    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
    referrerPolicy="no-referrer"
  />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {item.product.brand}
                  </span>
                  <h3
    onClick={() => navigate("product-details", { productId: item.product.id })}
    className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer"
  >
                    {item.product.title}
                  </h3>

                  {(item.selectedColor || item.selectedSize) && <div className="flex items-center gap-2 text-xs text-slate-500">
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      {item.selectedColor && item.selectedSize && <span>·</span>}
                      {item.selectedSize && <span>Size/Storage: {item.selectedSize}</span>}
                    </div>}

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
                      {formatPrice(item.product.price)}
                    </span>
                    {item.product.originalPrice > item.product.price && <span className="text-xs text-slate-400 line-through tabular-nums">
                        {formatPrice(item.product.originalPrice)}
                      </span>}
                    {item.product.discountPercent > 0 && <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {item.product.discountPercent}% off
                      </span>}
                  </div>
                </div>
              </div>

              {
    /* Quantity Controls & Actions */
  }
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 gap-3">
                {
    /* Quantity Stepper */
  }
                <div className="inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                  <button
    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
    className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors cursor-pointer"
    title="Decrease quantity"
  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                    {item.quantity}
                  </span>
                  <button
    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
    className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors cursor-pointer"
    title="Increase quantity"
  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {
    /* Subtotal */
  }
                <div className="text-right">
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>

                {
    /* Action Buttons */
  }
                <div className="flex items-center gap-2">
                  <button
    onClick={() => saveForLater(item.product.id)}
    className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
    title="Save for Later"
  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Save</span>
                  </button>
                  <button
    onClick={() => removeFromCart(item.product.id)}
    className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
    title="Remove item"
  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </div>)}

          {
    /* Saved For Later Section */
  }
          {savedForLater.length > 0 && <div className="pt-8 space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                Saved for Later ({savedForLater.length})
              </h2>
              <div className="space-y-3">
                {savedForLater.map((item) => <div
    key={item.product.id}
    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 flex items-center justify-between gap-4"
  >
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-xl bg-slate-50 dark:bg-slate-800 p-2 shrink-0">
                        <img
    src={item.product.image}
    alt={item.product.title}
    className="w-full h-full object-contain"
  />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                          {item.product.title}
                        </h4>
                        <p className="text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>
                    </div>

                    <button
    onClick={() => moveToCartFromSaved(item.product.id)}
    className="px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-100 transition-colors cursor-pointer"
  >
                      Move to Cart
                    </button>
                  </div>)}
              </div>
            </div>}
        </div>

        {
    /* Right Column: Order Summary & Checkout CTA */
  }
        <div className="lg:col-span-4 space-y-4 sticky top-24">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-5 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display border-b border-slate-100 dark:border-slate-800 pb-3">
              Price Details
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Total MRP ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                  {formatPrice(totalMRP)}
                </span>
              </div>

              {discountOnMRP > 0 && <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Discount on MRP</span>
                  <span className="tabular-nums">- {formatPrice(discountOnMRP)}</span>
                </div>}

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Delivery Charges</span>
                {deliveryCharge === 0 ? <span className="font-bold text-emerald-600 dark:text-emerald-400">FREE</span> : <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                    {formatPrice(deliveryCharge)}
                  </span>}
              </div>

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Packaging & Platform Fee</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline text-sm font-bold text-slate-900 dark:text-white">
                <span>Total Amount</span>
                <span className="text-xl font-black font-display text-blue-600 dark:text-blue-400 tabular-nums">
                  {formatPrice(totalAmount)}
                </span>
              </div>
            </div>

            {discountOnMRP > 0 && <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 shrink-0" />
                <span>You will save {formatPrice(discountOnMRP)} on this order!</span>
              </div>}

            <button
    onClick={() => navigate("checkout")}
    disabled={cart.length === 0}
    className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-black text-sm transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
  >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {
    /* Trust Guarantees */
  }
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe and Secure Payments. Easy returns.</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>100% Authentic products guaranteed.</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export {
  CartView
};
