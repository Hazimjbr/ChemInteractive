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
        // Replace ^ with ** for evaluation
        const evalExpression = expression.replace(/\^/g, '**');
        const result = new Function('return ' + evalExpression)();
        setDisplay(String(result));
        setExpression(String(result));
      } catch (error) {
        setDisplay('Error');
        setExpression('');
      }
    } else if (['sin', 'cos', 'tan', 'log', 'ln', '√'].includes(value)) {
        handleFunction(value);
    } else if (value === 'x²') {
        handleFunction('^2');
    }
    else {
      if (display === '0' && value !== '.') {
        setDisplay(value);
        setExpression(value);
      } else {
        setDisplay(display + value);
        setExpression(expression + value);
      }
    }
  };

  const handleFunction = (func: string) => {
     try {
        let currentVal = parseFloat(display);
        let result;
        switch(func) {
            case 'sin':
                result = Math.sin(currentVal * Math.PI / 180); // Assuming degree mode
                break;
            case 'cos':
                result = Math.cos(currentVal * Math.PI / 180);
                break;
            case 'tan':
                result = Math.tan(currentVal * Math.PI / 180);
                break;
            case 'log':
                result = Math.log10(currentVal);
                break;
            case 'ln':
                result = Math.log(currentVal);
                break;
            case '√':
                result = Math.sqrt(currentVal);
                break;
            case '^2':
                result = Math.pow(currentVal, 2);
                break;
            default:
                result = display;
        }
        setDisplay(String(result));
        setExpression(String(result));
     } catch (error) {
         setDisplay('Error');
         setExpression('');
     }
  };


  const buttons = [
    '(', ')', '√', 'x²', '^', 'log', 'ln',
    'sin', 'cos', 'tan', 'DEL', 'AC',
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
  ];

  return (
    <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg max-w-xs mx-auto">
       <div className="bg-gray-900 text-white p-2 rounded-md mb-4">
          <div className="text-right text-xs text-gray-400 h-4 truncate">{expression || "Karouida KK-82MS-D"}</div>
          <Input
            type="text"
            value={display}
            readOnly
            className="text-right text-4xl font-mono bg-transparent border-0 h-12"
            dir="ltr"
          />
       </div>

      <div className="grid grid-cols-7 gap-1">
        {buttons.slice(0, 7).map(btn => (
             <Button key={btn} onClick={() => handleButtonClick(btn)} className="bg-gray-600 hover:bg-gray-700 text-white text-lg col-span-1">
                {btn}
            </Button>
        ))}
        {buttons.slice(7, 10).map(btn => (
             <Button key={btn} onClick={() => handleButtonClick(btn)} className="bg-gray-600 hover:bg-gray-700 text-white text-lg col-span-1">
                {btn}
            </Button>
        ))}
         <Button onClick={() => handleButtonClick('DEL')} className="bg-blue-500 hover:bg-blue-600 text-white text-lg col-span-2">DEL</Button>
         <Button onClick={() => handleButtonClick('AC')} className="bg-red-600 hover:bg-red-700 text-white text-lg col-span-2">AC</Button>

         {buttons.slice(12, 15).map(btn => (
             <Button key={btn} onClick={() => handleButtonClick(btn)} className="bg-gray-100 hover:bg-gray-200 text-black text-2xl font-bold col-span-1 py-4">
                {btn}
            </Button>
         ))}
          <Button key={buttons[15]} onClick={() => handleButtonClick(buttons[15])} className="bg-gray-400 hover:bg-gray-500 text-black text-2xl font-bold col-span-1 py-4">
            {buttons[15]}
         </Button>
          <Button key={buttons[16]} onClick={() => handleButtonClick(buttons[16])} className="bg-gray-400 hover:bg-gray-500 text-black text-2xl font-bold col-span-1 py-4 row-span-4 self-stretch">
            {buttons[16]}
         </Button>


        {buttons.slice(17, 20).map(btn => (
             <Button key={btn} onClick={() => handleButtonClick(btn)} className="bg-gray-100 hover:bg-gray-200 text-black text-2xl font-bold col-span-1 py-4">
                {btn}
            </Button>
         ))}
         <Button key={buttons[20]} onClick={() => handleButtonClick(buttons[20])} className="bg-gray-400 hover:bg-gray-500 text-black text-2xl font-bold col-span-1 py-4">
            {buttons[20]}
         </Button>


        {buttons.slice(21, 24).map(btn => (
             <Button key={btn} onClick={() => handleButtonClick(btn)} className="bg-gray-100 hover:bg-gray-200 text-black text-2xl font-bold col-span-1 py-4">
                {btn}
            </Button>
         ))}

         <Button key={buttons[24]} onClick={() => handleButtonClick(buttons[24])} className="bg-gray-100 hover:bg-gray-200 text-black text-2xl font-bold col-span-2 py-4">
            {buttons[24]}
         </Button>
         <Button key={buttons[25]} onClick={() => handleButtonClick(buttons[25])} className="bg-gray-100 hover:bg-gray-200 text-black text-2xl font-bold col-span-1 py-4">
            {buttons[25]}
         </Button>
         <Button key={buttons[26]} onClick={() => handleButtonClick(buttons[26])} className="bg-gray-400 hover:bg-gray-500 text-black text-2xl font-bold col-span-1 py-4">
            {buttons[26]}
         </Button>
      </div>
    </div>
  );
};

export default CalculatorComponent;
