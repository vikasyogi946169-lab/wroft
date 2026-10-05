import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useApp } from "../context/AppContext";
const ToastContainer = () => {
  const { toasts } = useApp();
  if (toasts.length === 0) return null;
  return <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
      {toasts.map((toast) => <div
    key={toast.id}
    className="pointer-events-auto flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-md text-white shadow-2xl border border-slate-800 dark:border-slate-700 animate-slide-up transition-all"
  >
          {toast.type === "success" && <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>}
          {toast.type === "error" && <div className="w-7 h-7 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>}
          {toast.type === "info" && <div className="w-7 h-7 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Info className="w-4 h-4" />
            </div>}

          <p className="text-xs font-semibold text-slate-100 flex-1 leading-snug">
            {toast.message}
          </p>
        </div>)}
    </div>;
};
export {
  ToastContainer
};
