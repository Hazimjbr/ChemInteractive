'use client';

import * as React from 'react';
import { elements } from '@/data/elements';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const PeriodicTable = () => {
  const elementsToShow = elements.filter((el) => el.number <= 54); // Up to Xenon
  const table = Array(5).fill(null).map(() => Array(18).fill(null));

  elementsToShow.forEach((element) => {
    if (element.ypos - 1 < 5 && element.xpos - 1 < 18) {
      table[element.ypos - 1][element.xpos - 1] = element;
    }
  });

  const getElementColor = (category: string) => {
    if (category.includes('noble gas')) return 'bg-purple-200 hover:bg-purple-300 border-purple-300';
    if (category.includes('alkali metal')) return 'bg-red-200 hover:bg-red-300 border-red-300';
    if (category.includes('alkaline earth metal')) return 'bg-orange-200 hover:bg-orange-300 border-orange-300';
    if (category.includes('transition metal')) return 'bg-blue-200 hover:bg-blue-300 border-blue-300';
    if (category.includes('post-transition metal')) return 'bg-indigo-200 hover:bg-indigo-300 border-indigo-300';
    if (category.includes('metalloid')) return 'bg-yellow-200 hover:bg-yellow-300 border-yellow-300';
    if (category.includes('nonmetal')) return 'bg-green-200 hover:bg-green-300 border-green-300';
    return 'bg-gray-100';
  };

  const ElementCell = ({ element }: { element: any }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`p-1 border-2 rounded-md text-center transition-transform transform hover:scale-110 cursor-pointer ${getElementColor(
              element.category
            )}`}
          >
            <div className="text-xs font-bold">{element.number}</div>
            <div className="text-lg font-bold">{element.symbol}</div>
            <div className="text-xs truncate">{element.name.split("").reverse().join("")}</div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>الاسم: {element.name.split("").reverse().join("")}</p>
          <p>الكتلة الذرية: {element.atomic_mass.toFixed(3)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-18 gap-1">
        {table.flat().map((element, index) =>
          element ? (
            <ElementCell key={element.number} element={element} />
          ) : (
            <div key={index}></div>
          )
        )}
      </div>
    </div>
  );
};

export default PeriodicTable;
