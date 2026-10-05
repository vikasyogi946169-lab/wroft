import { useState } from "react";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Mail,
  Send,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Check
} from "lucide-react";
import { useApp } from "../context/AppContext";
const Footer = () => {
  const { navigate, showToast } = useApp();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      showToast("Thank you for subscribing to WROFT exclusive deals!", "success");
      setEmail("");
    } else {
      showToast("Please enter a valid email address", "error");
    }
  };
  return <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 transition-colors">
      {
    /* Trust Badges Strip */
  }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 border-b border-slate-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Genuine Products</h4>
              <p className="text-xs text-slate-400">Directly sourced from verified brands</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free Express Delivery</h4>
              <p className="text-xs text-slate-400">On all eligible orders above ₹499</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">7-Day Easy Returns</h4>
              <p className="text-xs text-slate-400">Hassle-free doorstep pickup & refund</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24/7 Customer Care</h4>
              <p className="text-xs text-slate-400">Dedicated phone & chat assistance</p>
            </div>
          </div>
        </div>
      </div>

      {
    /* Main Footer Links */
  }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {
    /* Brand Info & Newsletter */
  }
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-blue-600 to-amber-500 flex items-center justify-center text-white font-extrabold text-lg">
                W
              </div>
              <span className="text-2xl font-black text-white tracking-tight font-display">
                WROFT
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              WROFT is India’s next-generation e-commerce marketplace delivering millions of verified smartphones, premium electronics, curated fashion, home appliances, and essentials with lightning-fast delivery and transparent pricing.
            </p>

            {
    /* Newsletter Input */
  }
            <div className="pt-2">
              <p className="text-xs font-semibold text-white mb-2">
                Subscribe to WROFT Newsletter
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <div className="relative flex-1">
                  <input
    type="email"
    placeholder="Enter your email address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <button
    type="submit"
    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
  >
                  {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-3.5 h-3.5" />}
                  <span>{subscribed ? "Joined" : "Subscribe"}</span>
                </button>
              </form>
            </div>

            {
    /* Social Icons */
  }
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="#instagram" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {
    /* About Column */
  }
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              About WROFT
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate("home")} className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <a href="#careers" className="hover:text-white transition-colors">Careers & Culture</a>
              </li>
              <li>
                <a href="#press" className="hover:text-white transition-colors">Press & Media</a>
              </li>
              <li>
                <a href="#wholesale" className="hover:text-white transition-colors">WROFT Wholesale</a>
              </li>
              <li>
                <a href="#corporate" className="hover:text-white transition-colors">Corporate Information</a>
              </li>
            </ul>
          </div>

          {
    /* Customer Service Column */
  }
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate("account")} className="hover:text-white transition-colors cursor-pointer">
                  Help Center
                </button>
              </li>
              <li>
                <button onClick={() => navigate("tracking")} className="hover:text-white transition-colors cursor-pointer">
                  Track Your Shipment
                </button>
              </li>
              <li>
                <a href="#payments" className="hover:text-white transition-colors">Payment Methods & Security</a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-white transition-colors">Shipping & Delivery Rates</a>
              </li>
              <li>
                <a href="#returns" className="hover:text-white transition-colors">Returns & Replacement Policy</a>
              </li>
              <li>
                <a href="#cancellation" className="hover:text-white transition-colors">Order Cancellation</a>
              </li>
            </ul>
          </div>

          {
    /* Policies Column */
  }
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Consumer Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#terms" className="hover:text-white transition-colors">Terms of Use</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#refund" className="hover:text-white transition-colors">Refund & Cancellation</a>
              </li>
              <li>
                <a href="#cookie" className="hover:text-white transition-colors">Cookie Policy</a>
              </li>
              <li>
                <a href="#grievance" className="hover:text-white transition-colors">Grievance Redressal</a>
              </li>
              <li>
                <a href="#epr" className="hover:text-white transition-colors">EPR Compliance</a>
              </li>
            </ul>
          </div>
        </div>

        {
    /* Address and Registered Office */
  }
        <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-400">
          <div>
            <p className="font-semibold text-slate-300 mb-1">Mail Us & Registered Office:</p>
            <p className="leading-relaxed">
              WROFT Internet Private Limited, Buildings Alyssa, Begonia & Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli Village, Bengaluru, 560103, Karnataka, India. CIN: U51109KA2024PTC066107
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-center gap-2">
            <p className="font-semibold text-slate-300">100% Safe & Secure Payment Gateways</p>
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <span className="px-2 py-1 bg-slate-800 rounded font-semibold text-slate-200">UPI</span>
              <span className="px-2 py-1 bg-slate-800 rounded font-semibold text-slate-200">RuPay</span>
              <span className="px-2 py-1 bg-slate-800 rounded font-semibold text-slate-200">Visa</span>
              <span className="px-2 py-1 bg-slate-800 rounded font-semibold text-slate-200">Mastercard</span>
              <span className="px-2 py-1 bg-slate-800 rounded font-semibold text-slate-200">NetBanking</span>
              <span className="px-2 py-1 bg-slate-800 rounded font-semibold text-slate-200">Cash on Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {
    /* Bottom Copyright */
  }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <p>© 2026 WROFT.com. All Rights Reserved.</p>
        <p className="flex items-center gap-4">
          <span>Made for modern Indian e-commerce</span>
          <span>·</span>
          <span>GSTIN: 29AABCS1429B1Z0</span>
        </p>
      </div>
    </footer>;
};
export {
  Footer
};
