import React, { useState } from 'react';
import { Inbox, Star, Send, FileText, Trash2, AlertTriangle, ChevronDown, ChevronRight, Plus, Mail } from 'lucide-react';
import { folders, customFolders, otherAccounts } from '@/lib/mock-data';
import clsx from 'clsx';

interface SidebarProps {
  currentFolder: string;
  onSelectFolder: (folderId: string) => void;
  onCompose: () => void;
}

export function Sidebar({ currentFolder, onSelectFolder, onCompose }: SidebarProps) {
  const [isMyFoldersOpen, setIsMyFoldersOpen] = useState(true);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Inbox': return <Inbox className="w-4 h-4" />;
      case 'Star': return <Star className="w-4 h-4" />;
      case 'Send': return <Send className="w-4 h-4" />;
      case 'FileText': return <FileText className="w-4 h-4" />;
      case 'Trash2': return <Trash2 className="w-4 h-4" />;
      case 'AlertTriangle': return <AlertTriangle className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-64 bg-[#f2f4f7] h-full flex flex-col border-r border-gray-200 overflow-y-auto">
      {/* Logo Area */}
      <div className="p-4 flex items-center space-x-2">
        <div className="text-blue-600 font-bold text-2xl flex items-center">
          <span className="text-blue-500">MO</span>
          <span className="text-blue-600">IL</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">QQ邮箱<br/>mail.qq.com</div>
      </div>

      {/* Compose Button */}
      <div className="px-4 mb-4">
        <button 
          onClick={onCompose}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 flex items-center justify-center space-x-2 shadow-sm transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>写信</span>
        </button>
      </div>

      {/* Main Folders */}
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-0.5">
          {folders.map((folder) => (
            <li key={folder.id}>
              <button
                onClick={() => onSelectFolder(folder.id)}
                className={clsx(
                  "w-full flex items-center justify-between px-4 py-2 text-sm transition-colors",
                  currentFolder === folder.id 
                    ? "bg-[#e2e6ed] text-gray-900 font-medium" 
                    : "text-gray-700 hover:bg-[#e8ebf0]"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className={currentFolder === folder.id ? "text-blue-500" : "text-gray-500"}>
                    {renderIcon(folder.icon)}
                  </span>
                  <span>{folder.name}</span>
                </div>
                {folder.unread > 0 && (
                  <span className="text-xs font-medium text-gray-500">{folder.unread}</span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Custom Folders */}
        <div className="mt-4">
          <button 
            onClick={() => setIsMyFoldersOpen(!isMyFoldersOpen)}
            className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-[#e8ebf0]"
          >
            <div className="flex items-center space-x-2">
              {isMyFoldersOpen ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
              <span className="font-medium">我的文件夹</span>
            </div>
            <span className="text-xs text-gray-500">2</span>
          </button>
          
          {isMyFoldersOpen && (
            <ul className="space-y-0.5 mt-1">
              {customFolders.map((folder) => (
                <li key={folder.id}>
                  <button className="w-full flex items-center justify-between px-4 py-1.5 pl-10 text-sm text-gray-700 hover:bg-[#e8ebf0]">
                    <div className="flex items-center space-x-2">
                      <FolderIcon className="w-4 h-4 text-gray-400" />
                      <span>{folder.name}</span>
                    </div>
                    {folder.count > 0 && (
                      <span className="text-xs text-gray-500">{folder.count}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Other Accounts */}
        <div className="mt-6 border-t border-gray-200 pt-2">
          <ul className="space-y-0.5">
            {otherAccounts.map((account) => (
              <li key={account.id}>
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#e8ebf0]">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span className="truncate w-40 text-left">{account.email}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* App Links */}
        <div className="mt-6 border-t border-gray-200 pt-2 pb-4">
          <div className="px-4 py-2 text-sm font-medium text-gray-700">应用</div>
        </div>
      </div>
    </div>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  );
}
