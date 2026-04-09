import React from 'react';
import { Send, Eye, Paperclip, FilePlus, Settings, Image as ImageIcon, Calendar, Smile, Type, MoreHorizontal, X } from 'lucide-react';

interface ComposeEmailProps {
  onClose: () => void;
}

export function ComposeEmail({ onClose }: ComposeEmailProps) {
  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header Tabs */}
      <div className="flex items-center bg-[#f2f4f7] border-b border-gray-200">
        <div className="flex items-center px-4 py-2 bg-white border-t-2 border-blue-500 border-r border-gray-200 text-sm font-medium text-blue-600">
          <FilePlus className="w-4 h-4 mr-2" />
          写信
        </div>
        <div className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer border-r border-gray-200">
          回复: test.7z
          <button onClick={onClose} className="ml-2 hover:bg-gray-200 rounded-full p-0.5">
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition-colors">
            <Send className="w-4 h-4" />
            <span>发送</span>
          </button>
          
          <ToolbarButton icon={<Eye className="w-4 h-4" />} label="预览" />
          <ToolbarButton icon={<Paperclip className="w-4 h-4" />} label="附件" hasDropdown />
          <ToolbarButton icon={<FilePlus className="w-4 h-4" />} label="超大附件" hasDropdown />
          <ToolbarButton icon={<Settings className="w-4 h-4" />} label="发信设置" hasDropdown />
        </div>
        
        <div className="flex items-center space-x-3 text-gray-500">
          <button className="hover:text-gray-700"><Type className="w-4 h-4" /></button>
          <button className="hover:text-gray-700"><MoreHorizontal className="w-4 h-4" /></button>
          <button onClick={onClose} className="hover:text-gray-700"><X className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Compose Area */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Email Headers */}
          <div className="px-6 py-4 border-b border-gray-100 space-y-3">
            <div className="flex items-center">
              <span className="w-16 text-sm text-gray-500">收件人</span>
              <input type="text" className="flex-1 text-sm focus:outline-none" placeholder="请填写收件人地址" />
              <div className="flex items-center space-x-3 text-sm text-blue-500">
                <button className="hover:underline">抄送</button>
                <button className="hover:underline">密送</button>
                <button className="hover:underline">分别发送</button>
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-16 text-sm text-gray-500">主 题</span>
              <input type="text" className="flex-1 text-sm focus:outline-none" placeholder="请填写邮件主题" />
            </div>
          </div>

          {/* Editor Toolbar */}
          <div className="px-6 py-2 border-b border-gray-100 flex items-center space-x-4 text-gray-500">
            <button className="hover:text-gray-700"><ImageIcon className="w-4 h-4" /></button>
            <button className="hover:text-gray-700 flex items-center space-x-1">
              <span className="text-sm">插入</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <button className="hover:text-gray-700 flex items-center space-x-1">
              <span className="text-sm">导入文档</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <button className="hover:text-gray-700 flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">日程</span>
            </button>
            <button className="hover:text-gray-700 flex items-center space-x-1">
              <Smile className="w-4 h-4" />
              <span className="text-sm">表情</span>
            </button>
            <button className="hover:text-gray-700 flex items-center space-x-1 bg-blue-50 text-blue-600 px-2 py-1 rounded">
              <span className="text-sm font-medium">Aa 格式</span>
            </button>
            
            <div className="flex-1"></div>
            
            <button className="hover:text-gray-700 flex items-center space-x-1">
              <span className="text-sm">签名</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <button className="hover:text-gray-700"><MoreHorizontal className="w-4 h-4" /></button>
          </div>

          {/* Editor Body */}
          <div className="flex-1 p-6">
            <textarea 
              className="w-full h-full resize-none focus:outline-none text-sm"
              placeholder="在此输入正文..."
            ></textarea>
          </div>
          
          {/* Footer Sender Info */}
          <div className="px-6 py-3 border-t border-gray-100 flex items-center text-sm text-gray-500">
            <span className="mr-2">发件人:</span>
            <span className="font-medium text-gray-900">Antigravity</span>
            <span>&lt;hello@openmail.com&gt;</span>
            <ChevronDown className="w-3 h-3 ml-1" />
          </div>
        </div>

        {/* Right Sidebar (Contacts) */}
        <div className="w-64 border-l border-gray-200 bg-white flex flex-col">
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <Search className="h-3.5 w-3.5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-md leading-5 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 sm:text-sm transition-colors"
                placeholder="搜索联系人"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <div className="mb-4">
              <div className="flex items-center text-xs font-medium text-gray-500 mb-2 px-2">
                <ChevronDown className="w-3 h-3 mr-1" />
                最近联系人
              </div>
              <ul className="space-y-1">
                {['uzanne16', 'orettaemmer29', 'da42', 'aulette68', 'ariamitzsche28', 'arodummings69', 'ilbertach', 'npysp'].map(name => (
                  <li key={name} className="px-6 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded truncate">
                    {name}
                  </li>
                ))}
                <li className="px-6 py-1 text-xs text-blue-500 hover:underline cursor-pointer">
                  显示更多
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center text-xs font-medium text-gray-500 mb-2 px-2">
                <ChevronDown className="w-3 h-3 mr-1" />
                邮箱联系人
              </div>
              <div className="px-6 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded flex items-center">
                <FolderIcon className="w-3.5 h-3.5 mr-2 text-gray-400" />
                全部联系人
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({ icon, label, hasDropdown }: { icon: React.ReactNode, label: string, hasDropdown?: boolean }) {
  return (
    <button className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors border border-transparent hover:border-gray-200">
      {icon}
      <span>{label}</span>
      {hasDropdown && <ChevronDown className="w-3 h-3 ml-0.5" />}
    </button>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}

function Search({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  );
}
