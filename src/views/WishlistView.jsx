import { Heart, ShoppingCart, Trash2, Star, ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext";
const WishlistView = () => {
  const {
    wishlist,
    products,
    toggleWishlist,
    moveToCartFromWishlist,
    navigate,
    formatPrice
  } = useApp();
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));
  if (wishlistedProducts.length === 0) {
    return <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-5">
        <div className="w-20 h-20 rounded-3xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto shadow-sm">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
          Your Wishlist is Empty
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Save items that you like in your wishlist. Review them anytime and easily move them to your cart.
        </p>
        <button
      onClick={() => navigate("products")}
      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
    >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>;
  }
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {
    /* Header */
  }
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
            My Wishlist ({wishlistedProducts.length} Items)
          </h1>
          <p className="text-xs text-slate-500">
            Saved items remain synced to your account
          </p>
        </div>
        <button
    onClick={() => navigate("products")}
    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
  >
          <span>Continue Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {
    /* Wishlist Items Grid */
  }
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlistedProducts.map((product) => <div
    key={product.id}
    className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 flex flex-col justify-between hover:shadow-lg transition-all"
  >
            <div>
              {
    /* Image & Remove */
  }
              <div className="relative w-full aspect-4/3 rounded-xl bg-slate-50 dark:bg-slate-800 p-3 mb-3 flex items-center justify-center overflow-hidden">
                <img
    src={product.image}
    alt={product.title}
    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform"
    referrerPolicy="no-referrer"
  />
                <button
    onClick={() => toggleWishlist(product)}
    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-400 hover:text-rose-500 shadow-xs transition-colors cursor-pointer"
    title="Remove from wishlist"
  >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {
    /* Title & Brand */
  }
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {product.brand}
              </span>
              <h3
    onClick={() => navigate("product-details", { productId: product.id })}
    className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer mb-2"
  >
                {product.title}
              </h3>

              {
    /* Rating */
  }
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-600 text-white text-xs font-bold">
                  <span>{product.rating.toFixed(1)}</span>
                  <Star className="w-3 h-3 fill-white" />
                </div>
                <span className="text-xs text-slate-400 tabular-nums">
                  ({product.reviewsCount.toLocaleString("en-IN")})
                </span>
              </div>

              {
    /* Price */
  }
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && <span className="text-xs text-slate-400 line-through tabular-nums">
                    {formatPrice(product.originalPrice)}
                  </span>}
                {product.discountPercent > 0 && <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {product.discountPercent}% off
                  </span>}
              </div>
            </div>

            {
    /* Move to Cart CTA */
  }
            <button
    onClick={() => moveToCartFromWishlist(product)}
    className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
  >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Move to Cart</span>
            </button>
          </div>)}
      </div>
    </div>;
};
export {
  WishlistView
};
