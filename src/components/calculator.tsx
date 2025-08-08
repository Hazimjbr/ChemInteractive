'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CalculatorComponent = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setDisplay('0');
      setExpression('');
    } else if (value === '=') {
      try {
        // Warning: Using eval can be a security risk.
        // This is a simplified example. For a real app, use a math expression parser library.
        const result = eval(expression.replace(/%/g, '/100'));
        setDisplay(result.toString());
        setExpression(result.toString());
      } catch (error) {
        setDisplay('Error');
        setExpression('');
      }
    } else if (value === '±') {
        setDisplay((prev) => (parseFloat(prev) * -1).toString());
        setExpression((prev) => (parseFloat(prev) * -1).toString());
    } else {
        setExpression((prev) => {
            if (display === '0' || expression === 'Error') return value;
            return prev + value;
        });
        setDisplay((prev) => {
            if (prev === '0' || prev === 'Error') return value;
            // A bit of logic to keep the display clean
            const lastChar = expression.slice(-1);
            if (['+','-','*','/','%'].includes(lastChar) && ['+','-','*','/','%'].includes(value)) {
                 return prev;
            }
            if (['+','-','*','/','%'].includes(lastChar)) {
                return value;
            }
            return prev + value;
        });
    }
  };

  const buttons = [
    'C', '±', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '=',
  ];

  return (
    <div className="p-4 bg-card rounded-lg shadow-lg">
      <Input
        type="text"
        value={display}
        readOnly
        className="mb-4 text-right text-3xl font-mono bg-muted"
      />
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <Button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            variant={
              ['/','*','-','+','='].includes(btn) ? 'destructive' :
              ['C', '±', '%'].includes(btn) ? 'secondary' : 'default'
            }
            className={`text-xl ${btn === '0' ? 'col-span-2' : ''}`}
          >
            {btn}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CalculatorComponent;
