import { useState } from "react";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
  ShieldCheck,
  Plus
} from "lucide-react";
import { useApp } from "../context/AppContext";
const AccountView = () => {
  const {
    user,
    orders,
    wishlist,
    logout,
    navigate,
    formatPrice,
    updateUserProfile,
    addAddress,
    showToast
  } = useApp();
  const [activeTab, setActiveTab] = useState("orders");
  const [name, setName] = useState(user?.name || "Vikas Yogi");
  const [email, setEmail] = useState(user?.email || "vikasyogi946169@gmail.com");
  const [mobile, setMobile] = useState(user?.mobile || "9461692840");
  const [gender, setGender] = useState(user?.gender || "Male");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: user?.name || "",
    mobile: user?.mobile || "",
    houseNo: "",
    street: "",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "",
    type: "Home"
  });
  const handleProfileSave = (e) => {
    e.preventDefault();
    updateUserProfile({ name, email, mobile, gender });
  };
  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.mobile || !newAddr.pincode || !newAddr.houseNo) {
      showToast("Please fill all required address fields", "error");
      return;
    }
    addAddress(newAddr);
    setShowAddressModal(false);
  };
  if (!user) {
    return <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Please login to view your account
        </h2>
        <p className="text-xs text-slate-500">
          Access your orders, saved addresses, wishlist, and recommendations.
        </p>
        <button
      onClick={() => navigate("login")}
      className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
    >
          Login to WROFT
        </button>
      </div>;
  }
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {
    /* Account Header Banner */
  }
      <div className="bg-linear-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl font-black font-display shadow-inner">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
              {user.name}
            </h1>
            <p className="text-xs text-blue-200">
              {user.email} · {user.mobile}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified WROFT Member
              </span>
            </div>
          </div>
        </div>

        <button
    onClick={logout}
    className="self-start sm:self-center px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-colors flex items-center gap-1.5 cursor-pointer"
  >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>

      {
    /* Main Grid: Sidebar Tabs + Tab Content */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {
    /* Navigation Sidebar */
  }
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3 space-y-1 shadow-2xs">
          <button
    onClick={() => setActiveTab("orders")}
    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${activeTab === "orders" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
  >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-blue-500" />
              <span>My Orders</span>
            </div>
            <span className="text-[11px] text-slate-400 tabular-nums font-bold">
              {orders.length}
            </span>
          </button>

          <button
    onClick={() => setActiveTab("profile")}
    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${activeTab === "profile" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
  >
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-indigo-500" />
              <span>Personal Profile</span>
            </div>
          </button>

          <button
    onClick={() => navigate("wishlist")}
    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
  >
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>My Wishlist</span>
            </div>
            <span className="text-[11px] text-slate-400 tabular-nums font-bold">
              {wishlist.length}
            </span>
          </button>

          <button
    onClick={() => setActiveTab("addresses")}
    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${activeTab === "addresses" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
  >
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Saved Addresses</span>
            </div>
            <span className="text-[11px] text-slate-400 tabular-nums font-bold">
              {user.addresses.length}
            </span>
          </button>

          <button
    onClick={() => setActiveTab("payments")}
    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${activeTab === "payments" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
  >
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-4 h-4 text-emerald-500" />
              <span>Payment Methods</span>
            </div>
          </button>

          <button
    onClick={() => setActiveTab("notifications")}
    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${activeTab === "notifications" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
  >
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-cyan-500" />
              <span>Notifications</span>
            </div>
          </button>
        </div>

        {
    /* Tab Content Display */
  }
        <div className="lg:col-span-9 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          {
    /* TAB: MY ORDERS */
  }
          {activeTab === "orders" && <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                  My Orders ({orders.length})
                </h2>
                <span className="text-xs text-slate-400">All shipments tracked live</span>
              </div>

              {orders.length > 0 ? <div className="space-y-4">
                  {orders.map((order) => <div
    key={order.id}
    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
  >
                      {
    /* Order Header */
  }
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white text-sm font-mono">
                            #{order.id}
                          </span>
                          <span className="text-slate-400 ml-2">Placed on {order.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[11px] font-bold uppercase tracking-wider">
                            {order.status.replace(/_/g, " ")}
                          </span>
                          <span className="font-black text-slate-900 dark:text-white tabular-nums">
                            {formatPrice(order.totalAmount)}
                          </span>
                        </div>
                      </div>

                      {
    /* Items Preview */
  }
                      <div className="space-y-2">
                        {order.items.map((item, idx) => <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 p-1 shrink-0">
                                <img
    src={item.product.image}
    alt={item.product.title}
    className="w-full h-full object-contain"
  />
                              </div>
                              <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                                {item.product.title} (x{item.quantity})
                              </span>
                            </div>
                            <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>)}
                      </div>

                      {
    /* Action Links */
  }
                      <div className="pt-2 flex items-center justify-between text-xs">
                        <span className="text-slate-500">
                          Expected Delivery: <strong className="text-slate-800 dark:text-slate-200">{order.expectedDeliveryDate}</strong>
                        </span>
                        <button
    onClick={() => navigate("tracking", { orderId: order.id })}
    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors cursor-pointer"
  >
                          Track Package
                        </button>
                      </div>
                    </div>)}
                </div> : <div className="py-12 text-center text-slate-400">
                  <p>You have no recent orders.</p>
                </div>}
            </div>}

          {
    /* TAB: PERSONAL PROFILE */
  }
          {activeTab === "profile" && <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display pb-4 border-b border-slate-100 dark:border-slate-800">
                Personal Information
              </h2>

              <form onSubmit={handleProfileSave} className="space-y-4 max-w-lg">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    Full Name
                  </label>
                  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    Email Address
                  </label>
                  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    Mobile Number
                  </label>
                  <input
    type="tel"
    value={mobile}
    onChange={(e) => setMobile(e.target.value)}
    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono"
  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    Gender
                  </label>
                  <div className="flex gap-4 text-xs">
                    {["Male", "Female", "Other"].map((g) => <label key={g} className="flex items-center gap-1.5 cursor-pointer">
                        <input
    type="radio"
    name="gender"
    checked={gender === g}
    onChange={() => setGender(g)}
  />
                        <span>{g}</span>
                      </label>)}
                  </div>
                </div>

                <div className="pt-2">
                  <button
    type="submit"
    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>}

          {
    /* TAB: SAVED ADDRESSES */
  }
          {activeTab === "addresses" && <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                  Manage Addresses ({user.addresses.length})
                </h2>
                <button
    onClick={() => setShowAddressModal(true)}
    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
  >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="space-y-3">
                {user.addresses.map((addr, idx) => <div
    key={idx}
    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-1 relative"
  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {addr.fullName}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold">
                        {addr.type}
                      </span>
                      <span className="text-slate-400 font-semibold">{addr.mobile}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      {addr.houseNo}, {addr.street}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 font-semibold">
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                  </div>)}
              </div>
            </div>}

          {
    /* TAB: PAYMENTS */
  }
          {activeTab === "payments" && <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display pb-4 border-b border-slate-100 dark:border-slate-800">
                Saved Payment Methods
              </h2>
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center font-bold">
                      UPI
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">vikasyogi@okhdfcbank</p>
                      <p className="text-slate-400 text-[11px]">Primary Virtual Payment Address (VPA)</p>
                    </div>
                  </div>
                  <span className="text-emerald-600 font-bold">Verified</span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white font-mono">HDFC Millennia Credit Card (•••• 8912)</p>
                      <p className="text-slate-400 text-[11px]">Expires 08/28</p>
                    </div>
                  </div>
                  <span className="text-slate-400 font-medium">Saved</span>
                </div>
              </div>
            </div>}

          {
    /* TAB: NOTIFICATIONS */
  }
          {activeTab === "notifications" && <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display pb-4 border-b border-slate-100 dark:border-slate-800">
                Recent Notifications & Alerts
              </h2>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 space-y-1">
                  <p className="font-bold text-blue-900 dark:text-blue-300">
                    Flash Sale is Live: Extra 10% on Electronics
                  </p>
                  <p className="text-slate-500">
                    Exclusive coupon code FLASH10 auto-applied on checkout for next 4 hours.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 space-y-1">
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    Order #WROFT-89304 Dispatched
                  </p>
                  <p className="text-slate-500">
                    Your package has departed the Bengaluru sorting facility via WROFT Express.
                  </p>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export {
  AccountView
};
