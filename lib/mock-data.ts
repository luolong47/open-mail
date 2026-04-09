export type Email = {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  snippet: string;
  body: string;
  date: string;
  read: boolean;
  starred: boolean;
  hasAttachment: boolean;
  folder: 'inbox' | 'sent' | 'drafts' | 'trash' | 'spam';
  labels?: string[];
  attachments?: { name: string; size: string }[];
};

export const mockEmails: Email[] = [
  {
    id: '1',
    senderName: 'luol2825',
    senderEmail: '8657838@bank-of-china.com',
    subject: 'test.7z',
    snippet: '*****************************************************************',
    body: '此邮件信息只供收件人查询，所含任何评论、陈述或数据仅供收件人参考，不代表中国银行正式观点，若有改动，恕可能不另行通知。未经中国银行书面许可，请勿披露、复制、转载此邮件信息。任何第三方均不得查阅或使用此邮件信息。发件人及中国银行均不对因邮件可能引发的损失负责。 This message is intended only for use of the addresses and any comment, statement or data contained here in is for the reference of the receivers only and do not represent the official views of Bank of China. Notification may not be sent for any revising related. Please do not disclose, copy, or distribute this e-mail without Bank of China written permission. Any third party shall not read or use the content of this e-mail.The sender and Bank of China are not responsible for the loss caused possibly by e-mail.\n\n*****************************************************************',
    date: '10:26',
    read: false,
    starred: false,
    hasAttachment: true,
    folder: 'inbox',
    attachments: [{ name: 'test.7z', size: '23.2M' }],
  },
  {
    id: '2',
    senderName: 'GitHub',
    senderEmail: 'noreply@github.com',
    subject: '[GitHub] A third-party OAuth application has been added to your account',
    snippet: 'Hey luolong47! A third-party OAuth application (dev-toolkit-pro-dev) with...',
    body: 'Hey luolong47!\n\nA third-party OAuth application (dev-toolkit-pro-dev) with gist, read:org, repo, and workflow scopes was recently authorized to access your account.\nVisit https://github.com/settings/connections/applications/xxx for more information.',
    date: '4/7',
    read: true,
    starred: false,
    hasAttachment: false,
    folder: 'inbox',
  },
  {
    id: '3',
    senderName: '中信银行信用卡中心',
    senderEmail: 'creditcard@citicbank.com',
    subject: '中信银行信用卡电子账单',
    snippet: '尊敬的罗*先生： 感谢您使用中信银行信用卡，2026年04月账单已产生，记录了您2026年03月07日至2026年04月06日账户变动信息。总...',
    body: '尊敬的罗*先生：\n\n感谢您使用中信银行信用卡，2026年04月账单已产生，记录了您2026年03月07日至2026年04月06日账户变动信息。',
    date: '4/7',
    read: true,
    starred: false,
    hasAttachment: false,
    folder: 'inbox',
  },
  {
    id: '4',
    senderName: '广告邮件',
    senderEmail: 'promo@hilton.com',
    subject: 'Hilton Honors',
    snippet: 'Exclusive offers for you...',
    body: 'Check out our latest offers for Hilton Honors members.',
    date: '4/7',
    read: true,
    starred: false,
    hasAttachment: false,
    folder: 'inbox',
    labels: ['AD'],
  },
  {
    id: '5',
    senderName: 'xAI',
    senderEmail: 'noreply@x.ai',
    subject: 'New login to your xAI account',
    snippet: 'Your xAI account has been accessed from a new IP address We\'ve noticed a new login Hi 罗龙, This is a routine securi...',
    body: 'Your xAI account has been accessed from a new IP address.\n\nWe\'ve noticed a new login.\nHi 罗龙, This is a routine security check...',
    date: '4/6',
    read: true,
    starred: false,
    hasAttachment: false,
    folder: 'inbox',
  },
  {
    id: '6',
    senderName: 'Microsoft 帐户团队',
    senderEmail: 'account-security-noreply@accountprotection.microsoft.com',
    subject: '连接到 Microsoft 帐户的新应用',
    snippet: 'Microsoft 帐户 新应用有权访问你的数据 remotely-save 已连接到 Microsoft 帐户 92**3@qq.com。 如果未授予此访问权限，请...',
    body: 'Microsoft 帐户\n\n新应用有权访问你的数据\nremotely-save 已连接到 Microsoft 帐户 92**3@qq.com。\n\n如果未授予此访问权限，请立即检查你的活动。',
    date: '4/6',
    read: true,
    starred: false,
    hasAttachment: false,
    folder: 'inbox',
  },
  {
    id: '7',
    senderName: 'npm',
    senderEmail: 'noreply@npmjs.com',
    subject: 'Successfully published create-worker-rs-template@0.1.9',
    snippet: 'Hi luolong47! A new version of the package create-worker-rs-template (0.1.9) was published at ...',
    body: 'Hi luolong47!\n\nA new version of the package create-worker-rs-template (0.1.9) was published.',
    date: '4/5',
    read: true,
    starred: false,
    hasAttachment: false,
    folder: 'inbox',
  },
  {
    id: '8',
    senderName: 'npm',
    senderEmail: 'noreply@npmjs.com',
    subject: 'Successfully published create-worker-rs-template@0.1.8',
    snippet: 'Hi luolong47! A new version of the package create-worker-rs-template (0.1.8) was published at ...',
    body: 'Hi luolong47!\n\nA new version of the package create-worker-rs-template (0.1.8) was published.',
    date: '4/5',
    read: true,
    starred: false,
    hasAttachment: false,
    folder: 'inbox',
  },
  {
    id: '9',
    senderName: 'luol2825',
    senderEmail: '8657838@bank-of-china.com',
    subject: '回复：test.7z',
    snippet: '666 928496743 luolong47@qq.com 原始邮件 发件人：罗龙 (开发三部/软件中心 (深圳) /软件中心) <8657838@bank-of-china.com> 发件时...',
    body: '666\n\n928496743\nluolong47@qq.com\n\n原始邮件\n发件人：罗龙 (开发三部/软件中心 (深圳) /软件中心) <8657838@bank-of-china.com>\n发件时间：...',
    date: '刚刚',
    read: true,
    starred: false,
    hasAttachment: false,
    folder: 'sent',
  }
];

