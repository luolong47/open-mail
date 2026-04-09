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
      <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-lg font-medium text-gray-900 ml-2">{folderName}</span>
            <button className="p-1 hover:bg-gray-100 rounded">
              <LayoutPanelLeft className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          
          <div className="h-4 w-px bg-gray-300 mx-2"></div>
          
          <div className="flex items-center space-x-1">
            <ToolbarButton icon={<Trash2 className="w-4 h-4" />} label="删除" />
            <ToolbarButton icon={<Forward className="w-4 h-4" />} label="转发" />
            <ToolbarButton icon={<AlertOctagon className="w-4 h-4" />} label="举报" />
            <ToolbarButton icon={<MailOpen className="w-4 h-4" />} label="全部已读" />
            
            <div className="relative">
              <button className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors border border-transparent hover:border-gray-200">
                <Star className="w-4 h-4" />
                <span>标记为</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            
            <div className="relative">
              <button className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors border border-transparent hover:border-gray-200">
                <FolderInput className="w-4 h-4" />
                <span>移动到</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <span>共 {emails.length} 封</span>
          <button className="p-1 hover:bg-gray-100 rounded">
            <LayoutPanelLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {/* Group by Date (Mocked for simplicity) */}
        <div className="px-4 py-1 text-xs font-medium text-gray-500 bg-gray-50 border-b border-gray-100">
          今天 (1 封)
        </div>
        
        <div className="divide-y divide-gray-100">
          {emails.map((email) => (
            <div 
              key={email.id}
              onClick={() => onSelectEmail(email)}
              className={clsx(
                "flex items-center px-4 py-2.5 hover:bg-blue-50 cursor-pointer group transition-colors",
                !email.read ? "bg-white font-medium" : "bg-white text-gray-600"
              )}
            >
              <div className="flex items-center mr-3">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              
              <div className="w-6 flex justify-center mr-2">
                {!email.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                {email.read && <MailOpen className="w-4 h-4 text-gray-300" />}
              </div>
              
              <div className="w-48 truncate pr-4 text-sm">
                {email.senderName}
              </div>
              
              <div className="flex-1 flex items-center min-w-0">
                {email.hasAttachment && (
                  <Paperclip className="w-3.5 h-3.5 text-gray-400 mr-2 flex-shrink-0" />
                )}
                <div className="truncate text-sm flex items-center">
                  <span className={clsx(!email.read ? "text-gray-900" : "text-gray-700")}>
                    {email.subject}
                  </span>
                  <span className="text-gray-400 ml-2 truncate">
                    {email.snippet}
                  </span>
                </div>
                
                {email.labels?.map(label => (
                  <span key={label} className="ml-2 px-1.5 py-0.5 text-[10px] bg-gray-200 text-gray-600 rounded">
                    {label}
                  </span>
                ))}
                
                {email.attachments && email.attachments.length > 0 && (
                  <div className="ml-2 flex items-center border border-yellow-400 bg-yellow-50 rounded px-1.5 py-0.5 text-xs text-gray-700">
                    <div className="w-3 h-3 bg-yellow-400 mr-1 rounded-sm"></div>
                    {email.attachments[0].name}
                  </div>
                )}
              </div>
              
              {email.attachments && email.attachments.length > 0 && (
                <div className="w-16 text-right text-xs text-gray-500 mr-4">
                  {email.attachments[0].size}
                </div>
              )}
              
              <div className="w-16 text-right text-sm text-gray-500 mr-4">
                {email.date}
              </div>
              
              <button className="p-1 text-gray-300 hover:text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <Star className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors border border-transparent hover:border-gray-200">
      {icon}
      <span>{label}</span>
    </button>
  );
}
