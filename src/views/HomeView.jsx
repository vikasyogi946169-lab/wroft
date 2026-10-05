import { useState, useEffect } from "react";
import {
  Sparkles,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  Percent,
  Truck,
  ShieldCheck,
  ChevronRight,
  Smartphone,
  Headphones,
  Laptop,
  Shirt,
  Footprints,
  ShoppingBag,
  Utensils,
  Armchair,
  Tv,
  Flame,
  Gamepad2,
  Dumbbell,
  BookOpen
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { BANNER_HERO, CATEGORIES_LIST } from "../data/products";
import { ProductCard } from "../components/ProductCard";
const HomeView = () => {
  const { products, navigate, setSelectedCategory } = useApp();
  const [activeTab, setActiveTab] = useState("all");
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 18
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 8, minutes: 0, seconds: 0 };
        }
      });
    }, 1e3);
    return () => clearInterval(timer);
  }, []);
  const formatDigits = (num) => num.toString().padStart(2, "0");
  const flashSaleProducts = products.filter((p) => p.isFlashSale).slice(0, 4);
  const trendingProducts = products.filter((p) => activeTab === "all" ? true : p.category === activeTab).slice(0, 8);
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case "Smartphone":
        return <Smartphone className="w-5 h-5" />;
      case "Headphones":
        return <Headphones className="w-5 h-5" />;
      case "Laptop":
        return <Laptop className="w-5 h-5" />;
      case "Shirt":
        return <Shirt className="w-5 h-5" />;
      case "Footprints":
        return <Footprints className="w-5 h-5" />;
      case "ShoppingBag":
        return <ShoppingBag className="w-5 h-5" />;
      case "Utensils":
        return <Utensils className="w-5 h-5" />;
      case "Armchair":
        return <Armchair className="w-5 h-5" />;
      case "Tv":
        return <Tv className="w-5 h-5" />;
      case "Flame":
        return <Flame className="w-5 h-5" />;
      case "Gamepad2":
        return <Gamepad2 className="w-5 h-5" />;
      case "Dumbbell":
        return <Dumbbell className="w-5 h-5" />;
      case "BookOpen":
        return <BookOpen className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category.id);
    navigate("products", { category: category.id });
  };
  return <div className="space-y-10 pb-16">
      {
    /* Hero Section */
  }
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 text-white min-h-[420px] md:min-h-[460px] flex items-center shadow-xl">
          {
    /* Background Image with Measured Contrast Scrim */
  }
          <div className="absolute inset-0">
            <img
    src={BANNER_HERO}
    alt="WROFT Big Shopping Deals"
    className="w-full h-full object-cover object-center opacity-45 dark:opacity-35"
    referrerPolicy="no-referrer"
  />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          </div>

          {
    /* Hero Content */
  }
          <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-4 backdrop-blur-xs">
              <Zap className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
              <span>Big Shopping Days · Mega Price Drops</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-display mb-4 leading-none">
              Big Shopping. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-400">
                Better Prices.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed max-w-lg">
              Discover millions of products at amazing prices. Up to 70% off on flagship smartphones, trending fashion, laptops, and smart home appliances with guaranteed 24-hr express delivery.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
    onClick={() => navigate("products")}
    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 hover:scale-102 transition-all flex items-center gap-2 cursor-pointer"
  >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
    onClick={() => {
      const element = document.getElementById("flash-sale-section");
      element?.scrollIntoView({ behavior: "smooth" });
    }}
    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-xs transition-colors flex items-center gap-2 cursor-pointer"
  >
                <Percent className="w-4 h-4 text-amber-400" />
                <span>Explore Deals</span>
              </button>
            </div>

            {
    /* Quick Metrics */
  }
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Free Shipping ₹499+</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>100% Brand Authentic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>7-Day Return Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {
    /* Categories Grid Section */
  }
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
              Shop by Category
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Explore 15 curated departments with verified customer ratings
            </p>
          </div>
          <button
    onClick={() => navigate("categories")}
    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
  >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4">
          {CATEGORIES_LIST.map((category) => <button
    key={category.id}
    onClick={() => handleCategoryClick(category)}
    className="group p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col items-center text-center hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
  >
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2.5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {getCategoryIcon(category.icon)}
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                {category.name}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 tabular-nums">
                {category.itemCount}+ items
              </span>
            </button>)}
        </div>
      </section>

      {
    /* Flash Sale Section with Countdown Timer */
  }
      <section id="flash-sale-section" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-linear-to-r from-rose-900 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white border border-rose-800/40 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Zap className="w-4 h-4 fill-rose-400" />
                <span>Limited Time Lightning Deals</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
                Flash Sale Mega Bonanza
              </h2>
            </div>

            {
    /* Countdown Box */
  }
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300 mr-1">Flash Sale Ends In:</span>
              <div className="flex items-center gap-1.5 font-mono text-sm font-black">
                <div className="px-2.5 py-1.5 rounded-lg bg-rose-600 text-white shadow-xs">
                  {formatDigits(timeLeft.hours)}
                </div>
                <span className="text-rose-400 font-bold">:</span>
                <div className="px-2.5 py-1.5 rounded-lg bg-rose-600 text-white shadow-xs">
                  {formatDigits(timeLeft.minutes)}
                </div>
                <span className="text-rose-400 font-bold">:</span>
                <div className="px-2.5 py-1.5 rounded-lg bg-rose-600 text-white shadow-xs">
                  {formatDigits(timeLeft.seconds)}
                </div>
              </div>
            </div>
          </div>

          {
    /* Flash Sale Products Grid */
  }
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {flashSaleProducts.map((product) => <ProductCard key={product.id} product={product} showBuyNow={true} />)}
          </div>
        </div>
      </section>

      {
    /* Promotional Banners Section */
  }
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-linear-to-br from-amber-500 to-orange-600 p-6 text-slate-950 flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider bg-slate-950/10 px-2.5 py-1 rounded-md">
                Weekend Bonanza
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-display mt-3 leading-tight">
                Up to 70% OFF <br />
                Flagship Audio & Gadgets
              </h3>
            </div>
            <div className="mt-5">
              <button
    onClick={() => navigate("products", { category: "electronics" })}
    className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
  >
                <span>Grab Deals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-linear-to-br from-blue-600 to-indigo-800 p-6 text-white flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-md">
                Fast & Reliable
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-display mt-3 leading-tight">
                Free Delivery on <br />
                Orders Above ₹499
              </h3>
            </div>
            <div className="mt-5">
              <button
    onClick={() => navigate("products")}
    className="px-4 py-2 bg-white hover:bg-slate-100 text-blue-900 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
  >
                <span>Browse Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-linear-to-br from-emerald-600 to-teal-800 p-6 text-white flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-md">
                Smart Home & Kitchen
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-display mt-3 leading-tight">
                Air Fryers & Espresso <br />
                Starting from ₹3,899
              </h3>
            </div>
            <div className="mt-5">
              <button
    onClick={() => navigate("products", { category: "appliances" })}
    className="px-4 py-2 bg-white hover:bg-slate-100 text-emerald-950 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
  >
                <span>Explore Appliances</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {
    /* Trending Products Grid */
  }
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Curated Marketplace</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
              Trending Products on WROFT
            </h2>
          </div>

          {
    /* Interactive Filter Tabs */
  }
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto no-scrollbar">
            {[
    { id: "all", label: "All Picks" },
    { id: "mobiles", label: "Smartphones" },
    { id: "fashion", label: "Fashion" },
    { id: "electronics", label: "Audio & Tech" },
    { id: "appliances", label: "Appliances" }
  ].map((tab) => <button
    key={tab.id}
    onClick={() => setActiveTab(tab.id)}
    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${activeTab === tab.id ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
  >
                {tab.label}
              </button>)}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>

        <div className="mt-8 text-center">
          <button
    onClick={() => navigate("products")}
    className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
  >
            <span>Explore All 45+ Products in Store</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>;
};
export {
  HomeView
};