export const folders = [
  { id: 'inbox', name: '收件箱', icon: 'Inbox', unread: 1 },
  { id: 'starred', name: '星标邮件', icon: 'Star', unread: 0 },
  { id: 'sent', name: '已发送', icon: 'Send', unread: 0 },
  { id: 'drafts', name: '草稿箱', icon: 'FileText', unread: 0 },
  { id: 'trash', name: '已删除', icon: 'Trash2', unread: 0 },
  { id: 'spam', name: '垃圾箱', icon: 'AlertTriangle', unread: 1 },
];

export const customFolders = [
  { id: 'f1', name: 'BONC', count: 0 },
  { id: 'f2', name: 'BOC', count: 0 },
  { id: 'f3', name: 'DLY', count: 0 },
  { id: 'f4', name: '邮件归档', count: 0 },
  { id: 'f5', name: '收藏', count: 0 },
  { id: 'f6', name: '深圳大学', count: 0 },
  { id: 'f7', name: '发票', count: 2 },
  { id: 'f8', name: '回执', count: 0 },
  { id: 'f9', name: '垃圾', count: 0 },
];

export const otherAccounts = [
  { id: 'a1', email: 'luolong47@sina.cn', provider: 'sina' },
  { id: 'a2', email: 'luolong47@163.com', provider: '163' },
  { id: 'a3', email: 'luolong47@126.com', provider: '126' },
  { id: 'a4', email: 'luolong47@139.com', provider: '139' },
  { id: 'a5', email: '2015150139@email.szu.edu.cn', provider: 'szu' },
];
