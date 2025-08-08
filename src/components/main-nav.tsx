import Link from 'next/link';
import { Beaker } from 'lucide-react';

export default function MainNav() {
  return (
    <div className="flex w-full items-center justify-between">
       <Link href="/" className="flex items-center space-x-2">
        <Beaker className="h-6 w-6 text-primary" />
        <span className="inline-block font-bold">ChemInteractive</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/materials"
          className="font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          المواد التعليمية
        </Link>
        <Link
          href="/experiments"
          className="font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          التجارب
        </Link>
        <Link
          href="/quizzes"
          className="font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          الاختبارات
        </Link>
         <Link
          href="/performance-analysis"
          className="font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          تحليل الأداء
        </Link>
      </nav>
    </div>
  );
}
