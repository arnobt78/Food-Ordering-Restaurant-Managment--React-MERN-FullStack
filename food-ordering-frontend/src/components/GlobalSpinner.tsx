import { Loader2 } from "lucide-react";

const GlobalSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80">
      <Loader2 className="h-16 w-16 text-orange-500 animate-spin mb-6" />
      <span className="text-2xl font-bold text-orange-600 animate-pulse">
        Food is getting ready...
      </span>
    </div>
  );
};

export default GlobalSpinner;
