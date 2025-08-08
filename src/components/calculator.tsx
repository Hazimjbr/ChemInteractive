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
        setExpression(expression.slice(0, -1));
      } else {
        setDisplay('0');
        setExpression('');
      }
    } else if (value === '=') {
      try {
        // Replace visual operators with JS-compatible ones for evaluation
        const evalExpression = expression
          .replace(/√/g, 'Math.sqrt')
          .replace(/\^/g, '**');

        // Basic validation to prevent unsafe evaluation
        if (/[^0-9\+\-\*\/\.\(\)\s\^eMathsqrt]/.test(evalExpression)) {
            throw new Error("Invalid characters in expression");
        }

        const result = new Function('return ' + evalExpression)();
        if (isNaN(result) || !isFinite(result)) {
            throw new Error("Invalid calculation");
        }

        setDisplay(String(result));
        setExpression(String(result));
      } catch (error) {
        setDisplay('Error');
        setExpression('');
      }
    } else if (['sin', 'cos', 'tan', 'log', 'ln'].includes(value)) {
        handleFunction(value);
    } else if (value === '√') {
        handleFunction('√');
    } else {
      // Append value to display and expression
      if (display === '0' && value !== '.') {
        setDisplay(value);
        setExpression(value);
      } else {
         // Prevent multiple operators in a row
        if(/[\+\-\*\/\^]$/.test(display) && /[\+\-\*\/]/.test(value)) {
            setDisplay(display.slice(0, -1) + value);
            setExpression(expression.slice(0, -1) + value);
        } else {
            setDisplay(display + value);
            setExpression(expression + value);
        }
      }
    }
  };

  const handleFunction = (func: string) => {
    if (display === 'Error' || display === '0') {
      setDisplay(`${func}(`);
      setExpression(`Math.${func}(`);
    } else {
       setDisplay(display + `${func}(`);
       setExpression(expression + `Math.${func}(`);
    }
  };

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

      <div className="grid grid-cols-4 grid-rows-6 gap-2">
         {/* Row 1 */}
         <Button onClick={() => handleButtonClick('AC')} className={`${getButtonClass('clear')} col-span-2 h-auto py-4`}>AC</Button>
         <Button onClick={() => handleButtonClick('DEL')} className={`${getButtonClass('clear')} h-auto py-4`}>DEL</Button>
         <Button onClick={() => handleButtonClick('/')} className={`${getButtonClass('op')} h-auto py-4`}>/</Button>
         
         {/* Row 2 */}
         <Button onClick={() => handleButtonClick('7')} className={`${getButtonClass('num')} h-auto py-4`}>7</Button>
         <Button onClick={() => handleButtonClick('8')} className={`${getButtonClass('num')} h-auto py-4`}>8</Button>
         <Button onClick={() => handleButtonClick('9')} className={`${getButtonClass('num')} h-auto py-4`}>9</Button>
         <Button onClick={() => handleButtonClick('*')} className={`${getButtonClass('op')} h-auto py-4`}>*</Button>
        
         {/* Row 3 */}
         <Button onClick={() => handleButtonClick('4')} className={`${getButtonClass('num')} h-auto py-4`}>4</Button>
         <Button onClick={() => handleButtonClick('5')} className={`${getButtonClass('num')} h-auto py-4`}>5</Button>
         <Button onClick={() => handleButtonClick('6')} className={`${getButtonClass('num')} h-auto py-4`}>6</Button>
         <Button onClick={() => handleButtonClick('-')} className={`${getButtonClass('op')} h-auto py-4`}>-</Button>

         {/* Row 4 */}
         <Button onClick={() => handleButtonClick('1')} className={`${getButtonClass('num')} h-auto py-4`}>1</Button>
         <Button onClick={() => handleButtonClick('2')} className={`${getButtonClass('num')} h-auto py-4`}>2</Button>
         <Button onClick={() => handleButtonClick('3')} className={`${getButtonClass('num')} h-auto py-4`}>3</Button>
         <Button onClick={() => handleButtonClick('+')} className={`${getButtonClass('op')} h-auto py-4 row-span-2`}>+</Button>
         
         {/* Row 5 */}
         <Button onClick={() => handleButtonClick('0')} className={`${getButtonClass('num')} h-auto py-4 col-span-2`}>0</Button>
         <Button onClick={() => handleButtonClick('.')} className={`${getButtonClass('num')} h-auto py-4`}>.</Button>
        
         {/* Row 6 */}
         <Button onClick={() => handleButtonClick('(')} className={`${getButtonClass('op')} h-auto py-4`}>(</Button>
         <Button onClick={() => handleButtonClick(')')} className={`${getButtonClass('op')} h-auto py-4`}>)</Button>
         <Button onClick={() => handleButtonClick('√')} className={`${getButtonClass('op')} h-auto py-4`}>√</Button>
         <Button onClick={() => handleButtonClick('=')} className={`${getButtonClass('eq')} h-auto py-4`}>=</Button>
      </div>
    </div>
  );
};

export default CalculatorComponent;
