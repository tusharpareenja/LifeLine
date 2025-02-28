import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
        <div className="absolute inset-2 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
          <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">LL</span>
        </div>
      </div>
      <span className="ml-4 text-3xl font-bold text-blue-600 dark:text-blue-400">LifeLine</span>
    </div>
  );
};

export default Logo;
