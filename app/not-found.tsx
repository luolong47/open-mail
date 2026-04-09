import Link from 'next/link';
import { MoveLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
      <div className="space-y-6 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-9xl font-black text-primary/20 tracking-tighter">404</h1>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">页面未找到</h2>
          <p className="text-muted-foreground text-lg">
            您访问的资源可能已被移除、重命名或暂时不可用。
          </p>
        </div>

        <div className="pt-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium transition-all hover:ring-4 hover:ring-primary/20 active:scale-95 group"
          >
            <MoveLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            返回主页
          </Link>
        </div>
      </div>
    </div>
  );
}
