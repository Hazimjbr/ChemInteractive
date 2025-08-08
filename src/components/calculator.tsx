'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CalculatorComponent = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const handleButtonClick = (value: string) => {
    if (display === 'Error') {
      setDisplay('0');
      setExpression('');
      return;
    }

    if (value === 'AC') {
      setDisplay('0');
      setExpression('');
    } else if (value === 'DEL') {
      if (display.length > 1) {
        setDisplay(display.slice(0, -1));
        // A bit tricky to update expression correctly, simplified for now
        setExpression(expression.slice(0, -1));
      } else {
        setDisplay('0');
        setExpression('');
      }
    } else if (value === '=') {
      try {
        // A more robust way to handle expressions is needed, but this is a start.
        // Replace ^ with ** for evaluation
        const evalExpression = expression.replace(/\^/g, '**').replace(/√/g, 'Math.sqrt');
        // This is unsafe, but for a trusted environment like this, it's a shortcut.
        // In a real app, you'd want a proper math expression parser.
        const result = new Function('return ' + evalExpression)();
        setDisplay(String(result));
        setExpression(String(result));
      } catch (error) {
        setDisplay('Error');
        setExpression('');
      }
    } else if (['sin', 'cos', 'tan', 'log', 'ln'].includes(value)) {
        handleFunctionPrefix(value);
    } else if (['√', '^'].includes(value)) {
        handleOperator(value);
    }
     else if (value === 'x²') {
        handleFunctionSuffix('**2');
    }
    else {
      if (display === '0' && value !== '.') {
        setDisplay(value);
        setExpression(value);
      } else {
        // Prevent multiple operators
        if(/[\+\-\*\/]$/.test(display) && /[\+\-\*\/]/.test(value)) {
            setDisplay(display.slice(0, -1) + value);
            setExpression(expression.slice(0, -1) + value);
        } else {
            setDisplay(display + value);
            setExpression(expression + value);
        }
      }
    }
  };

  const handleFunctionPrefix = (func: string) => {
    setDisplay(`${func}(`);
    setExpression(`Math.${func}(`);
  };

  const handleFunctionSuffix = (op: string) => {
    setDisplay(display + op);
    setExpression(expression + op);
  }

  const handleOperator = (op: string) => {
    if (op === '√') {
        setDisplay(`√(`);
        setExpression(`Math.sqrt(`)
    } else {
        setDisplay(display + op);
        setExpression(expression + op);
    }
  }

  const buttons = [
    { label: '(', type: 'op' }, { label: ')', type: 'op' }, { label: 'log', type: 'op' }, { label: 'ln', type: 'op' },
    { label: 'AC', type: 'clear' , className: "col-span-2"}, { label: 'DEL', type: 'clear' },
    { label: 'sin', type: 'op' }, { label: 'cos', type: 'op' }, { label: 'tan', type: 'op' }, { label: '√', type: 'op' },
    { label: '7', type: 'num' }, { label: '8', type: 'num' }, { label: '9', type: 'num' },
    { label: 'x²', type: 'op' }, { label: '4', type: 'num' }, { label: '5', type: 'num' }, { label: '6', type: 'num' },
    { label: '^', type: 'op' }, { label: '1', type: 'num' }, { label: '2', type: 'num' }, { label: '3', type: 'num' },
    { label: '/', type: 'op' }, { label: '*', type: 'op' }, { label: '-', type: 'op' }, { label: '+', type: 'op' , className: "row-span-2"},
    { label: '0', type: 'num', className: "col-span-2" }, { label: '.', type: 'num' }, { label: '=', type: 'eq' },
  ];

  const getButtonClass = (type: string) => {
    switch (type) {
        case 'num': return "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-black dark:text-white text-xl";
        case 'op': return "bg-muted hover:bg-muted/80 text-accent-foreground";
        case 'clear': return "bg-destructive/80 hover:bg-destructive/90 text-destructive-foreground";
        case 'eq': return "bg-primary hover:bg-primary/90 text-primary-foreground";
        default: return "";
    }
  }


  return (
    <div className="p-4 bg-background rounded-lg shadow-lg max-w-xs mx-auto border">
       <div className="bg-muted p-2 rounded-md mb-4">
          <div className="text-right text-xs text-muted-foreground h-4 truncate">{expression || "Scientific Calculator"}</div>
          <Input
            type="text"
            value={display}
            readOnly
            className="text-right text-4xl font-mono bg-transparent border-0 h-12"
            dir="ltr"
          />
       </div>

      <div className="grid grid-cols-4 grid-rows-7 gap-2">
         <Button onClick={() => handleButtonClick('AC')} className={`${getButtonClass('clear')} col-span-2 h-auto`}>AC</Button>
         <Button onClick={() => handleButtonClick('DEL')} className={`${getButtonClass('clear')} h-auto`}>DEL</Button>
         <Button onClick={() => handleButtonClick('/')} className={`${getButtonClass('op')} h-auto`}>/</Button>

         <Button onClick={() => handleButtonClick('sin')} className={`${getButtonClass('op')} h-auto`}>sin</Button>
         <Button onClick={() => handleButtonClick('cos')} className={`${getButtonClass('op')} h-auto`}>cos</Button>
         <Button onClick={() => handleButtonClick('tan')} className={`${getButtonClass('op')} h-auto`}>tan</Button>
         <Button onClick={() => handleButtonClick('*')} className={`${getButtonClass('op')} h-auto`}>*</Button>


         <Button onClick={() => handleButtonClick('7')} className={`${getButtonClass('num')} h-auto py-4`}>7</Button>
         <Button onClick={() => handleButtonClick('8')} className={`${getButtonClass('num')} h-auto py-4`}>8</Button>
         <Button onClick={() => handleButtonClick('9')} className={`${getButtonClass('num')} h-auto py-4`}>9</Button>
         <Button onClick={() => handleButtonClick('-')} className={`${getButtonClass('op')} h-auto`}>-</Button>

         <Button onClick={() => handleButtonClick('4')} className={`${getButtonClass('num')} h-auto py-4`}>4</Button>
         <Button onClick={() => handleButtonClick('5')} className={`${getButtonClass('num')} h-auto py-4`}>5</Button>
         <Button onClick={() => handleButtonClick('6')} className={`${getButtonClass('num')} h-auto py-4`}>6</Button>
         <Button onClick={() => handleButtonClick('+')} className={`${getButtonClass('op')} h-auto row-span-2`}>+</Button>


         <Button onClick={() => handleButtonClick('1')} className={`${getButtonClass('num')} h-auto py-4`}>1</Button>
         <Button onClick={() => handleButtonClick('2')} className={`${getButtonClass('num')} h-auto py-4`}>2</Button>
         <Button onClick={() => handleButtonClick('3')} className={`${getButtonClass('num')} h-auto py-4`}>3</Button>

         <Button onClick={() => handleButtonClick('0')} className={`${getButtonClass('num')} h-auto py-4 col-span-2`}>0</Button>
         <Button onClick={() => handleButtonClick('.')} className={`${getButtonClass('num')} h-auto py-4`}>.</Button>
         <Button onClick={() => handleButtonClick('=')} className={`${getButtonClass('eq')} h-auto`}>=</Button>

         <Button onClick={() => handleButtonClick('(')} className={`${getButtonClass('op')} h-auto`}>(</Button>
         <Button onClick={() => handleButtonClick(')')} className={`${getButtonClass('op')} h-auto`}>)</Button>
         <Button onClick={() => handleButtonClick('√')} className={`${getButtonClass('op')} h-auto`}>√</Button>
         <Button onClick={() => handleButtonClick('^')} className={`${getButtonClass('op')} h-auto`}>^</Button>
      </div>
    </div>
  );
};

export default CalculatorComponent;
