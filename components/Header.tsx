import React from 'react';
import { Search, Settings, ChevronDown, Check, X, Mail, Paperclip } from 'lucide-react';
import clsx from 'clsx';
import { Email } from '@/lib/mock-data';

// 文件夹 ID 到中文名的映射
const folderNameMap: Record<string, string> = {
  inbox: '收件箱',
  sent: '已发送',
  drafts: '草稿箱',
  trash: '已删除',
  spam: '垃圾箱',
};

interface HeaderProps {
  /** 全量邮件数据，用于搜索匹配 */
  emails: Email[];
  /** 触发搜索过滤的回调，传空字符串代表清除搜索 */
  onSearch: (query: string, field?: string) => void;
  /** 点击搜索建议中的邮件条目时触发 */
  onSelectEmail: (email: Email) => void;
}

/**
 * 将文本中所有匹配关键字的部分用蓝色加粗高亮展示
 */
function HighlightText({ text, keyword }: { text: string; keyword: string }) {
  if (!keyword) return <>{text}</>;
  const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="text-blue-500 font-bold">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function Header({ emails, onSearch, onSelectEmail }: HeaderProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(false);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState('邮件');
  const [searchText, setSearchText] = React.useState('');
  
  const searchContainerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const categories = ['邮件', '文件', '发票', '通讯录', '记事本'];
  
  const advancedFields = [
    { label: '关键字', type: 'input', placeholder: '请输入' },
    { label: '关键字位置', type: 'select', options: ['不限', '主题', '正文', '主题或正文'] },
    { label: '发件人', type: 'input', placeholder: '请输入' },
    { label: '收件人', type: 'input', placeholder: '请输入' },
    { label: '时间', type: 'select', options: ['不限', '一天内', '三天内', '一周内', '一月内'] },
    { label: '所在文件夹', type: 'select', options: ['不限', '收件箱', '已发送', '草稿箱'] },
    { label: '是否包含附件', type: 'select', options: ['不限', '包含附件', '不包含附件'] },
    { label: '已读/未读', type: 'select', options: ['不限', '已读', '未读'] },
  ];

  // 从全量邮件中即时匹配，最多显示 3 条预览
  const suggestedEmails = React.useMemo(() => {
    if (!searchText.trim()) return [];
    const q = searchText.toLowerCase();
    return emails.filter(e =>
      e.subject.toLowerCase().includes(q) ||
      e.senderName.toLowerCase().includes(q) ||
      e.senderEmail.toLowerCase().includes(q) ||
      e.snippet.toLowerCase().includes(q) ||
      e.body.toLowerCase().includes(q) ||
      e.attachments?.some(a => a.name.toLowerCase().includes(q))
    ).slice(0, 3);
  }, [searchText, emails]);

  // 点击外部关闭搜索面板
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setIsCategoryOpen(false);
        setIsAdvancedSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** 执行搜索：通知父组件过滤邮件列表，并关闭下拉面板 */
  const executeSearch = (query: string, field?: string) => {
    onSearch(query, field);
    setIsFocused(false);
    setIsCategoryOpen(false);
    setIsAdvancedSearchOpen(false);
  };

  /** 回车搜索 */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchText.trim()) {
      executeSearch(searchText);
    }
    if (e.key === 'Escape') {
      setSearchText('');
      onSearch('');
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  /** 清空搜索并恢复原列表 */
  const handleClear = () => {
    setSearchText('');
    onSearch('');
  };

  return (
    <div className="h-[60px] bg-[#eef1f6] border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
      {/* Search Bar */}
      <div 
        ref={searchContainerRef}
        className={clsx(
          "flex-1 transition-all duration-300 ease-in-out relative z-40",
          isFocused ? "max-w-[800px]" : "max-w-[500px]"
        )}
      >
        <div className={clsx(
          "relative flex items-center h-[36px] rounded-full px-1.5 border transition-all duration-200",
          isFocused 
            ? "bg-white border-blue-400 shadow-sm" 
            : "bg-[#142E4D0D] border-transparent hover:bg-[#142E4D1A]"
        )}>
          {/* Category Dropdown - Only visible when focused */}
          {isFocused && (
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setIsCategoryOpen(!isCategoryOpen);
                  setIsAdvancedSearchOpen(false);
                }}
                className="flex items-center space-x-1 pl-2.5 pr-2 py-1 hover:bg-black/5 rounded-full text-[13px] text-gray-700 transition-colors shrink-0"
              >
                <Search className="h-4 w-4 text-gray-400 mr-1" />
                <span>{selectedCategory}</span>
                <ChevronDown className="h-3 w-3 text-gray-400" />
              </button>

              {/* Category Dropdown Menu */}
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-lg shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] border border-gray-100 py-1.5 z-50">
                  {categories.map((item) => (
                    <button
                      key={item}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedCategory(item);
                        setIsCategoryOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50 flex items-center justify-between transition-colors"
                    >
                      <span>{item}</span>
                      {selectedCategory === item && <Check className="h-3.5 w-3.5 text-gray-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {isFocused && <div className="h-4 w-px bg-gray-200 mx-1"></div>}

          {!isFocused && <Search className="h-4 w-4 text-gray-400 ml-2.5 shrink-0" />}
          
          {/* Search Input */}
          <input
            ref={inputRef}
            type="text"
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setIsAdvancedSearchOpen(false);
              // 输入为空时清除搜索过滤
              if (!e.target.value.trim()) {
                onSearch('');
              }
            }}
            className="flex-1 h-full bg-transparent pl-2.5 pr-3 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none"
            placeholder="搜索"
          />
          
          {/* Clear Button */}
          {searchText && (
            <button 
              onMouseDown={(e) => {
                e.preventDefault();
                handleClear();
              }}
              className="flex items-center justify-center h-4 w-4 rounded-full bg-gray-300 hover:bg-gray-400 text-white transition-colors mr-1 shrink-0"
            >
              <X className="h-3 w-3" />
            </button>
          )}

          {/* Advanced Search Button - Only visible when focused */}
          {isFocused && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                setIsAdvancedSearchOpen(!isAdvancedSearchOpen);
                setIsCategoryOpen(false);
              }}
              className={clsx(
                "flex items-center space-x-1 px-3 py-1 rounded-full text-[12px] font-medium transition-colors shrink-0 mr-0.5",
                isAdvancedSearchOpen ? "bg-blue-100 text-blue-700" : "bg-blue-50 hover:bg-blue-100 text-blue-600"
              )}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" /><line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" /><line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" /><line x1="2" x2="6" y1="14" y2="14" /><line x1="10" x2="14" y1="8" y2="8" /><line x1="18" x2="22" y1="16" y2="16" />
              </svg>
              <span>高级搜索</span>
            </button>
          )}
        </div>

        {/* Instant Search Suggestions Panel - 用真实 mock 数据匹配 */}
        {isFocused && searchText.trim() && !isAdvancedSearchOpen && (
          <div className="absolute top-[48px] left-0 right-0 bg-white rounded-lg shadow-[0_4px_24px_-4px_rgba(0,0,0,0.15)] border border-gray-100 z-50 overflow-hidden flex flex-col">
            {/* 匹配到的邮件预览 */}
            {suggestedEmails.length > 0 ? (
              <div className="py-1">
                {suggestedEmails.map((email) => (
                  <div 
                    key={email.id}
                    onClick={() => {
                      onSelectEmail(email);
                      setIsFocused(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center text-[13px] min-w-0">
                        <Mail className={clsx("h-4 w-4 mr-2 shrink-0", email.read ? "text-gray-300" : "text-blue-400")} />
                        <span className="truncate">
                          <HighlightText text={email.subject} keyword={searchText} />
                        </span>
                        {email.hasAttachment && <Paperclip className="h-3 w-3 ml-1 text-gray-400 shrink-0" />}
                      </div>
                      <span className="text-[12px] text-gray-400 group-hover:text-gray-600 ml-2 shrink-0">{email.date}</span>
                    </div>
                    <div className="text-[12px] text-gray-500 mt-1 pl-6 truncate">
                      <HighlightText text={email.snippet} keyword={searchText} />
                    </div>
                    <div className="flex justify-between items-center mt-1 pl-6">
                      <div className="text-[12px] text-gray-400 truncate">
                        发件人： <HighlightText text={`${email.senderName}<${email.senderEmail}>`} keyword={searchText} />
                      </div>
                      <div className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] text-gray-500 shrink-0 ml-2">
                        {folderNameMap[email.folder] || email.folder}
                      </div>
                    </div>
                  </div>
                ))}

                <div 
                  onClick={() => executeSearch(searchText)}
                  className="px-4 py-2.5 text-blue-500 hover:bg-gray-50 cursor-pointer text-[13px]"
                >
                  查看全部
                </div>
              </div>
            ) : (
              <div className="px-4 py-6 text-center text-[13px] text-gray-400">
                没有找到与 "<span className="text-gray-600 font-medium">{searchText}</span>" 相关的邮件
              </div>
            )}

            <div className="h-px bg-gray-100 w-full" />

            {/* 按字段快速过滤 */}
            <div className="py-1">
              {[
                { label: '发件人', field: 'sender' },
                { label: '主题', field: 'subject' },
                { label: '正文', field: 'body' },
                { label: '附件名', field: 'attachment' },
              ].map(({ label, field }) => (
                <div 
                  key={field}
                  onClick={() => executeSearch(searchText, field)}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center text-gray-700 transition-colors"
                >
                  <Search className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
                  <span className="text-[13px]">{label}包含 <span className="font-bold ml-1 text-gray-900">{searchText}</span></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Advanced Search Panel */}
        {isFocused && isAdvancedSearchOpen && (
          <div className="absolute top-[48px] left-0 right-0 bg-white rounded-lg shadow-[0_4px_24px_-4px_rgba(0,0,0,0.15)] border border-gray-100 p-6 z-50 text-[13px]">
            <div className="text-gray-400 text-xs mb-5">{selectedCategory}高级搜索</div>
            
            <div className="space-y-4">
              {advancedFields.map((field, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="w-24 shrink-0 text-gray-700">{field.label}</div>
                  <div className="flex-1">
                    {field.type === 'input' ? (
                      <input 
                        type="text" 
                        placeholder={field.placeholder}
                        className="w-full h-8 px-2.5 border border-gray-200 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 hover:border-gray-300 transition-colors"
                      />
                    ) : (
                      <div className="relative">
                        <select className="w-full h-8 pl-2.5 pr-8 border border-gray-200 rounded text-gray-500 appearance-none bg-white focus:outline-none focus:border-blue-400 hover:border-gray-300 transition-colors outline-none cursor-pointer">
                          {field.options?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button 
                onClick={() => setIsAdvancedSearchOpen(false)}
                className="px-6 py-1.5 border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors font-medium bg-white"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  // 目前简单地用搜索框文本作为关键字执行搜索
                  if (searchText.trim()) {
                    executeSearch(searchText);
                  }
                  setIsAdvancedSearchOpen(false);
                }}
                className="px-6 py-1.5 bg-[#8bb4f8] text-white rounded hover:bg-[#689ef2] transition-colors font-medium"
              >
                搜索
              </button>
            </div>
          </div>
        )}
      </div>


      {/* Right Actions */}
      <div className="flex items-center space-x-4 ml-4">
        {/* User Profile */}
        <button className="flex items-center space-x-2 hover:bg-black/5 rounded-md px-2 py-1 transition-colors">
          <img
            className="h-8 w-8 rounded-full object-cover"
            src="https://picsum.photos/seed/avatar/100/100"
            alt="User avatar"
            referrerPolicy="no-referrer"
          />
          <div className="flex items-center text-sm">
            <span className="font-medium text-gray-900">Antigravity</span>
            <span className="text-gray-500 ml-1">· hello@openmail.com</span>
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
