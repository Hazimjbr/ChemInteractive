import Link from 'next/link';
import { Beaker, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function MainNav() {
  return (
    <div className="flex w-full items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <Beaker className="h-6 w-6 text-primary" />
        <span className="inline-block font-bold">ChemInteractive</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:ring-0">
              المواد التعليمية
              <ChevronDown className="relative top-[1px] mr-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <Link href="/materials/semester-1">
              <DropdownMenuItem>الفصل الأول</DropdownMenuItem>
            </Link>
            <Link href="/materials/semester-2">
              <DropdownMenuItem disabled>الفصل الثاني (قريباً)</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
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
