import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo dan Nama Aplikasi */}
        <div className="flex items-center">
          <div className="w-6 h-6 bg-red-600 rounded-full mr-2"></div>
          <span className="text-xl font-bold">SIMS PPOB</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8">
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            Top Up
          </button>
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            Transaction
          </button>
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            Akun
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
