'use client';

import { Button } from '@/components/ui/button';
import { Calculator, Bot } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PeriodicTable from './periodic-table';
import CalculatorComponent from './calculator';
import ChatAssistant from './chat-assistant';

const PeriodicTableIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect width="4" height="4" x="2" y="2" rx="1" />
        <rect width="4" height="4" x="18" y="2" rx="1" />
        <rect width="4" height="4" x="2" y="8" rx="1" />
        <rect width="4" height="4" x="8" y="8" rx="1" />
        <rect width="4" height="4" x="14" y="8" rx="1" />
        <rect width="4" height="4" x="2" y="14" rx="1" />
        <rect width="4" height="4" x="8" y="14" rx="1" />
        <rect width="4" height="4" x="14" y="14" rx="1" />
    </svg>
);


export default function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
       <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full h-14 w-14 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg backdrop-blur-sm border-none">
            <Bot className="h-7 w-7" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl p-0">
          <ChatAssistant />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full h-14 w-14 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg backdrop-blur-sm border-none">
            <PeriodicTableIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
           <DialogHeader>
            <DialogTitle>الجدول الدوري</DialogTitle>
          </DialogHeader>
          <PeriodicTable />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full h-14 w-14 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg backdrop-blur-sm border-none">
            <Calculator className="h-7 w-7" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>آلة حاسبة علمية</DialogTitle>
          </DialogHeader>
          <CalculatorComponent />
        </DialogContent>
      </Dialog>
    </div>
  );
}
