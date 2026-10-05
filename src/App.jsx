/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { ShoppingCart } from "lucide-react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ToastContainer } from "./components/ToastContainer";
import { HomeView } from "./views/HomeView";
import { ProductsView } from "./views/ProductsView";
import { ProductDetailsView } from "./views/ProductDetailsView";
import { CategoriesView } from "./views/CategoriesView";
import { CartView } from "./views/CartView";
import { WishlistView } from "./views/WishlistView";
import { CheckoutView } from "./views/CheckoutView";
import { OrderSuccessView } from "./views/OrderSuccessView";
import { OrderTrackingView } from "./views/OrderTrackingView";
import { AccountView } from "./views/AccountView";
import { AuthViews } from "./views/AuthViews";
const AppContent = () => {
  const { currentView, cart, navigate } = useApp();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return <HomeView />;
      case "products":
        return <ProductsView />;
      case "product-details":
        return <ProductDetailsView />;
      case "categories":
        return <CategoriesView />;
      case "cart":
        return <CartView />;
      case "wishlist":
        return <WishlistView />;
      case "checkout":
        return <CheckoutView />;
      case "order-success":
        return <OrderSuccessView />;
      case "tracking":
        return <OrderTrackingView />;
      case "account":
        return <AccountView />;
      case "login":
        return <AuthViews initialMode="login" />;
      case "register":
        return <AuthViews initialMode="register" />;
      default:
        return <HomeView />;
    }
  };
  return <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1">
        {renderCurrentView()}
      </main>

      <Footer />

      {
    /* Floating mobile cart button */
  }
      {cartCount > 0 && currentView !== "cart" && currentView !== "checkout" && <button
    onClick={() => navigate("cart")}
    className="md:hidden fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-amber-500 text-slate-950 shadow-xl flex items-center justify-center font-bold hover:scale-105 active:scale-95 transition-transform"
    aria-label="View Cart"
  >
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-950 text-amber-400 text-[10px] font-black flex items-center justify-center border-2 border-white dark:border-slate-900">
            {cartCount}
          </span>
        </button>}

      <ToastContainer />
    </div>;
};
function App() {
  return <AppProvider>
      <AppContent />
    </AppProvider>;
}
export {
  App as default
};
