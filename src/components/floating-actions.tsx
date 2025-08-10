'use client';

import { Button } from '@/components/ui/button';
import { Calculator, Bot, ChevronUp, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import PeriodicTable from './periodic-table';
import CalculatorComponent from './calculator';
import ChatAssistant from './chat-assistant';
import { TableCellsIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      id: 'chat',
      icon: <Bot className="h-7 w-7" />,
      label: 'المساعد الذكي',
      component: <ChatAssistant />,
      dialogClassName: 'max-w-2xl p-0',
    },
    {
      id: 'periodic-table',
      icon: <TableCellsIcon className="h-7 w-7" />,
      label: 'الجدول الدوري',
      component: <PeriodicTable />,
      dialogTitle: 'الجدول الدوري',
      dialogClassName: 'max-w-4xl',
    },
    {
      id: 'calculator',
      icon: <Calculator className="h-7 w-7" />,
      label: 'آلة حاسبة',
      component: <CalculatorComponent />,
      dialogTitle: 'آلة حاسبة علمية',
      dialogClassName: 'max-w-sm',
    },
  ];

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-center gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="flex flex-col items-center gap-3"
          >
            {actions.map((action) => (
              <Dialog key={action.id}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-14 w-14 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg backdrop-blur-sm border-none"
                    aria-label={action.label}
                  >
                    {action.icon}
                  </Button>
                </DialogTrigger>
                <DialogContent className={action.dialogClassName}>
                  {action.dialogTitle && (
                    <DialogHeader>
                      <DialogTitle>{action.dialogTitle}</DialogTitle>
                    </DialogHeader>
                  )}
                  {action.component}
                </DialogContent>
              </Dialog>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        className="rounded-full h-16 w-16 bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl transition-transform duration-300 ease-in-out hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={isOpen ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X className="h-8 w-8" /> : <ChevronUp className="h-8 w-8" />}
          </motion.div>
        </AnimatePresence>
      </Button>
    </div>
  );
}
