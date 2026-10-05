import { useState } from "react";
import {
  MapPin,
  Package,
  CreditCard,
  Check,
  Plus,
  ArrowRight,
  Smartphone,
  Building,
  Banknote,
  Lock
} from "lucide-react";
import { useApp } from "../context/AppContext";
const CheckoutView = () => {
  const { cart, user, placeOrder, navigate, formatPrice, showToast } = useApp();
  const [activeStep, setActiveStep] = useState(1);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    fullName: user?.name || "",
    mobile: user?.mobile || "",
    pincode: "560038",
    houseNo: "Flat 402, Skyline Residency",
    street: "12th Main, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    type: "Home"
  });
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [upiId, setUpiId] = useState("vikasyogi@okhdfcbank");
  const [cardNumber, setCardNumber] = useState("4532 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 8912");
  const [cardExpiry, setCardExpiry] = useState("08/28");
  const [cardCvv, setCardCvv] = useState("321");
  const [cardHolder, setCardHolder] = useState("Vikas Yogi");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const [codCaptcha, setCodCaptcha] = useState("");
  const [generatedCaptcha] = useState("7849");
  const addresses = user?.addresses || [addressForm];
  const activeAddress = addresses[selectedAddressIndex] || addressForm;
  const totalMRP = cart.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountOnMRP = totalMRP - subtotal;
  const deliveryCharge = subtotal >= 499 || cart.length === 0 ? 0 : 49;
  const totalAmount = subtotal + deliveryCharge;
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!addressForm.fullName || !addressForm.mobile || !addressForm.pincode || !addressForm.houseNo) {
      showToast("Please fill all required address fields", "error");
      return;
    }
    setShowNewAddressForm(false);
    setActiveStep(2);
  };
  const handlePlaceOrderSubmit = () => {
    if (cart.length === 0) {
      showToast("Your cart is empty", "error");
      navigate("home");
      return;
    }
    if (paymentMethod === "Cash on Delivery" && codCaptcha !== generatedCaptcha) {
      showToast(`Please enter the correct captcha code: ${generatedCaptcha}`, "error");
      return;
    }
    const paymentDetails = paymentMethod === "UPI" ? `UPI ID: ${upiId}` : paymentMethod === "Credit / Debit Card" ? `Card ending in ${cardNumber.slice(-4)}` : paymentMethod === "Net Banking" ? `Bank: ${selectedBank}` : "Cash on Delivery (Pay upon delivery)";
    placeOrder(activeAddress, paymentMethod, paymentDetails);
  };
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {
    /* Checkout Stepper Bar */
  }
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-2xs">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {
    /* Step 1 */
  }
          <div
    onClick={() => setActiveStep(1)}
    className={`flex items-center gap-2 cursor-pointer ${activeStep >= 1 ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-400"}`}
  >
            <div
    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${activeStep > 1 ? "bg-emerald-500 text-white" : activeStep === 1 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
  >
              {activeStep > 1 ? <Check className="w-4 h-4" /> : "1"}
            </div>
            <span className="text-xs sm:text-sm">Delivery Address</span>
          </div>

          <div className="flex-1 h-0.5 mx-3 bg-slate-200 dark:bg-slate-800" />

          {
    /* Step 2 */
  }
          <div
    onClick={() => activeStep >= 2 && setActiveStep(2)}
    className={`flex items-center gap-2 cursor-pointer ${activeStep >= 2 ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-400"}`}
  >
            <div
    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${activeStep > 2 ? "bg-emerald-500 text-white" : activeStep === 2 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
  >
              {activeStep > 2 ? <Check className="w-4 h-4" /> : "2"}
            </div>
            <span className="text-xs sm:text-sm">Order Summary</span>
          </div>

          <div className="flex-1 h-0.5 mx-3 bg-slate-200 dark:bg-slate-800" />

          {
    /* Step 3 */
  }
          <div
    onClick={() => activeStep >= 3 && setActiveStep(3)}
    className={`flex items-center gap-2 cursor-pointer ${activeStep === 3 ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-400"}`}
  >
            <div
    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${activeStep === 3 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
  >
              3
            </div>
            <span className="text-xs sm:text-sm">Payment</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {
    /* Main Step Content */
  }
        <div className="lg:col-span-8 space-y-6">
          {
    /* STEP 1: DELIVERY ADDRESS */
  }
          {activeStep === 1 && <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    Select Delivery Address
                  </h2>
                </div>
                <button
    onClick={() => setShowNewAddressForm(!showNewAddressForm)}
    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
  >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showNewAddressForm ? "Select Saved" : "Add New Address"}</span>
                </button>
              </div>

              {!showNewAddressForm ? <div className="space-y-3">
                  {addresses.map((addr, idx) => <label
    key={idx}
    className={`block p-4 rounded-2xl border-2 transition-all cursor-pointer ${selectedAddressIndex === idx ? "border-blue-600 bg-blue-50/40 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-800 hover:border-slate-300"}`}
  >
                      <div className="flex items-start gap-3">
                        <input
    type="radio"
    name="address"
    checked={selectedAddressIndex === idx}
    onChange={() => setSelectedAddressIndex(idx)}
    className="mt-1 text-blue-600"
  />
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white text-sm">
                              {addr.fullName}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                              {addr.type}
                            </span>
                            <span className="text-slate-500 font-semibold">{addr.mobile}</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400">
                            {addr.houseNo}, {addr.street}
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 font-semibold">
                            {addr.city}, {addr.state} - {addr.pincode}
                          </p>
                        </div>
                      </div>
                    </label>)}

                  <button
    onClick={() => setActiveStep(2)}
    className="w-full sm:w-auto mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
  >
                    <span>Deliver to This Address</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div> : (
    /* New Address Form */
    <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                        Full Name *
                      </label>
                      <input
      type="text"
      required
      value={addressForm.fullName}
      onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
    />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                        10-Digit Mobile Number *
                      </label>
                      <input
      type="tel"
      required
      maxLength={10}
      value={addressForm.mobile}
      onChange={(e) => setAddressForm({ ...addressForm, mobile: e.target.value })}
      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
    />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                        PIN Code (6 Digits) *
                      </label>
                      <input
      type="text"
      required
      maxLength={6}
      value={addressForm.pincode}
      onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-mono"
    />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                        Flat / House No., Building Name *
                      </label>
                      <input
      type="text"
      required
      value={addressForm.houseNo}
      onChange={(e) => setAddressForm({ ...addressForm, houseNo: e.target.value })}
      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
    />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                      Street / Area / Colony *
                    </label>
                    <input
      type="text"
      required
      value={addressForm.street}
      onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                        City / District *
                      </label>
                      <input
      type="text"
      required
      value={addressForm.city}
      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
    />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                        State *
                      </label>
                      <input
      type="text"
      required
      value={addressForm.state}
      onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
    />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                      Address Type
                    </label>
                    <div className="flex gap-4 text-xs">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
      type="radio"
      name="addrType"
      checked={addressForm.type === "Home"}
      onChange={() => setAddressForm({ ...addressForm, type: "Home" })}
    />
                        <span>Home (All day delivery)</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
      type="radio"
      name="addrType"
      checked={addressForm.type === "Work"}
      onChange={() => setAddressForm({ ...addressForm, type: "Work" })}
    />
                        <span>Work (Delivery between 10 AM - 6 PM)</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
      type="submit"
      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
    >
                      Save and Use Address
                    </button>
                    <button
      type="button"
      onClick={() => setShowNewAddressForm(false)}
      className="px-4 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
    >
                      Cancel
                    </button>
                  </div>
                </form>
  )}
            </div>}

          {
    /* STEP 2: ORDER SUMMARY */
  }
          {activeStep === 2 && <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    Review Order Items ({cart.length})
                  </h2>
                </div>
                <button
    onClick={() => setActiveStep(1)}
    className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
  >
                  Change Address
                </button>
              </div>

              {
    /* Delivery Address Snapshot */
  }
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-medium">Deliver to: </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {activeAddress.fullName}, {activeAddress.houseNo}, {activeAddress.street}, {activeAddress.city} - {activeAddress.pincode}
                  </span>
                </div>
              </div>

              {
    /* Cart List */
  }
              <div className="space-y-3">
                {cart.map((item, idx) => <div
    key={idx}
    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4"
  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg bg-slate-50 dark:bg-slate-800 p-1 shrink-0">
                        <img
    src={item.product.image}
    alt={item.product.title}
    className="w-full h-full object-contain"
  />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                          {item.product.title}
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Qty: {item.quantity} · {item.selectedSize ? `Size: ${item.selectedSize}` : ""}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>)}
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
    onClick={() => setActiveStep(1)}
    className="text-xs text-slate-500 hover:text-slate-800"
  >
                  Back to Address
                </button>
                <button
    onClick={() => setActiveStep(3)}
    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
  >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>}

          {
    /* STEP 3: PAYMENT METHOD */
  }
          {activeStep === 3 && <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    Select Payment Method
                  </h2>
                </div>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
                </span>
              </div>

              <div className="space-y-3">
                {
    /* UPI Option */
  }
                <label
    className={`block p-4 rounded-2xl border-2 transition-all cursor-pointer ${paymentMethod === "UPI" ? "border-blue-600 bg-blue-50/40 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-800"}`}
  >
                  <div className="flex items-start gap-3">
                    <input
    type="radio"
    name="payment"
    checked={paymentMethod === "UPI"}
    onChange={() => setPaymentMethod("UPI")}
    className="mt-1 text-blue-600"
  />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-blue-600" />
                          <span className="font-bold text-slate-900 dark:text-white text-xs">
                            UPI (PhonePe, Google Pay, Paytm, BHIM)
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                          Fastest
                        </span>
                      </div>

                      {paymentMethod === "UPI" && <div className="pt-2 space-y-2">
                          <div className="flex gap-2">
                            <input
    type="text"
    value={upiId}
    onChange={(e) => setUpiId(e.target.value)}
    placeholder="Enter your VPA / UPI ID (e.g. name@okhdfcbank)"
    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-mono"
  />
                            <button
    type="button"
    className="px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
  >
                              Verify
                            </button>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            A payment collect request will be sent to your UPI app.
                          </p>
                        </div>}
                    </div>
                  </div>
                </label>

                {
    /* Credit / Debit Card Option */
  }
                <label
    className={`block p-4 rounded-2xl border-2 transition-all cursor-pointer ${paymentMethod === "Credit / Debit Card" ? "border-blue-600 bg-blue-50/40 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-800"}`}
  >
                  <div className="flex items-start gap-3">
                    <input
    type="radio"
    name="payment"
    checked={paymentMethod === "Credit / Debit Card"}
    onChange={() => setPaymentMethod("Credit / Debit Card")}
    className="mt-1 text-blue-600"
  />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                          <span className="font-bold text-slate-900 dark:text-white text-xs">
                            Credit / Debit / ATM Card
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">Visa, Mastercard, RuPay</span>
                      </div>

                      {paymentMethod === "Credit / Debit Card" && <div className="pt-2 space-y-3">
                          <div>
                            <label className="text-[11px] font-semibold text-slate-400 mb-1 block">
                              Card Number
                            </label>
                            <input
    type="text"
    value={cardNumber}
    onChange={(e) => setCardNumber(e.target.value)}
    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono"
  />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] font-semibold text-slate-400 mb-1 block">
                                Expiry (MM/YY)
                              </label>
                              <input
    type="text"
    value={cardExpiry}
    onChange={(e) => setCardExpiry(e.target.value)}
    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono"
  />
                            </div>
                            <div>
                              <label className="text-[11px] font-semibold text-slate-400 mb-1 block">
                                CVV
                              </label>
                              <input
    type="password"
    maxLength={3}
    value={cardCvv}
    onChange={(e) => setCardCvv(e.target.value)}
    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono"
  />
                            </div>
                          </div>
                        </div>}
                    </div>
                  </div>
                </label>

                {
    /* Net Banking Option */
  }
                <label
    className={`block p-4 rounded-2xl border-2 transition-all cursor-pointer ${paymentMethod === "Net Banking" ? "border-blue-600 bg-blue-50/40 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-800"}`}
  >
                  <div className="flex items-start gap-3">
                    <input
    type="radio"
    name="payment"
    checked={paymentMethod === "Net Banking"}
    onChange={() => setPaymentMethod("Net Banking")}
    className="mt-1 text-blue-600"
  />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-slate-900 dark:text-white text-xs">
                          Net Banking (All Indian Banks)
                        </span>
                      </div>

                      {paymentMethod === "Net Banking" && <div className="pt-2">
                          <select
    value={selectedBank}
    onChange={(e) => setSelectedBank(e.target.value)}
    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
  >
                            <option value="HDFC Bank">HDFC Bank</option>
                            <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                            <option value="ICICI Bank">ICICI Bank</option>
                            <option value="Axis Bank">Axis Bank</option>
                            <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                            <option value="Punjab National Bank (PNB)">Punjab National Bank (PNB)</option>
                          </select>
                        </div>}
                    </div>
                  </div>
                </label>

                {
    /* Cash on Delivery Option */
  }
                <label
    className={`block p-4 rounded-2xl border-2 transition-all cursor-pointer ${paymentMethod === "Cash on Delivery" ? "border-blue-600 bg-blue-50/40 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-800"}`}
  >
                  <div className="flex items-start gap-3">
                    <input
    type="radio"
    name="payment"
    checked={paymentMethod === "Cash on Delivery"}
    onChange={() => setPaymentMethod("Cash on Delivery")}
    className="mt-1 text-blue-600"
  />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-blue-600" />
                          <span className="font-bold text-slate-900 dark:text-white text-xs">
                            Cash on Delivery (COD)
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">Pay cash or UPI at door</span>
                      </div>

                      {paymentMethod === "Cash on Delivery" && <div className="pt-2 space-y-2">
                          <p className="text-xs text-slate-500">
                            Enter the 4-digit security code below to confirm Cash on Delivery order:
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-mono font-bold tracking-widest text-sm">
                              {generatedCaptcha}
                            </span>
                            <input
    type="text"
    maxLength={4}
    placeholder="Enter code"
    value={codCaptcha}
    onChange={(e) => setCodCaptcha(e.target.value)}
    className="w-32 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono text-center font-bold"
  />
                          </div>
                        </div>}
                    </div>
                  </div>
                </label>
              </div>

              {
    /* Confirm & Place Order CTA */
  }
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
    onClick={() => setActiveStep(2)}
    className="text-xs text-slate-500 hover:text-slate-800"
  >
                  Back to Summary
                </button>
                <button
    onClick={handlePlaceOrderSubmit}
    className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-sm font-black transition-all shadow-md shadow-amber-500/20 inline-flex items-center gap-2 cursor-pointer"
  >
                  <Lock className="w-4 h-4" />
                  <span>Confirm & Place Order ({formatPrice(totalAmount)})</span>
                </button>
              </div>
            </div>}
        </div>

        {
    /* Right Column: Order Calculation Sidebar */
  }
        <div className="lg:col-span-4 space-y-4 sticky top-24">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display border-b border-slate-100 dark:border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                  {formatPrice(totalMRP)}
                </span>
              </div>

              {discountOnMRP > 0 && <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Product Savings</span>
                  <span className="tabular-nums">- {formatPrice(discountOnMRP)}</span>
                </div>}

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Delivery Charges</span>
                {deliveryCharge === 0 ? <span className="font-bold text-emerald-600">FREE</span> : <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                    {formatPrice(deliveryCharge)}
                  </span>}
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline font-bold text-slate-900 dark:text-white">
                <span className="text-xs">Final Payable</span>
                <span className="text-xl font-black font-display text-blue-600 dark:text-blue-400 tabular-nums">
                  {formatPrice(totalAmount)}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-[11px] text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                Guaranteed by WROFT Shield
              </p>
              <p>Safe digital transactions with 100% money-back guarantee.</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export {
  CheckoutView
};
