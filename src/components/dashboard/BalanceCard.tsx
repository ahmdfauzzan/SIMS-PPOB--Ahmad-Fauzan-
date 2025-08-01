import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useBalance } from "../../services/dashboardService";

const BalanceCard: React.FC = () => {
  const [showBalance, setShowBalance] = useState(false);
  const { data: balanceData, isLoading, error } = useBalance();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white mb-8">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-red-100 text-sm mb-2">Saldo anda</p>
            <h2 className="text-2xl font-bold">Rp 0</h2>
            <p className="text-red-100 text-xs mt-1">Error loading balance</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white mb-8">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-red-100 text-sm mb-2">Saldo anda</p>
          <div className="flex items-center space-x-3">
            {isLoading ? (
              <div className="h-8 bg-red-400 rounded w-32 animate-pulse"></div>
            ) : (
              <h2 className="text-2xl font-bold">
                {showBalance && balanceData?.data
                  ? formatCurrency(balanceData.data.balance)
                  : "Rp ••••••••"}
              </h2>
            )}
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-red-100 hover:text-white transition-colors"
              disabled={isLoading}
            >
              {showBalance ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-red-100 text-xs mt-1">Lihat Saldo</p>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
