'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { EmailList } from '@/components/EmailList';
import { EmailDetail } from '@/components/EmailDetail';
import { ComposeEmail } from '@/components/ComposeEmail';
import { mockEmails, folders, Email } from '@/lib/mock-data';

export default function MailClient() {
  const [currentFolder, setCurrentFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposing, setIsComposing] = useState(false);

  const handleSelectFolder = (folderId: string) => {
    setCurrentFolder(folderId);
    setSelectedEmail(null);
    setIsComposing(false);
  };

  const handleSelectEmail = (email: Email) => {
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

  const filteredEmails = mockEmails.filter(email => email.folder === currentFolder);
  const currentFolderName = folders.find(f => f.id === currentFolder)?.name || '邮件';

  return (
    <div className="flex h-screen overflow-hidden bg-white text-gray-900 font-sans">
      <Sidebar 
        currentFolder={currentFolder} 
        onSelectFolder={handleSelectFolder} 
        onCompose={handleCompose}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <div className="flex-1 overflow-hidden relative">
          {isComposing ? (
            <ComposeEmail onClose={handleCloseCompose} />
          ) : selectedEmail ? (
            <EmailDetail email={selectedEmail} onBack={handleBackToList} />
          ) : (
            <EmailList 
              emails={filteredEmails} 
              onSelectEmail={handleSelectEmail} 
              folderName={currentFolderName}
            />
          )}
        </div>
      </div>
    </div>
  );
}
