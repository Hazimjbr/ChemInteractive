import Link from 'next/link';
import { BeakerIcon } from 'lucide-react';

export default function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <BeakerIcon className="h-6 w-6 text-primary" />
        <span className="inline-block font-bold">ChemInteractive</span>
      </Link>
      <nav className="flex gap-6">
        <Link
          href="/materials"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Learning Material
        </Link>
        <Link
          href="/experiments"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Experiments
        </Link>
        <Link
          href="/quizzes"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Quizzes
        </Link>
        <Link
          href="/performance-analysis"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Performance
        </Link>
      </nav>
    </div>
  );
}
