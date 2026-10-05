import { useState } from "react";
import { Lock, Mail, Phone, User, Eye, EyeOff } from "lucide-react";
import { useApp } from "../context/AppContext";
const AuthViews = ({ initialMode = "login" }) => {
  const { login, register, navigate, showToast } = useApp();
  const [mode, setMode] = useState(initialMode);
  const [loginInput, setLoginInput] = useState("vikasyogi946169@gmail.com");
  const [loginPassword, setLoginPassword] = useState("wroftPassword123");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [regFullName, setRegFullName] = useState("");
  const [regMobile, setRegMobile] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errors, setErrors] = useState({});
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!loginInput.trim()) {
      newErrors.loginInput = "Please enter your email or 10-digit mobile number";
    }
    if (!loginPassword || loginPassword.length < 6) {
      newErrors.loginPassword = "Password must be at least 6 characters";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    login(loginInput.trim());
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!regFullName.trim() || regFullName.trim().length < 3) {
      newErrors.fullName = "Full Name must be at least 3 characters";
    }
    if (!/^\d{10}$/.test(regMobile.trim())) {
      newErrors.mobile = "Enter a valid 10-digit Indian mobile number";
    }
    if (!regEmail.includes("@") || !regEmail.includes(".")) {
      newErrors.email = "Enter a valid email address";
    }
    if (regPassword.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (regPassword !== regConfirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!agreeTerms) {
      newErrors.terms = "Please accept the Terms & Conditions";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    register(regFullName.trim(), regMobile.trim(), regEmail.trim());
  };
  return <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        {
    /* Brand Header */
  }
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-blue-600 to-amber-500 text-white font-extrabold text-2xl flex items-center justify-center mx-auto shadow-md">
            W
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
            {mode === "login" ? "Welcome Back to WROFT" : "Create WROFT Account"}
          </h1>
          <p className="text-xs text-slate-500">
            {mode === "login" ? "Login with your registered email or mobile number" : "Join millions of shoppers for exclusive deals & instant cashback"}
          </p>
        </div>

        {
    /* Tab Switcher */
  }
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
    onClick={() => {
      setMode("login");
      setErrors({});
    }}
    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${mode === "login" ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs" : "text-slate-600 dark:text-slate-400"}`}
  >
            Login
          </button>
          <button
    onClick={() => {
      setMode("register");
      setErrors({});
    }}
    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${mode === "register" ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs" : "text-slate-600 dark:text-slate-400"}`}
  >
            Register
          </button>
        </div>

        {
    /* LOGIN FORM */
  }
        {mode === "login" && <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Email / Mobile Number
              </label>
              <div className="relative">
                <input
    type="text"
    placeholder="e.g. name@example.com or 9876543210"
    value={loginInput}
    onChange={(e) => setLoginInput(e.target.value)}
    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 ${errors.loginInput ? "border-rose-500" : "border-slate-200 dark:border-slate-700"}`}
  />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.loginInput && <p className="text-[11px] text-rose-500 mt-1">{errors.loginInput}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Password
              </label>
              <div className="relative">
                <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
    value={loginPassword}
    onChange={(e) => setLoginPassword(e.target.value)}
    className={`w-full pl-9 pr-10 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 ${errors.loginPassword ? "border-rose-500" : "border-slate-200 dark:border-slate-700"}`}
  />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
  >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.loginPassword && <p className="text-[11px] text-rose-500 mt-1">{errors.loginPassword}</p>}
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
    type="checkbox"
    checked={rememberMe}
    onChange={(e) => setRememberMe(e.target.checked)}
    className="rounded-sm text-blue-600"
  />
                <span className="text-slate-600 dark:text-slate-400">Remember Me</span>
              </label>
              <button
    type="button"
    onClick={() => showToast("Password reset link sent to registered email/mobile", "info")}
    className="text-blue-600 hover:underline font-semibold"
  >
                Forgot Password?
              </button>
            </div>

            <button
    type="submit"
    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer"
  >
              Login to Account
            </button>
          </form>}

        {
    /* REGISTRATION FORM */
  }
        {mode === "register" && <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Full Name
              </label>
              <div className="relative">
                <input
    type="text"
    placeholder="e.g. Rahul Verma"
    value={regFullName}
    onChange={(e) => setRegFullName(e.target.value)}
    className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white ${errors.fullName ? "border-rose-500" : "border-slate-200 dark:border-slate-700"}`}
  />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.fullName && <p className="text-[10px] text-rose-500 mt-0.5">{errors.fullName}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                10-Digit Mobile Number
              </label>
              <div className="relative">
                <input
    type="tel"
    maxLength={10}
    placeholder="9876543210"
    value={regMobile}
    onChange={(e) => setRegMobile(e.target.value)}
    className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-mono bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white ${errors.mobile ? "border-rose-500" : "border-slate-200 dark:border-slate-700"}`}
  />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.mobile && <p className="text-[10px] text-rose-500 mt-0.5">{errors.mobile}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Email Address
              </label>
              <div className="relative">
                <input
    type="email"
    placeholder="name@example.com"
    value={regEmail}
    onChange={(e) => setRegEmail(e.target.value)}
    className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white ${errors.email ? "border-rose-500" : "border-slate-200 dark:border-slate-700"}`}
  />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.email && <p className="text-[10px] text-rose-500 mt-0.5">{errors.email}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Set Password (min. 6 characters)
              </label>
              <div className="relative">
                <input
    type="password"
    placeholder="Create a strong password"
    value={regPassword}
    onChange={(e) => setRegPassword(e.target.value)}
    className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white ${errors.password ? "border-rose-500" : "border-slate-200 dark:border-slate-700"}`}
  />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.password && <p className="text-[10px] text-rose-500 mt-0.5">{errors.password}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Confirm Password
              </label>
              <div className="relative">
                <input
    type="password"
    placeholder="Re-enter password"
    value={regConfirmPassword}
    onChange={(e) => setRegConfirmPassword(e.target.value)}
    className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white ${errors.confirmPassword ? "border-rose-500" : "border-slate-200 dark:border-slate-700"}`}
  />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.confirmPassword && <p className="text-[10px] text-rose-500 mt-0.5">{errors.confirmPassword}</p>}
            </div>

            <label className="flex items-start gap-2 text-xs text-slate-500 cursor-pointer pt-1">
              <input
    type="checkbox"
    checked={agreeTerms}
    onChange={(e) => setAgreeTerms(e.target.checked)}
    className="mt-0.5 rounded-sm text-blue-600"
  />
              <span>
                By continuing, you agree to WROFT's Terms of Use and Privacy Policy.
              </span>
            </label>

            <button
    type="submit"
    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer"
  >
              Create Account & Start Shopping
            </button>
          </form>}

        <div className="pt-2 text-center text-xs text-slate-400">
          <span>Protected by WROFT Shield · 100% Data Confidentiality</span>
        </div>
      </div>
    </div>;
};
export {
  AuthViews
};
