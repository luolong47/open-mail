import React from 'react';
import { Email } from '@/lib/mock-data';
import { ArrowLeft, Trash2, Reply, ReplyAll, Forward, AlertOctagon, Star, FolderInput, ChevronDown, ChevronUp, Printer, FileText, MoreHorizontal, Download, Cloud, Paperclip } from 'lucide-react';

interface EmailDetailProps {
  email: Email;
  onBack: () => void;
}

export function EmailDetail({ email, onBack }: EmailDetailProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Toolbar */}
      <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
        <div className="flex items-center space-x-2">
          <button 
            onClick={onBack}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors border border-transparent hover:border-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回</span>
          </button>
          
          <div className="h-4 w-px bg-gray-300 mx-1"></div>
          
          <ToolbarButton icon={<Trash2 className="w-4 h-4" />} label="删除" />
          <ToolbarButton icon={<Reply className="w-4 h-4" />} label="回复" />
          <ToolbarButton icon={<ReplyAll className="w-4 h-4" />} label="回复全部" />
          <ToolbarButton icon={<Forward className="w-4 h-4" />} label="转发" />
          <ToolbarButton icon={<AlertOctagon className="w-4 h-4" />} label="举报" />
          
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
        
        <div className="flex items-center text-sm text-gray-500 space-x-2">
          <button className="flex items-center text-gray-400 hover:text-gray-600">
            <ChevronUp className="w-4 h-4" />
            <span>上一封</span>
          </button>
          <button className="flex items-center text-gray-400 hover:text-gray-600">
            <ChevronDown className="w-4 h-4" />
            <span>下一封</span>
          </button>
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <h1 className="text-xl font-bold text-gray-900">{email.subject}</h1>
            <Star className="w-4 h-4 text-gray-300 hover:text-yellow-400 cursor-pointer" />
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">
                {email.senderName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{email.senderName}</span>
                  <span className="text-sm text-gray-500">&lt;{email.senderEmail}&gt;</span>
                </div>
                <div className="text-sm text-gray-500 mt-0.5">
                  收件人 我 &lt;luolong47@qq.com&gt;
                </div>
                {email.hasAttachment && email.attachments && (
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-500">附件</span>
                    <div className="flex items-center border border-yellow-400 bg-yellow-50 rounded px-1.5 py-0.5 text-xs text-gray-700">
                      <div className="w-3 h-3 bg-yellow-400 mr-1 rounded-sm"></div>
                      {email.attachments[0].name}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-2">
              <div className="flex items-center space-x-3 text-gray-400">
                <button className="hover:text-gray-600"><Printer className="w-4 h-4" /></button>
                <button className="hover:text-gray-600"><FileText className="w-4 h-4" /></button>
                <button className="hover:text-gray-600 flex items-center space-x-1">
                  <MoreHorizontal className="w-4 h-4" />
                  <span className="text-xs">更多操作</span>
                </button>
              </div>
              <div className="text-sm text-gray-500">
                2026年4月9日 {email.date} <button className="text-blue-500 hover:underline ml-1">详细信息</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Translation Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-md p-3 mb-6 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-700">
            <span className="mr-2">A文</span>
            <span>邮件可翻译为中文</span>
            <button className="text-blue-500 hover:underline ml-2">全文翻译</button>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Body */}
        <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
          {email.body}
        </div>
        
        {/* Attachments Section */}
        {email.hasAttachment && email.attachments && (
          <div className="mt-10 border border-gray-200 rounded-md p-4">
            <div className="flex items-center text-sm text-gray-700 mb-4 font-medium">
              <Paperclip className="w-4 h-4 mr-2" />
              1 个附件
            </div>
            
            <div className="flex items-center justify-between p-3 border border-gray-100 rounded bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-400 rounded flex items-center justify-center text-white font-bold">
                  7z
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{email.attachments[0].name}</div>
                  <div className="text-xs text-gray-500">({email.attachments[0].size})</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
                  <Download className="w-4 h-4" />
                  <span>下载</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
                  <Cloud className="w-4 h-4" />
                  <span>保存到云盘</span>
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
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
