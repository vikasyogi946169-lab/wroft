import { Star, Heart, ShoppingCart, Zap, Check } from "lucide-react";
import { useApp } from "../context/AppContext";
const ProductCard = ({ product, showBuyNow = false }) => {
  const { navigate, addToCart, buyNow, toggleWishlist, isInWishlist, formatPrice } = useApp();
  const wishlisted = isInWishlist(product.id);
  const handleCardClick = (e) => {
    if (e.target.closest("button")) return;
    navigate("product-details", { productId: product.id });
  };
  return <div
    onClick={handleCardClick}
    className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3.5 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-950/60 hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden"
  >
      <div>
        {
    /* Top Badges & Wishlist Action */
  }
        <div className="flex items-center justify-between gap-1 mb-2 relative z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {product.discountPercent >= 40 && <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-bold">
                {product.discountPercent}% OFF
              </span>}
            {product.isFlashSale && <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-extrabold uppercase tracking-tight flex items-center gap-0.5">
                <Zap className="w-3 h-3 fill-rose-500" />
                Flash
              </span>}
            {product.isBestSeller && <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold">
                Top Rated
              </span>}
          </div>

          <button
    onClick={(e) => {
      e.stopPropagation();
      toggleWishlist(product);
    }}
    className={`p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${wishlisted ? "bg-rose-50 text-rose-500 dark:bg-rose-950/50" : "bg-slate-100/80 dark:bg-slate-800/80 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"}`}
    title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
    aria-label="Wishlist"
  >
            <Heart className={`w-4 h-4 ${wishlisted ? "fill-rose-500" : ""}`} />
          </button>
        </div>

        {
    /* Product Image Showcase */
  }
        <div className="w-full aspect-4/3 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 mb-3 flex items-center justify-center overflow-hidden relative">
          <img
    src={product.image}
    alt={product.title}
    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-300"
    referrerPolicy="no-referrer"
    loading="lazy"
  />
          {product.fastDelivery && <div className="absolute bottom-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-xs">
              <Check className="w-3 h-3" /> 24hr Express
            </div>}
        </div>

        {
    /* Brand & Category quiet metadata */
  }
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 font-medium mb-1 uppercase tracking-wider">
          <span>{product.brand}</span>
          <span aria-hidden="true">·</span>
          <span>{product.subcategory}</span>
        </div>

        {
    /* Product Title */
  }
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
          {product.title}
        </h3>

        {
    /* Rating and Reviews */
  }
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-600 text-white text-xs font-bold">
            <span>{product.rating.toFixed(1)}</span>
            <Star className="w-3 h-3 fill-white" />
          </div>
          <span className="text-xs text-slate-400 tabular-nums">
            ({product.reviewsCount.toLocaleString("en-IN")})
          </span>
        </div>
      </div>

      {
    /* Pricing & Cart Action */
  }
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tabular-nums">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && <span className="text-xs text-slate-400 line-through tabular-nums">
              {formatPrice(product.originalPrice)}
            </span>}
        </div>

        <div className="grid grid-cols-1 gap-2">
          {showBuyNow ? <div className="grid grid-cols-2 gap-2">
              <button
    onClick={(e) => {
      e.stopPropagation();
      addToCart(product);
    }}
    className="py-2 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
  >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
              <button
    onClick={(e) => {
      e.stopPropagation();
      buyNow(product);
    }}
    className="py-2 px-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
  >
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
                <span>Buy</span>
              </button>
            </div> : <button
    onClick={(e) => {
      e.stopPropagation();
      addToCart(product);
    }}
    className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer"
  >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>}
        </div>
      </div>
    </div>;
};
export {
  ProductCard
};
