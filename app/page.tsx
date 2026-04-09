'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { EmailList } from '@/components/EmailList';
import { EmailDetail } from '@/components/EmailDetail';
import { ComposeEmail } from '@/components/ComposeEmail';
import { mockEmails as initialEmails, folders as initialFolders, Email } from '@/lib/mock-data';
import { motion, AnimatePresence } from 'motion/react';

export default function MailClient() {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [currentFolder, setCurrentFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposing, setIsComposing] = useState(false);

  // 搜索状态
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState<string | undefined>(undefined);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // 模拟从服务器获取数据或在客户端更新已读状态
  const handleSelectFolder = (folderId: string) => {
    setCurrentFolder(folderId);
    setSelectedEmail(null);
    setIsComposing(false);
    // 切换文件夹时清除搜索
    setSearchQuery('');
    setSearchField(undefined);
    setIsSearchActive(false);
  };

  const handleSelectEmail = (email: Email) => {
    // 将邮件标记为已读
    if (!email.read) {
      setEmails(prev => prev.map(e => 
        e.id === email.id ? { ...e, read: true } : e
      ));
    }
    setSelectedEmail(email);
    setIsComposing(false);
  };

  const handleCompose = () => {
    setIsComposing(true);
    setSelectedEmail(null);
  };

  const handleCloseCompose = () => {
    setIsComposing(false);
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  /**
   * 搜索回调：接收搜索关键字和可选的字段限定
   * @param query 搜索关键字，为空则取消搜索
   * @param field 可选的字段限定：'sender' | 'subject' | 'body' | 'attachment'
   */
  const handleSearch = useCallback((query: string, field?: string) => {
    setSearchQuery(query);
    setSearchField(field);
    setIsSearchActive(!!query.trim());
    setSelectedEmail(null);
    setIsComposing(false);
  }, []);

  // 根据搜索条件过滤邮件
  const filteredEmails = React.useMemo(() => {
    let result = emails;
    
    // 如果没有激活搜索，按文件夹筛选
    if (!isSearchActive) {
      return result.filter(email => email.folder === currentFolder);
    }

    // 搜索模式：在全部邮件中搜索
    const q = searchQuery.toLowerCase();
    result = result.filter(email => {
      switch (searchField) {
        case 'sender':
          return email.senderName.toLowerCase().includes(q) || 
                 email.senderEmail.toLowerCase().includes(q);
        case 'subject':
          return email.subject.toLowerCase().includes(q);
        case 'body':
          return email.body.toLowerCase().includes(q) ||
                 email.snippet.toLowerCase().includes(q);
        case 'attachment':
          return email.attachments?.some(a => a.name.toLowerCase().includes(q)) ?? false;
        default:
          // 全字段搜索
          return email.subject.toLowerCase().includes(q) ||
                 email.senderName.toLowerCase().includes(q) ||
                 email.senderEmail.toLowerCase().includes(q) ||
                 email.snippet.toLowerCase().includes(q) ||
                 email.body.toLowerCase().includes(q) ||
                 (email.attachments?.some(a => a.name.toLowerCase().includes(q)) ?? false);
      }
    });

    return result;
  }, [emails, currentFolder, isSearchActive, searchQuery, searchField]);

  // 动态计算当前文件夹名称或搜索结果标题
  const currentFolderName = isSearchActive 
    ? `搜索 "${searchQuery}"${searchField ? ` (${
        { sender: '发件人', subject: '主题', body: '正文', attachment: '附件名' }[searchField] || ''
      })` : ''}`
    : (initialFolders.find(f => f.id === currentFolder)?.name || '邮件');

  return (
    <div className="flex h-screen overflow-hidden bg-white text-gray-900 font-sans">
      <Sidebar 
        currentFolder={currentFolder} 
        onSelectFolder={handleSelectFolder} 
        onCompose={handleCompose}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          emails={emails}
          onSearch={handleSearch}
          onSelectEmail={handleSelectEmail}
        />
        
        <div className="flex-1 overflow-hidden relative bg-white">
          <AnimatePresence mode="wait">
            {isComposing ? (
              <motion.div
                key="compose"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full w-full"
              >
                <ComposeEmail onClose={handleCloseCompose} />
              </motion.div>
            ) : selectedEmail ? (
              <motion.div
                key={`detail-${selectedEmail.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="h-full w-full"
              >
                <EmailDetail email={selectedEmail} onBack={handleBackToList} />
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full w-full"
              >
                <EmailList 
                  emails={filteredEmails} 
                  onSelectEmail={handleSelectEmail} 
                  folderName={currentFolderName}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
