import {
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
  BookOpen,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { CATEGORIES_LIST } from "../data/products";
const CategoriesView = () => {
  const { navigate, setSelectedCategory } = useApp();
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case "Smartphone":
        return <Smartphone className="w-6 h-6" />;
      case "Headphones":
        return <Headphones className="w-6 h-6" />;
      case "Laptop":
        return <Laptop className="w-6 h-6" />;
      case "Shirt":
        return <Shirt className="w-6 h-6" />;
      case "Footprints":
        return <Footprints className="w-6 h-6" />;
      case "ShoppingBag":
        return <ShoppingBag className="w-6 h-6" />;
      case "Utensils":
        return <Utensils className="w-6 h-6" />;
      case "Armchair":
        return <Armchair className="w-6 h-6" />;
      case "Tv":
        return <Tv className="w-6 h-6" />;
      case "Flame":
        return <Flame className="w-6 h-6" />;
      case "Gamepad2":
        return <Gamepad2 className="w-6 h-6" />;
      case "Dumbbell":
        return <Dumbbell className="w-6 h-6" />;
      case "BookOpen":
        return <BookOpen className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };
  const handleSelect = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate("products", { category: categoryId });
  };
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {
    /* Title */
  }
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">
          All Shopping Categories
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore over 15 distinct departments across tech, fashion, lifestyle, home and daily essentials
        </p>
      </div>

      {
    /* Categories Grid */
  }
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {CATEGORIES_LIST.map((cat) => <div
    key={cat.id}
    onClick={() => handleSelect(cat.id)}
    className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 flex flex-col justify-between hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 cursor-pointer overflow-hidden"
  >
            <div>
              {
    /* Category Featured Image/Backdrop */
  }
              <div className="w-full aspect-16/9 rounded-2xl bg-slate-50 dark:bg-slate-800 p-3 mb-4 overflow-hidden relative flex items-center justify-center">
                <img
    src={cat.featuredImage}
    alt={cat.name}
    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300 opacity-90"
    referrerPolicy="no-referrer"
  />
                <div className="absolute top-2 left-2 p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 text-blue-600 dark:text-blue-400 shadow-xs backdrop-blur-xs">
                  {getCategoryIcon(cat.icon)}
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-400 tabular-nums">
                {cat.itemCount}+ Products
              </span>
              <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>)}
      </div>
    </div>;
};
export {
  CategoriesView
};
