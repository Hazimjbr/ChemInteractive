'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, TestTube2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PeriodicTable from './periodic-table';
import CalculatorComponent from './calculator';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 bg-accent text-accent-foreground hover:bg-accent/90">
            <TestTube2 className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
           <DialogHeader>
            <DialogTitle>Periodic Table</DialogTitle>
          </DialogHeader>
          <PeriodicTable />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 bg-accent text-accent-foreground hover:bg-accent/90">
            <Calculator className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Scientific Calculator</DialogTitle>
          </DialogHeader>
          <CalculatorComponent />
        </DialogContent>
      </Dialog>
    </div>
  );
}
