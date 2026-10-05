import { useState, useRef, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Sun,
  Moon,
  Menu,
  X,
  Package,
  ChevronDown,
  Sparkles,
  Zap,
  LogOut,
  MapPin,
  ArrowRight
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { CATEGORIES_LIST } from "../data/products";
const Navbar = () => {
  const {
    cart,
    wishlist,
    user,
    theme,
    toggleTheme,
    navigate,
    currentView,
    searchQuery,
    setSearchQuery,
    products,
    formatPrice,
    logout
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const searchContainerRef = useRef(null);
  const userDropdownRef = useRef(null);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchFocused(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);
  const matchingSuggestions = searchInput.trim().length > 1 ? products.filter(
    (p) => p.title.toLowerCase().includes(searchInput.toLowerCase()) || p.category.toLowerCase().includes(searchInput.toLowerCase()) || p.brand.toLowerCase().includes(searchInput.toLowerCase())
  ).slice(0, 5) : [];
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
      navigate("products", { query: searchInput.trim() });
      setSearchFocused(false);
      setMobileMenuOpen(false);
    }
  };
  const handleSelectSuggestion = (productId) => {
    setSearchFocused(false);
    navigate("product-details", { productId });
  };
  return <header className="sticky top-0 z-40 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
      {
    /* Top Notice Bar */
  }
      <div className="bg-slate-900 dark:bg-slate-950 text-slate-100 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              Big Shopping Deals: Extra 10% Instant Discount on HDFC & ICICI
            </span>
            <span className="text-slate-500">|</span>
            <span>Free Express Delivery above ₹499 across 19,000+ PIN Codes</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer" onClick={() => navigate("tracking")}>
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              Track Order
            </span>
            <span className="text-slate-600">·</span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate("account")}>
              24x7 Help Center
            </span>
          </div>
        </div>
      </div>

      {
    /* Main Navbar */
  }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-8">
          {
    /* Brand Logo & Mobile Menu Toggle */
  }
          <div className="flex items-center gap-3">
            <button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
    aria-label="Toggle Navigation"
  >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {
    /* WROFT Logo */
  }
            <button
    onClick={() => navigate("home")}
    className="flex items-center gap-2 group text-left cursor-pointer focus-visible:outline-hidden"
  >
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-xl tracking-tighter font-display">W</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  WROFT
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-600 dark:text-amber-400 -mt-1">
                  Marketplace
                </span>
              </div>
            </button>
          </div>

          {
    /* Desktop Search Bar */
  }
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-2xl relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
    type="text"
    placeholder="Search for smartphones, wireless headphones, fashion, laptops..."
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
    onFocus={() => setSearchFocused(true)}
    className="w-full pl-11 pr-24 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all shadow-2xs"
  />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <button
    type="submit"
    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
  >
                Search
              </button>
            </form>

            {
    /* Live Autocomplete Dropdown */
  }
            {searchFocused && matchingSuggestions.length > 0 && <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 overflow-hidden">
                <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                  Matching Products
                </div>
                {matchingSuggestions.map((item) => <button
    key={item.id}
    onClick={() => handleSelectSuggestion(item.id)}
    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-slate-100 dark:bg-slate-800 p-1 shrink-0 flex items-center justify-center">
                        <img
    src={item.image}
    alt={item.title}
    className="w-full h-full object-contain"
    referrerPolicy="no-referrer"
  />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white line-clamp-1">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-400 capitalize">
                          {item.brand} · in {item.category}
                        </div>
                      </div>
                    </div>
                    <div className="text-right pl-3 shrink-0">
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {formatPrice(item.price)}
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        {item.discountPercent}% off
                      </div>
                    </div>
                  </button>)}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-1 px-3 py-1 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Press <span className="font-semibold text-slate-700 dark:text-slate-300">Enter</span> to view all results
                  </span>
                  <button
    onClick={handleSearchSubmit}
    className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
  >
                    View all matching products <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>}
          </div>

          {
    /* Right Action Icons & Profile */
  }
          <div className="flex items-center gap-1.5 sm:gap-3">
            {
    /* Theme Toggle Button */
  }
            <button
    onClick={toggleTheme}
    className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
    title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
    aria-label="Toggle Theme"
  >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
            </button>

            {
    /* Wishlist Link */
  }
            <button
    onClick={() => navigate("wishlist")}
    className={`p-2.5 rounded-xl relative text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ${currentView === "wishlist" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : ""}`}
    title="My Wishlist"
    aria-label="Wishlist"
  >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>}
            </button>

            {
    /* Shopping Cart Link */
  }
            <button
    onClick={() => navigate("cart")}
    className={`flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ${currentView === "cart" ? "bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400" : ""}`}
    title="View Cart"
    aria-label="Cart"
  >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalCartCount > 0 && <span className="absolute -top-2 -right-2.5 w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[11px] font-extrabold flex items-center justify-center shadow-xs animate-bounce">
                    {totalCartCount}
                  </span>}
              </div>
              <span className="hidden sm:inline text-xs font-bold tracking-tight">Cart</span>
            </button>

            {
    /* Account / Login Dropdown */
  }
            <div ref={userDropdownRef} className="relative">
              {user ? <button
    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold transition-colors cursor-pointer"
  >
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:inline max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button> : <button
    onClick={() => navigate("login")}
    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
  >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </button>}

              {
    /* User Dropdown Menu */
  }
              {userDropdownOpen && user && <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  </div>
                  <button
    onClick={() => {
      setUserDropdownOpen(false);
      navigate("account");
    }}
    className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors cursor-pointer"
  >
                    <User className="w-4 h-4 text-slate-400" />
                    My Profile
                  </button>
                  <button
    onClick={() => {
      setUserDropdownOpen(false);
      navigate("account");
    }}
    className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors cursor-pointer"
  >
                    <Package className="w-4 h-4 text-slate-400" />
                    My Orders
                  </button>
                  <button
    onClick={() => {
      setUserDropdownOpen(false);
      navigate("wishlist");
    }}
    className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors cursor-pointer"
  >
                    <Heart className="w-4 h-4 text-slate-400" />
                    My Wishlist ({wishlist.length})
                  </button>
                  <button
    onClick={() => {
      setUserDropdownOpen(false);
      navigate("tracking");
    }}
    className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors cursor-pointer"
  >
                    <MapPin className="w-4 h-4 text-slate-400" />
                    Track Shipment
                  </button>
                  <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
                  <button
    onClick={() => {
      setUserDropdownOpen(false);
      logout();
    }}
    className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2.5 transition-colors cursor-pointer"
  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>}
            </div>
          </div>
        </div>

        {
    /* Mobile Search Bar */
  }
        <div className="mt-2.5 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
    type="text"
    placeholder="Search products, brands and deals..."
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
    className="w-full pl-10 pr-20 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
  />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
    type="submit"
    className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-bold"
  >
              Search
            </button>
          </form>
        </div>
      </div>

      {
    /* Horizontal Category Navigation Bar */
  }
      <nav className="bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <button
    onClick={() => navigate("home")}
    className={`px-3 py-1 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap cursor-pointer ${currentView === "home" ? "text-blue-600 dark:text-blue-400 font-bold" : ""}`}
  >
              Home
            </button>
            <button
    onClick={() => navigate("categories")}
    className="px-3 py-1 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap cursor-pointer"
  >
              All Categories
            </button>
            <button
    onClick={() => navigate("products", { category: "mobiles" })}
    className="px-3 py-1 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap cursor-pointer"
  >
              Mobiles
            </button>
            <button
    onClick={() => navigate("products", { category: "electronics" })}
    className="px-3 py-1 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap cursor-pointer"
  >
              Electronics
            </button>
            <button
    onClick={() => navigate("products", { category: "laptops" })}
    className="px-3 py-1 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap cursor-pointer"
  >
              Laptops
            </button>
            <button
    onClick={() => navigate("products", { category: "fashion" })}
    className="px-3 py-1 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap cursor-pointer"
  >
              Fashion
            </button>
            <button
    onClick={() => navigate("products", { category: "grocery" })}
    className="px-3 py-1 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap cursor-pointer"
  >
              Grocery
            </button>
            <button
    onClick={() => navigate("products", { category: "appliances" })}
    className="px-3 py-1 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap cursor-pointer"
  >
              Appliances
            </button>
            <button
    onClick={() => navigate("products", { category: "beauty" })}
    className="px-3 py-1 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap cursor-pointer"
  >
              Beauty
            </button>
            <button
    onClick={() => navigate("products")}
    className="px-3 py-1 rounded-lg text-amber-600 dark:text-amber-400 hover:text-amber-700 font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
  >
              <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              Super Deals
            </button>
          </div>
        </div>
      </nav>

      {
    /* Mobile Drawer Navigation Menu */
  }
      {mobileMenuOpen && <div className="md:hidden fixed inset-0 top-[110px] z-50 bg-slate-950/60 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white dark:bg-slate-900 h-full overflow-y-auto p-5 shadow-2xl flex flex-col justify-between">
            <div>
              {
    /* User Section */
  }
              <div className="pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
                {user ? <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.mobile}</p>
                    </div>
                  </div> : <div className="flex items-center gap-2">
                    <button
    onClick={() => {
      setMobileMenuOpen(false);
      navigate("login");
    }}
    className="flex-1 py-2 px-3 rounded-lg bg-blue-600 text-white text-xs font-bold text-center"
  >
                      Login
                    </button>
                    <button
    onClick={() => {
      setMobileMenuOpen(false);
      navigate("register");
    }}
    className="flex-1 py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white text-center"
  >
                      Register
                    </button>
                  </div>}
              </div>

              {
    /* Main Links */
  }
              <div className="space-y-1">
                <button
    onClick={() => {
      setMobileMenuOpen(false);
      navigate("home");
    }}
    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
  >
                  Home
                </button>
                <button
    onClick={() => {
      setMobileMenuOpen(false);
      navigate("products");
    }}
    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
  >
                  Explore All Products
                </button>
                <button
    onClick={() => {
      setMobileMenuOpen(false);
      navigate("categories");
    }}
    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
  >
                  Browse Categories
                </button>
                <button
    onClick={() => {
      setMobileMenuOpen(false);
      navigate("tracking");
    }}
    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
  >
                  <MapPin className="w-4 h-4 text-blue-500" />
                  Track Order
                </button>
                <button
    onClick={() => {
      setMobileMenuOpen(false);
      navigate("account");
    }}
    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
  >
                  <Package className="w-4 h-4 text-amber-500" />
                  My Orders & Profile
                </button>
              </div>

              {
    /* Popular Categories */
  }
              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Top Categories
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {CATEGORIES_LIST.slice(0, 8).map((cat) => <button
    key={cat.id}
    onClick={() => {
      setMobileMenuOpen(false);
      navigate("products", { category: cat.id });
    }}
    className="text-left py-1.5 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium truncate"
  >
                      {cat.name}
                    </button>)}
                </div>
              </div>
            </div>

            {
    /* Bottom Actions */
  }
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">Dark Theme</span>
              <button
    onClick={toggleTheme}
    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
  >
                {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>}
    </header>;
};
export {
  Navbar
};
