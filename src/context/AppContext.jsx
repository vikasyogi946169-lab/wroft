import { createContext, useContext, useState, useEffect } from "react";
import { SAMPLE_PRODUCTS } from "../data/products";
const AppContext = createContext(void 0);
const INITIAL_USER = {
  name: "Vikas Yogi",
  email: "vikasyogi946169@gmail.com",
  mobile: "9461692840",
  gender: "Male",
  addresses: [
    {
      id: "addr-1",
      fullName: "Vikas Yogi",
      mobile: "9461692840",
      houseNo: "Flat 402, Skyline Residency",
      street: "12th Main, 5th Cross, Indiranagar",
      landmark: "Near Metro Station",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      type: "Home",
      isDefault: true
    },
    {
      id: "addr-2",
      fullName: "Vikas Yogi (Office)",
      mobile: "9461692840",
      houseNo: "Block B, 3rd Floor, Tech Park",
      street: "Outer Ring Road, Bellandur",
      landmark: "EcoSpace IT Hub",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560103",
      type: "Work",
      isDefault: false
    }
  ]
};
const INITIAL_SAMPLE_ORDER = {
  id: "WROFT-89304",
  date: new Date(Date.now() - 36 * 3600 * 1e3).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }),
  items: [
    {
      product: SAMPLE_PRODUCTS[0],
      // WROFT Titan Pro 5G
      quantity: 1,
      selectedColor: "Celestial Blue",
      selectedSize: "256 GB"
    },
    {
      product: SAMPLE_PRODUCTS[8],
      // Vintage Denim Jacket
      quantity: 1,
      selectedColor: "Washed Indigo",
      selectedSize: "L"
    }
  ],
  subtotal: 37498,
  discount: 12499,
  deliveryFee: 0,
  tax: 0,
  totalAmount: 37498,
  shippingAddress: INITIAL_USER.addresses[0],
  paymentMethod: "UPI",
  paymentDetails: "vikasyogi@okhdfcbank",
  status: "shipped",
  courierName: "WROFT Express Logistics",
  trackingNumber: "WFX9823419082IN",
  expectedDeliveryDate: new Date(Date.now() + 48 * 3600 * 1e3).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short"
  }),
  timeline: [
    {
      status: "placed",
      title: "Order Placed",
      time: "Yesterday, 10:14 AM",
      description: "Your order has been received and verified by WROFT Secure Engine.",
      done: true
    },
    {
      status: "confirmed",
      title: "Order Confirmed",
      time: "Yesterday, 10:20 AM",
      description: "Seller has accepted your order and prepared item manifest.",
      done: true
    },
    {
      status: "packed",
      title: "Packed & Quality Verified",
      time: "Yesterday, 04:45 PM",
      description: "Item safely packaged with tamper-proof seal in Bengaluru Hub.",
      done: true
    },
    {
      status: "shipped",
      title: "Shipped (In Transit)",
      time: "Today, 06:15 AM",
      description: "Handed over to WROFT Express courier partner. Tracking ID: WFX9823419082IN",
      done: true,
      current: true
    },
    {
      status: "out_for_delivery",
      title: "Out for Delivery",
      time: "Expected Tomorrow morning",
      description: "Delivery agent will contact you before arriving.",
      done: false
    },
    {
      status: "delivered",
      title: "Delivered",
      time: "Expected Tomorrow, 04:00 PM",
      description: "Package delivered at your doorstep with verified OTP.",
      done: false
    }
  ]
};
const AppProvider = ({ children }) => {
  const [products] = useState(SAMPLE_PRODUCTS);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("wroft_cart");
      if (saved) return JSON.parse(saved);
    } catch {
    }
    return [
      { product: SAMPLE_PRODUCTS[0], quantity: 1, selectedColor: "Celestial Blue", selectedSize: "256 GB" },
      { product: SAMPLE_PRODUCTS[4], quantity: 1, selectedColor: "Matte Black" }
    ];
  });
  const [savedForLater, setSavedForLater] = useState(() => {
    try {
      const saved = localStorage.getItem("wroft_saved_later");
      if (saved) return JSON.parse(saved);
    } catch {
    }
    return [{ product: SAMPLE_PRODUCTS[8], quantity: 1, selectedSize: "L" }];
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("wroft_wishlist");
      if (saved) return JSON.parse(saved);
    } catch {
    }
    return ["mob-01", "elec-01", "app-01", "furn-01"];
  });
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("wroft_orders");
      if (saved) return JSON.parse(saved);
    } catch {
    }
    return [INITIAL_SAMPLE_ORDER];
  });
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("wroft_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name && parsed.name.includes("Sharma")) {
          parsed.name = "Vikas Yogi";
          parsed.email = "vikasyogi946169@gmail.com";
          if (parsed.addresses) {
            parsed.addresses = parsed.addresses.map((a) => ({
              ...a,
              fullName: (a.fullName || '').replace("Sharma", "Yogi")
            }));
          }
        }
        return parsed;
      }
    } catch {
    }
    return INITIAL_USER;
  });
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("wroft_theme");
      if (saved === "dark" || saved === "light") return saved;
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    } catch {
    }
    return "light";
  });
  const [currentView, setCurrentView] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [activeOrderId, setActiveOrderId] = useState("WROFT-89304");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    try {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      localStorage.setItem("wroft_theme", theme);
    } catch {
    }
  }, [theme]);
  useEffect(() => {
    try {
      localStorage.setItem("wroft_cart", JSON.stringify(cart));
    } catch {
    }
  }, [cart]);
  useEffect(() => {
    try {
      localStorage.setItem("wroft_saved_later", JSON.stringify(savedForLater));
    } catch {
    }
  }, [savedForLater]);
  useEffect(() => {
    try {
      localStorage.setItem("wroft_wishlist", JSON.stringify(wishlist));
    } catch {
    }
  }, [wishlist]);
  useEffect(() => {
    try {
      localStorage.setItem("wroft_orders", JSON.stringify(orders));
    } catch {
    }
  }, [orders]);
  useEffect(() => {
    try {
      if (user) localStorage.setItem("wroft_user", JSON.stringify(user));
      else localStorage.removeItem("wroft_user");
    } catch {
    }
  }, [user]);
  const showToast = (message, type = "success") => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };
  const formatPrice = (amount) => {
    return "\u20B9" + amount.toLocaleString("en-IN");
  };
  const navigate = (view, options) => {
    if (options?.productId) {
      setSelectedProductId(options.productId);
    }
    if (options?.orderId) {
      setActiveOrderId(options.orderId);
    }
    if (options?.category !== void 0) {
      setSelectedCategory(options.category);
    }
    if (options?.query !== void 0) {
      setSearchQuery(options.query);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleTheme = () => {
    setTheme((prev) => prev === "light" ? "dark" : "light");
    showToast(`Switched to ${theme === "light" ? "Dark" : "Light"} mode`, "info");
  };
  const addToCart = (product, quantity = 1, selectedColor, selectedSize) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedColor, selectedSize }];
      }
    });
    showToast("Product added to cart successfully!");
  };
  const buyNow = (product, quantity = 1, selectedColor, selectedSize) => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate("checkout");
  };
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Item removed from cart", "info");
  };
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(
      (prev) => prev.map((item) => item.product.id === productId ? { ...item, quantity } : item)
    );
  };
  const saveForLater = (productId) => {
    const item = cart.find((i) => i.product.id === productId);
    if (!item) return;
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    setSavedForLater((prev) => {
      if (prev.some((i) => i.product.id === productId)) return prev;
      return [...prev, item];
    });
    showToast("Item moved to Saved For Later", "info");
  };
  const moveToCartFromSaved = (productId) => {
    const item = savedForLater.find((i) => i.product.id === productId);
    if (!item) return;
    setSavedForLater((prev) => prev.filter((i) => i.product.id !== productId));
    setCart((prev) => [...prev, item]);
    showToast("Moved back to cart");
  };
  const clearCart = () => {
    setCart([]);
  };
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed from Wishlist: ${product.title.slice(0, 24)}...`, "info");
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Added to Wishlist: ${product.title.slice(0, 24)}...`, "success");
        return [...prev, product.id];
      }
    });
  };
  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };
  const moveToCartFromWishlist = (product) => {
    addToCart(product);
    setWishlist((prev) => prev.filter((id) => id !== product.id));
  };
  const placeOrder = (shippingAddress, paymentMethod, paymentDetails) => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const originalSum = cart.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
    const discount = originalSum - subtotal;
    const deliveryFee = subtotal >= 499 ? 0 : 49;
    const totalAmount = subtotal + deliveryFee;
    const orderId = `WROFT-${Math.floor(1e5 + Math.random() * 9e5)}`;
    const now = /* @__PURE__ */ new Date();
    const newOrder = {
      id: orderId,
      date: now.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      items: [...cart],
      subtotal,
      discount,
      deliveryFee,
      tax: 0,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentDetails,
      status: "confirmed",
      courierName: "WROFT SuperFast Logistics",
      trackingNumber: `WFX${Math.floor(1e9 + Math.random() * 9e9)}IN`,
      expectedDeliveryDate: new Date(Date.now() + 72 * 3600 * 1e3).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "short"
      }),
      timeline: [
        {
          status: "placed",
          title: "Order Placed",
          time: "Just now",
          description: "Payment authorized and order registered with WROFT systems.",
          done: true
        },
        {
          status: "confirmed",
          title: "Order Confirmed",
          time: "Just now",
          description: "Seller has received your order request and reserved your units.",
          done: true,
          current: true
        },
        {
          status: "packed",
          title: "Packing in Hub",
          time: "Expected within 6 hours",
          description: "Item will be inspected, barcoded and packed.",
          done: false
        },
        {
          status: "shipped",
          title: "Shipped",
          time: "Expected tomorrow",
          description: "Courier partner will pick up package for transit.",
          done: false
        },
        {
          status: "out_for_delivery",
          title: "Out for Delivery",
          time: "Expected in 2 days",
          description: "Delivery associate will call you prior to delivery.",
          done: false
        },
        {
          status: "delivered",
          title: "Delivered",
          time: "Expected in 3 days",
          description: "Will be delivered to your registered delivery address.",
          done: false
        }
      ]
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setActiveOrderId(orderId);
    showToast("Order Placed Successfully!", "success");
    navigate("order-success", { orderId });
    return newOrder;
  };
  const cancelOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast(`Order ${orderId} has been cancelled`, "info");
  };
  const advanceOrderTracking = (orderId) => {
    setOrders(
      (prev) => prev.map((order) => {
        if (order.id !== orderId) return order;
        const steps = [
          "placed",
          "confirmed",
          "packed",
          "shipped",
          "out_for_delivery",
          "delivered"
        ];
        const currentIndex = steps.indexOf(order.status);
        if (currentIndex >= steps.length - 1) {
          showToast("Order is already fully delivered!", "info");
          return order;
        }
        const nextStatus = steps[currentIndex + 1];
        const nextTimeline = order.timeline.map((step, idx) => {
          if (idx <= currentIndex + 1) {
            return {
              ...step,
              done: true,
              current: idx === currentIndex + 1,
              time: "Just now"
            };
          }
          return { ...step, done: false, current: false };
        });
        showToast(`Order updated to: ${nextStatus.toUpperCase().replace(/_/g, " ")}!`, "success");
        return {
          ...order,
          status: nextStatus,
          timeline: nextTimeline
        };
      })
    );
  };
  const login = (emailOrMobile) => {
    const isMobile = /^\d+$/.test(emailOrMobile);
    setUser({
      name: isMobile ? "WROFT Shopper" : emailOrMobile.split("@")[0],
      email: isMobile ? "user@wroft.in" : emailOrMobile,
      mobile: isMobile ? emailOrMobile : "9876543210",
      addresses: INITIAL_USER.addresses
    });
    showToast("Logged in successfully!");
    navigate("home");
  };
  const register = (fullName, mobile, email) => {
    setUser({
      name: fullName,
      email,
      mobile,
      addresses: [
        {
          fullName,
          mobile,
          houseNo: "House #12",
          street: "Main Market Road",
          city: "New Delhi",
          state: "Delhi",
          pincode: "110001",
          type: "Home",
          isDefault: true
        }
      ]
    });
    showToast("Account registered successfully! Welcome to WROFT.");
    navigate("home");
  };
  const logout = () => {
    setUser(null);
    showToast("Logged out of your WROFT account", "info");
    navigate("home");
  };
  const updateUserProfile = (profile) => {
    if (!user) return;
    setUser({ ...user, ...profile });
    showToast("Profile information updated successfully");
  };
  const addAddress = (address) => {
    if (!user) return;
    const newAddresses = [...user.addresses, { ...address, id: `addr-${Date.now()}` }];
    setUser({ ...user, addresses: newAddresses });
    showToast("New shipping address saved");
  };
  return <AppContext.Provider
    value={{
      products,
      cart,
      savedForLater,
      wishlist,
      orders,
      user,
      theme,
      currentView,
      selectedProductId,
      activeOrderId,
      selectedCategory,
      searchQuery,
      toasts,
      navigate,
      addToCart,
      buyNow,
      removeFromCart,
      updateQuantity,
      saveForLater,
      moveToCartFromSaved,
      clearCart,
      toggleWishlist,
      isInWishlist,
      moveToCartFromWishlist,
      placeOrder,
      cancelOrder,
      advanceOrderTracking,
      login,
      register,
      logout,
      updateUserProfile,
      addAddress,
      toggleTheme,
      setSearchQuery,
      setSelectedCategory,
      showToast,
      formatPrice
    }}
  >
      {children}
    </AppContext.Provider>;
};
const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
export {
  AppProvider,
  useApp
};
