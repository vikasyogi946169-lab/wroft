import { useState } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Tag,
  Check,
  ChevronRight,
  Share2,
  MapPin,
  ArrowRight
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { ProductCard } from "../components/ProductCard";
const ProductDetailsView = () => {
  const {
    products,
    selectedProductId,
    navigate,
    addToCart,
    buyNow,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    showToast
  } = useApp();
  const product = products.find((p) => p.id === selectedProductId) || products[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : "");
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : "");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("560038");
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const wishlisted = isInWishlist(product.id);
  const images = product.thumbnails && product.thumbnails.length > 0 ? product.thumbnails : [product.image, product.image, product.image];
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeChecked(true);
      showToast(`Express Delivery is available for PIN ${pincode}!`, "success");
    } else {
      showToast("Please enter a valid 6-digit Indian PIN code", "error");
    }
  };
  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast("Product link copied to clipboard!", "info");
  };
  const savings = product.originalPrice - product.price;
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      {
    /* Breadcrumb Navigation */
  }
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <button onClick={() => navigate("home")} className="hover:text-blue-600 transition-colors cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
    onClick={() => navigate("products", { category: product.category })}
    className="hover:text-blue-600 transition-colors capitalize cursor-pointer"
  >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-medium truncate max-w-xs">
          {product.title}
        </span>
      </nav>

      {
    /* Main PDP Grid: Gallery Left + Purchase Module Right */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {
    /* Left Column: Gallery & Action CTAs */
  }
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 relative flex flex-col items-center justify-center min-h-[400px]">
            {
    /* Wishlist and Share Floating Buttons */
  }
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
    onClick={handleShare}
    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
    title="Share Product"
  >
                <Share2 className="w-4 h-4" />
              </button>
              <button
    onClick={() => toggleWishlist(product)}
    className={`p-2 rounded-full transition-colors cursor-pointer ${wishlisted ? "bg-rose-50 text-rose-500 dark:bg-rose-950/60" : "bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-500"}`}
    title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
  >
                <Heart className={`w-4 h-4 ${wishlisted ? "fill-rose-500" : ""}`} />
              </button>
            </div>

            {
    /* Discount Badge */
  }
            {product.discountPercent > 0 && <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-1 rounded-lg">
                {product.discountPercent}% OFF
              </div>}

            {
    /* Primary Main Image */
  }
            <div className="w-full max-w-md aspect-square flex items-center justify-center p-4">
              <img
    src={images[activeImageIndex] || product.image}
    alt={product.title}
    className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal transition-all duration-300"
    referrerPolicy="no-referrer"
  />
            </div>

            {
    /* Thumbnails Strip */
  }
            <div className="flex items-center gap-3 mt-4">
              {images.map((img, idx) => <button
    key={idx}
    onClick={() => setActiveImageIndex(idx)}
    className={`w-16 h-16 rounded-xl border-2 p-1 bg-slate-50 dark:bg-slate-800 transition-all cursor-pointer ${activeImageIndex === idx ? "border-blue-600 scale-105" : "border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100"}`}
  >
                  <img
    src={img}
    alt={`${product.title} view ${idx + 1}`}
    className="w-full h-full object-contain"
    referrerPolicy="no-referrer"
  />
                </button>)}
            </div>
          </div>

          {
    /* Quick Buy Bar */
  }
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
    onClick={() => addToCart(product, quantity, selectedColor, selectedSize)}
    className="py-3.5 px-4 rounded-xl border-2 border-blue-600 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-bold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
  >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
            <button
    onClick={() => buyNow(product, quantity, selectedColor, selectedSize)}
    className="py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/20"
  >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>

        {
    /* Right Column: Contiguous Purchase Module & Details */
  }
        <div className="lg:col-span-6 space-y-6">
          {
    /* Header Info */
  }
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
              <span>{product.brand}</span>
              <span>·</span>
              <span>{product.subcategory}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-display leading-snug">
              {product.title}
            </h1>

            {
    /* Ratings and Reviews */
  }
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-xs font-bold">
                <span>{product.rating.toFixed(1)}</span>
                <Star className="w-3.5 h-3.5 fill-white" />
              </div>
              <span className="text-xs text-slate-500 tabular-nums">
                {product.reviewsCount.toLocaleString("en-IN")} Ratings & Reviews
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> WROFT Assured
              </span>
            </div>
          </div>

          {
    /* Pricing Module */
  }
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-display tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && <span className="text-base text-slate-400 line-through tabular-nums">
                  {formatPrice(product.originalPrice)}
                </span>}
              {product.discountPercent > 0 && <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {product.discountPercent}% OFF
                </span>}
            </div>
            {savings > 0 && <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                You save {formatPrice(savings)} inclusive of all taxes
              </p>}
          </div>

          {
    /* Bank Offers & Coupons */
  }
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              Available Offers & Discounts
            </h4>
            <div className="space-y-2">
              {product.offers && product.offers.map((offer, idx) => <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{offer}</span>
                </div>)}
            </div>
          </div>

          {
    /* Variants Selector */
  }
          <div className="space-y-4 pt-2 border-t border-slate-200/80 dark:border-slate-800">
            {
    /* Color Selector */
  }
            {product.colors && product.colors.length > 0 && <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block">
                  Color: <span className="font-normal text-slate-500">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => <button
    key={color}
    onClick={() => setSelectedColor(color)}
    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${selectedColor === color ? "bg-blue-600 text-white shadow-xs" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"}`}
  >
                      {color}
                    </button>)}
                </div>
              </div>}

            {
    /* Size / Storage Selector */
  }
            {product.sizes && product.sizes.length > 0 && <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block">
                  Configuration / Size: <span className="font-normal text-slate-500">{selectedSize}</span>
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.sizes.map((size) => <button
    key={size}
    onClick={() => setSelectedSize(size)}
    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${selectedSize === size ? "border-2 border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold" : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50"}`}
  >
                      {size}
                    </button>)}
                </div>
              </div>}

            {
    /* Quantity Stepper */
  }
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block">
                Quantity:
              </label>
              <div className="inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                <button
    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
    className="px-3 py-1.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-l-xl transition-colors cursor-pointer"
  >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                  {quantity}
                </span>
                <button
    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
    className="px-3 py-1.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-r-xl transition-colors cursor-pointer"
  >
                  +
                </button>
              </div>
            </div>
          </div>

          {
    /* Delivery & PIN Code Checker */
  }
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Delivery Options
            </h4>
            <form onSubmit={handlePincodeCheck} className="flex gap-2 max-w-xs mb-2">
              <input
    type="text"
    maxLength={6}
    value={pincode}
    onChange={(e) => setPincode(e.target.value)}
    placeholder="Enter 6 digit PIN"
    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-mono"
  />
              <button
    type="submit"
    className="px-3 py-1.5 bg-slate-900 dark:bg-slate-700 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
  >
                Check
              </button>
            </form>

            {pincodeChecked && <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 pt-1">
                <p className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <Check className="w-3.5 h-3.5" /> FREE Delivery by Tomorrow, 5 PM to {pincode}
                </p>
                <p className="text-slate-400 text-[11px]">
                  Cash on Delivery (COD) available · 7 Days Replacement Policy
                </p>
              </div>}
          </div>

          {
    /* Highlights */
  }
          {product.highlights && product.highlights.length > 0 && <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Key Features
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {product.highlights.map((item, idx) => <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span>{item}</span>
                  </li>)}
              </ul>
            </div>}

          {
    /* Trust Guarantee Cards */
  }
          <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <Truck className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="font-bold text-slate-800 dark:text-slate-200">Express Delivery</p>
              <p className="text-[10px] text-slate-400">Within 24 Hours</p>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <RotateCcw className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <p className="font-bold text-slate-800 dark:text-slate-200">7-Day Returns</p>
              <p className="text-[10px] text-slate-400">No questions asked</p>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <p className="font-bold text-slate-800 dark:text-slate-200">1 Year Warranty</p>
              <p className="text-[10px] text-slate-400">Brand authorized</p>
            </div>
          </div>
        </div>
      </div>

      {
    /* Specifications & Description Section */
  }
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-2">
            Product Description
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.description}
          </p>
        </div>

        {
    /* Technical Specs Table */
  }
        {product.specs && Object.keys(product.specs).length > 0 && <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-4">
              Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {Object.entries(product.specs).map(([key, val]) => <div key={key} className="flex py-2 border-b border-slate-100 dark:border-slate-800/80 text-xs">
                  <span className="w-1/3 text-slate-400 font-medium">{key}</span>
                  <span className="w-2/3 text-slate-800 dark:text-slate-200 font-semibold">{val}</span>
                </div>)}
            </div>
          </div>}
      </section>

      {
    /* Related Products */
  }
      {relatedProducts.length > 0 && <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              Similar Products in {product.category.toUpperCase()}
            </h3>
            <button
    onClick={() => navigate("products", { category: product.category })}
    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
  >
              <span>View Department</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((rel) => <ProductCard key={rel.id} product={rel} />)}
          </div>
        </section>}
    </div>;
};
export {
  ProductDetailsView
};
