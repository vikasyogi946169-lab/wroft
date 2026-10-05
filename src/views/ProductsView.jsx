import { useState, useMemo } from "react";
import {
  Filter,
  SlidersHorizontal,
  X,
  ChevronRight,
  Search
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { ProductCard } from "../components/ProductCard";
import { CATEGORIES_LIST } from "../data/products";
const ProductsView = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    navigate,
    formatPrice
  } = useApp();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(15e4);
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const allBrands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort();
  }, [products]);
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesSub = product.subcategory.toLowerCase().includes(query);
        if (!matchesTitle && !matchesBrand && !matchesCat && !matchesSub) return false;
      }
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      if (product.price > maxPrice) {
        return false;
      }
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }
      if (minDiscount > 0 && product.discountPercent < minDiscount) {
        return false;
      }
      if (inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return b.id.localeCompare(a.id);
      return b.reviewsCount - a.reviewsCount;
    });
  }, [products, searchQuery, selectedCategory, selectedBrands, maxPrice, minRating, minDiscount, inStockOnly, sortBy]);
  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const toggleBrand = (brand) => {
    setSelectedBrands(
      (prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };
  const handleResetFilters = () => {
    setSelectedBrands([]);
    setMaxPrice(15e4);
    setMinRating(0);
    setMinDiscount(0);
    setInStockOnly(false);
    setSelectedCategory(null);
    setSearchQuery("");
  };
  const activeFiltersCount = (selectedCategory ? 1 : 0) + selectedBrands.length + (maxPrice < 15e4 ? 1 : 0) + (minRating > 0 ? 1 : 0) + (minDiscount > 0 ? 1 : 0) + (inStockOnly ? 1 : 0) + (searchQuery ? 1 : 0);
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {
    /* Breadcrumb Navigation */
  }
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <button onClick={() => navigate("home")} className="hover:text-blue-600 transition-colors cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-medium">All Products</span>
        {selectedCategory && <>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-blue-600 font-semibold capitalize">{selectedCategory}</span>
          </>}
        {searchQuery && <>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-700 dark:text-slate-300">"{searchQuery}"</span>
          </>}
      </nav>

      {
    /* Main Grid: Filters Sidebar + Catalog */
  }
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {
    /* Desktop Filter Sidebar */
  }
        <aside className="hidden lg:block w-72 shrink-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Filters</span>
              {activeFiltersCount > 0 && <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                  {activeFiltersCount}
                </span>}
            </div>
            {activeFiltersCount > 0 && <button
    onClick={handleResetFilters}
    className="text-xs font-semibold text-rose-500 hover:underline cursor-pointer"
  >
                Clear All
              </button>}
          </div>

          {
    /* Category Filter */
  }
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Department
            </h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              <button
    onClick={() => setSelectedCategory(null)}
    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${selectedCategory === null ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
  >
                All Departments
              </button>
              {CATEGORIES_LIST.map((cat) => <button
    key={cat.id}
    onClick={() => setSelectedCategory(cat.id)}
    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${selectedCategory === cat.id ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
  >
                  <span>{cat.name}</span>
                  <span className="text-[11px] text-slate-400 tabular-nums">{cat.itemCount}</span>
                </button>)}
            </div>
          </div>

          {
    /* Price Range Slider */
  }
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Max Price
              </h4>
              <span className="text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                {formatPrice(maxPrice)}
              </span>
            </div>
            <input
    type="range"
    min="500"
    max="150000"
    step="500"
    value={maxPrice}
    onChange={(e) => setMaxPrice(Number(e.target.value))}
    className="w-full accent-blue-600 cursor-pointer"
  />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>₹500</span>
              <span>₹1,50,000</span>
            </div>
          </div>

          {
    /* Brands Filter */
  }
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Brand
            </h4>
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {allBrands.map((brand) => <label
    key={brand}
    className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white"
  >
                  <input
    type="checkbox"
    checked={selectedBrands.includes(brand)}
    onChange={() => toggleBrand(brand)}
    className="rounded-sm text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700"
  />
                  <span>{brand}</span>
                </label>)}
            </div>
          </div>

          {
    /* Customer Rating Filter */
  }
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Customer Rating
            </h4>
            <div className="space-y-1">
              {[4, 3].map((star) => <button
    key={star}
    onClick={() => setMinRating(minRating === star ? 0 : star)}
    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${minRating === star ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
  >
                  <span className="flex items-center gap-1">
                    {star}★ and above
                  </span>
                  {minRating === star && <span className="text-[10px]">Active</span>}
                </button>)}
            </div>
          </div>

          {
    /* Discount Filter */
  }
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Discount
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {[10, 20, 30, 50].map((disc) => <button
    key={disc}
    onClick={() => setMinDiscount(minDiscount === disc ? 0 : disc)}
    className={`py-1 px-2 rounded-lg text-xs font-semibold text-center border transition-colors cursor-pointer ${minDiscount === disc ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-600" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"}`}
  >
                  {disc}% or more
                </button>)}
            </div>
          </div>

          {
    /* In Stock Toggle */
  }
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
              <span>In Stock Only</span>
              <input
    type="checkbox"
    checked={inStockOnly}
    onChange={(e) => setInStockOnly(e.target.checked)}
    className="w-4 h-4 text-blue-600 rounded-sm"
  />
            </label>
          </div>
        </aside>

        {
    /* Catalog Main Content */
  }
        <div className="flex-1 w-full space-y-4">
          {
    /* Header Bar: Item count, sort dropdown, mobile filter button */
  }
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                {selectedCategory ? `${selectedCategory.toUpperCase()} Catalog` : "Explore All Products"}
              </h2>
              <p className="text-xs text-slate-500 tabular-nums">
                Showing {filteredProducts.length} verified products
              </p>
            </div>

            <div className="flex items-center gap-2">
              {
    /* Mobile Filter Trigger */
  }
              <button
    onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
    className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white"
  >
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}</span>
              </button>

              {
    /* Sort By Dropdown */
  }
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span className="hidden sm:inline">Sort By:</span>
                <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
  >
                  <option value="popularity">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>
          </div>

          {
    /* Active Filter Chips */
  }
          {activeFiltersCount > 0 && <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-slate-400 font-medium">Applied:</span>
              {selectedCategory && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory(null)} className="cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>}
              {selectedBrands.map((b) => <span
    key={b}
    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
  >
                  {b}
                  <button onClick={() => toggleBrand(b)} className="cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>)}
              {searchQuery && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>}
              {minRating > 0 && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-semibold">
                  {minRating}★ and above
                  <button onClick={() => setMinRating(0)} className="cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>}
              <button
    onClick={handleResetFilters}
    className="text-xs text-rose-500 hover:underline font-semibold ml-1 cursor-pointer"
  >
                Clear All
              </button>
            </div>}

          {
    /* Product Cards Grid */
  }
          {displayedProducts.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {displayedProducts.map((product) => <ProductCard key={product.id} product={product} showBuyNow={true} />)}
            </div> : (
    /* Empty State */
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Sorry, no matching products found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                We couldn't find any products matching your current filters. Try resetting your search or broadening the price range.
              </p>
              <button
      onClick={handleResetFilters}
      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
    >
                Reset All Filters
              </button>
            </div>
  )}

          {
    /* Load More Button */
  }
          {filteredProducts.length > visibleCount && <div className="pt-6 text-center">
              <button
    onClick={() => setVisibleCount((prev) => prev + 12)}
    className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all shadow-xs cursor-pointer"
  >
                Load More Products ({filteredProducts.length - visibleCount} remaining)
              </button>
            </div>}
        </div>
      </div>
    </div>;
};
export {
  ProductsView
};
