'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Delete } from "lucide-react";

const scientificButtons = [
  // Scientific functions
  'sin', 'cos', 'tan', 'log', 'ln',
  '^', '√', 'π', 'e', 'C',
  '(', ')',  '7', '8', '9',
  '*', '/', '4', '5', '6',
  '+', '-', '1', '2', '3',
  '.', '0', 'DEL', '=',
];

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const handleButtonClick = (btn: string) => {
    if (display.length > 20 && !['C', '=', 'DEL'].includes(btn)) return;

    switch (btn) {
      case 'C':
        setDisplay('0');
        setExpression('');
        break;
      
      case 'DEL':
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
            setExpression(expression.slice(0, -1));
        } else {
            setDisplay('0');
            setExpression('');
        }
        break;

      case '=':
        if (expression === '') return;
        try {
          // A simple eval is used here. For a production app, a safer math expression parser is recommended.
          let evalExpression = expression
            .replace(/√/g, 'Math.sqrt')
            .replace(/\^/g, '**')
            .replace(/π/g, 'Math.PI')
            .replace(/e/g, 'Math.E')
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/log/g, 'Math.log10')
            .replace(/ln/g, 'Math.log');
          
          // Basic validation to prevent errors with hanging operators
          const lastChar = evalExpression.slice(-1);
          if (['+','-','*','/','**','('].includes(lastChar)) {
             evalExpression = evalExpression.slice(0, -1);
          }

          const result = new Function(`return ${evalExpression}`)();
          const finalResult = parseFloat(result.toFixed(10)); // Fix floating point inaccuracies
          setDisplay(String(finalResult));
          setExpression(String(finalResult));
        } catch (error) {
          setDisplay('Error');
          setExpression('');
        }
        break;
        
      case '√':
      case 'sin':
      case 'cos':
      case 'tan':
      case 'log':
      case 'ln':
        const funcWithParen = btn + '(';
        if (display === '0' || display === 'Error') {
            setExpression(funcWithParen);
            setDisplay(funcWithParen);
        } else {
             setExpression(expression + funcWithParen);
             setDisplay(display + funcWithParen);
        }
        break;
      
      case 'π':
      case 'e':
        if (display === '0' || display === 'Error' ) {
          setDisplay(btn);
          setExpression(btn);
        } else if (['+','-','*','/','(','^'].some(op => expression.endsWith(op))) {
          setDisplay(display + btn);
          setExpression(expression + btn);
        }
        break;
        
      default: // For numbers, operators, and parenthesis
        if (display === '0' && btn !== '.') {
          setDisplay(btn);
          setExpression(btn);
        } else if (display === 'Error') {
            setDisplay(btn);
            setExpression(btn);
        } else {
          // Prevent multiple operators in a row
          const lastChar = expression.slice(-1);
          const isLastCharOperator = ['+','-','*','/','^','.'].includes(lastChar);
          const isCurrentBtnOperator = ['+','-','*','/','^','.'].includes(btn);
          if(isLastCharOperator && isCurrentBtnOperator) return;

          setDisplay(display + btn);
          setExpression(expression + btn);
        }
        break;
    }
  };


  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <div className="bg-muted text-right text-3xl font-mono p-4 rounded-lg break-all h-20 flex items-end justify-end">
        {display}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {scientificButtons.map((btn) => {
          const isOperator = ['/', '*', '-', '+', '^'].includes(btn);
          const isEqual = btn === '=';
          const isClear = btn === 'C';
          const isDelete = btn === 'DEL';
          const isFunction = ['sin', 'cos', 'tan', 'log', 'ln', '√', 'π', 'e', '(', ')'].includes(btn);
          
          let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'secondary';
          if (isOperator) variant = 'default';
          if (isClear || isDelete) variant = 'destructive';
          if (isFunction) variant = 'outline';

          return (
            <Button
              key={btn}
              variant={variant}
              className={`text-lg h-14 ${isEqual ? 'col-span-2' : ''}`}
              size="lg"
              onClick={() => handleButtonClick(btn)}
            >
              {btn === 'DEL' ? <Delete /> : btn}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
