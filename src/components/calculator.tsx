'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CalculatorComponent = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(true);

  const evaluate = () => {
    const prevValue = currentValue;
    const nextValue = parseFloat(display);

    if (prevValue == null || operator == null) {
      return nextValue;
    }

    switch (operator) {
      case '+':
        return prevValue + nextValue;
      case '-':
        return prevValue - nextValue;
      case '*':
        return prevValue * nextValue;
      case '/':
        return prevValue / nextValue;
      case '^':
        return Math.pow(prevValue, nextValue);
      default:
        return nextValue;
    }
  };

  const handleButtonClick = (value: string) => {
    if (/[0-9]/.test(value)) {
      if (waitingForOperand || display === '0') {
        setDisplay(value);
        setWaitingForOperand(false);
      } else {
        setDisplay(display + value);
      }
    } else if (value === '.') {
      if (waitingForOperand) {
        setDisplay('0.');
        setWaitingForOperand(false);
      } else if (!display.includes('.')) {
        setDisplay(display + '.');
      }
    } else if (['+', '-', '*', '/', '^'].includes(value)) {
       if(operator && !waitingForOperand) {
         const result = evaluate();
         setDisplay(String(result));
         setCurrentValue(result);
       } else {
         setCurrentValue(parseFloat(display));
       }
       setWaitingForOperand(true);
       setOperator(value);
    } else if (value === '=') {
        if (operator && currentValue !== null) {
            const result = evaluate();
            setDisplay(String(result));
            setCurrentValue(result);
            setOperator(null);
            setWaitingForOperand(true);
        }
    } else if (value === 'C') {
      setDisplay('0');
      setCurrentValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    } else if (value === '±') {
        setDisplay((prev) => (parseFloat(prev) * -1).toString());
    } else if (value === '%') {
        setDisplay((prev) => (parseFloat(prev) / 100).toString());
        setWaitingForOperand(true);
    } else if (value === '√') {
        setDisplay((prev) => Math.sqrt(parseFloat(prev)).toString());
        setWaitingForOperand(true);
    } else if (value === 'log') {
        setDisplay((prev) => Math.log10(parseFloat(prev)).toString());
        setWaitingForOperand(true);
    } else if (value === 'ln') {
        setDisplay((prev) => Math.log(parseFloat(prev)).toString());
        setWaitingForOperand(true);
    }
  };

  const buttons = [
    'C', '±', '%', '/',
    'log', 'ln', '√', '^',
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
        dir="ltr"
      />
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <Button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            variant={
              ['/','*','-','+','=','^'].includes(btn) ? 'destructive' :
              ['C', '±', '%', 'log', 'ln', '√'].includes(btn) ? 'secondary' : 'default'
            }
            className={`text-xl ${btn === '0' ? 'col-span-2' : ''}`}
          >
            {btn === '^' ? 'xʸ' : btn === '√' ? '√x' : btn}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CalculatorComponent;
