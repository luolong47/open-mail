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
    <div className="w-[220px] bg-[#f2f4f7] h-full flex flex-col border-r border-gray-200 flex-shrink-0">
      {/* Logo Area */}
      <div className="h-[60px] px-4 flex items-center space-x-2 shrink-0">
        <div className="text-blue-600 font-bold text-2xl flex items-center">
          <span className="text-blue-500">OP</span>
          <span className="text-blue-600">EN</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">开源邮箱<br/>openmail.com</div>
      </div>

      {/* Compose Button */}
      <div className="px-3 mt-2 mb-2">
        <button 
          onClick={onCompose}
          className="w-full h-[35px] bg-[#0f7af5] hover:bg-[#0d6add] text-white rounded-[6px] flex items-center justify-center space-x-1.5 shadow-sm transition-colors text-[14px]"
        >
          <FileText className="w-[15px] h-[15px]" />
          <span>写信</span>
        </button>
      </div>

      {/* Main Folders */}
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-0.5 px-3">
          {folders.map((folder) => (
            <li key={folder.id}>
              <button
                onClick={() => onSelectFolder(folder.id)}
                className={clsx(
                  "w-full h-7 flex items-center justify-between pl-2.5 pr-2 rounded text-[13px] transition-colors",
                  currentFolder === folder.id 
                    ? "bg-[#0f7af5]/15 text-[#0f7af5] font-medium" 
                    : "text-gray-700 hover:bg-black/5"
                )}
              >
                <div className="flex items-center space-x-2">
                  <span className={clsx(
                    "flex items-center",
                    currentFolder === folder.id ? "text-[#0f7af5]" : "text-gray-500"
                  )}>
                    {renderIcon(folder.icon)}
                  </span>
                  <span>{folder.name}</span>
                </div>
                {folder.unread > 0 && (
                  <span className={clsx(
                    "text-xs font-medium",
                    currentFolder === folder.id ? "text-[#0f7af5]" : "text-gray-500"
                  )}>{folder.unread}</span>
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
            <ul className="space-y-0.5 mt-1 px-3">
              {customFolders.map((folder) => (
                <li key={folder.id}>
                  <button className="w-full h-7 flex items-center justify-between pl-[1.875rem] pr-2 rounded text-[13px] text-gray-700 hover:bg-black/5 transition-colors">
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
          <ul className="space-y-0.5 px-3">
            {otherAccounts.map((account) => (
              <li key={account.id}>
                <button className="w-full h-7 flex items-center pl-2.5 pr-2 rounded text-[13px] text-gray-700 hover:bg-black/5 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span className="truncate w-36 text-left">{account.email}</span>
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
