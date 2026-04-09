import React from 'react';
import { Email } from '@/lib/mock-data';
import { Trash2, Forward, AlertOctagon, MailOpen, Star, FolderInput, Paperclip, ChevronDown, LayoutPanelLeft } from 'lucide-react';
import clsx from 'clsx';

interface EmailListProps {
  emails: Email[];
  onSelectEmail: (email: Email) => void;
  folderName: string;
}

export function EmailList({ emails, onSelectEmail, folderName }: EmailListProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Toolbar */}
      <div className="h-[48px] border-b border-gray-200 flex items-center justify-between px-4 bg-white sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <div className="flex items-center mr-2">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-[15px] font-medium text-gray-800 ml-3">{folderName}</span>
            <button className="p-1 hover:bg-gray-100 rounded ml-1 text-gray-400">
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          
          <div className="h-4 w-px bg-gray-200 mx-2"></div>
          
          <div className="flex items-center space-x-0.5">
            <ToolbarButton icon={<Trash2 className="w-[14px] h-[14px]" />} label="删除" />
            <ToolbarButton icon={<Forward className="w-[14px] h-[14px]" />} label="转发" />
            <ToolbarButton icon={<AlertOctagon className="w-[14px] h-[14px]" />} label="举报" />
            <ToolbarButton icon={<MailOpen className="w-[14px] h-[14px]" />} label="全部已读" />
            
            <div className="relative group">
              <button className="flex items-center space-x-1 px-2.5 py-1.5 text-[13px] text-gray-600 hover:bg-gray-100 rounded transition-colors border border-transparent hover:border-gray-200">
                <Star className="w-[14px] h-[14px]" />
                <span>标记为</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
            </div>
            
            <div className="relative group">
              <button className="flex items-center space-x-1 px-2.5 py-1.5 text-[13px] text-gray-600 hover:bg-gray-100 rounded transition-colors border border-transparent hover:border-gray-200">
                <FolderInput className="w-[14px] h-[14px]" />
                <span>移动到</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 space-x-2">
          <button className="flex items-center space-x-1 py-1 px-2 hover:bg-gray-100 rounded">
            <span>共 {emails.length} 封</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400">
            <LayoutPanelLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {/* Group by Date */}
        <div className="h-6 flex items-center pt-[4px] pb-[2px] pl-4 text-xs font-medium text-gray-500 bg-gray-50 border-b border-gray-100">
          今天 (1 封)
        </div>
        
        <div className="divide-y divide-gray-100">
          {emails.map((email) => (
            <div 
              key={email.id}
              onClick={() => onSelectEmail(email)}
              className={clsx(
                "h-7 flex items-center px-4 hover:bg-blue-50 cursor-pointer group transition-colors",
                !email.read ? "bg-white font-medium" : "bg-white text-gray-600"
              )}
            >
              <div className="flex items-center mr-3 shrink-0">
                <input 
                  type="checkbox" 
                  className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              
              <div className="w-5 flex justify-center mr-2 shrink-0">
                {!email.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                {email.read && <MailOpen className="w-3.5 h-3.5 text-gray-300" />}
              </div>
              
              <div className="w-40 truncate pr-4 text-[13px] shrink-0">
                {email.senderName}
              </div>
              
              <div className="flex-1 flex items-center min-w-0">
                {email.hasAttachment && (
                  <Paperclip className="w-3.5 h-3.5 text-gray-400 mr-1.5 flex-shrink-0" />
                )}
                <div className="truncate text-[13px] flex items-center gap-2">
                  <span className={clsx(!email.read ? "text-gray-900" : "text-gray-700")}>
                    {email.subject}
                  </span>
                  <span className="text-gray-400 font-normal truncate">
                    {email.snippet}
                  </span>
                </div>
                
                {email.labels?.map(label => (
                  <span key={label} className="ml-2 px-1 py-0.5 text-[10px] bg-gray-200 text-gray-600 rounded">
                    {label}
                  </span>
                ))}
              </div>
              
              {email.attachments && email.attachments.length > 0 && (
                <div className="w-16 text-right text-[11px] text-gray-400 mr-4 shrink-0">
                  {email.attachments[0].size}
                </div>
              )}
              
              <div className="w-16 text-right text-[12px] text-gray-400 mr-4 shrink-0">
                {email.date}
              </div>
              
              <div className="w-5 flex justify-end shrink-0">
                <button className="p-1 text-gray-300 hover:text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Star className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex items-center space-x-1 px-2.5 py-1.5 text-[13px] text-gray-600 hover:bg-gray-100 rounded transition-colors border border-transparent hover:border-gray-200">
      <span className="text-gray-500">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
