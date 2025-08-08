'use client';

import { Button } from '@/components/ui/button';
import { Calculator, Sheet, Bot } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PeriodicTable from './periodic-table';
import CalculatorComponent from './calculator';
import ChatAssistant from './chat-assistant';

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
            <Sheet className="h-7 w-7" />
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
