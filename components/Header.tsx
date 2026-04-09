import React from 'react';
import { Search, Settings, ChevronDown } from 'lucide-react';

export function Header() {
  return (
    <div className="h-14 bg-[#eef1f6] border-b border-gray-200 flex items-center justify-between px-4">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-1.5 border border-transparent rounded-md leading-5 bg-white bg-opacity-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
            placeholder="搜索"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-4 ml-4">
        {/* User Profile */}
        <button className="flex items-center space-x-2 hover:bg-black/5 rounded-md px-2 py-1 transition-colors">
          <img
            className="h-7 w-7 rounded-full object-cover"
            src="https://picsum.photos/seed/avatar/100/100"
            alt="User avatar"
            referrerPolicy="no-referrer"
          />
          <div className="flex items-center text-sm">
            <span className="font-medium text-gray-900">928496743</span>
            <span className="text-gray-500 ml-1">· luolong47@qq.com</span>
            <span className="ml-2 px-1.5 py-0.5 bg-gray-200 text-gray-600 text-xs rounded">普通用户</span>
            <ChevronDown className="h-3 w-3 text-gray-500 ml-1" />
          </div>
        </button>

        {/* Settings */}
        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 text-sm">
          <Settings className="h-4 w-4" />
          <span>设置</span>
        </button>
      </div>
    </div>
  );
}
