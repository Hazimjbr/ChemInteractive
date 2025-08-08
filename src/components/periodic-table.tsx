'use client';

import * as React from 'react';
import { elements } from '@/data/elements';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PeriodicTable = () => {
  const elementsToShow = elements.filter((el) => el.number <= 10);
  const table = Array(3).fill(null).map(() => Array(18).fill(null));

  elementsToShow.forEach((element) => {
    if (element.ypos - 1 < 3 && element.xpos - 1 < 18) {
      table[element.ypos - 1][element.xpos - 1] = element;
    }
  });

  const getElementColor = (category: string) => {
    switch (category) {
      case 'diatomic nonmetal': return 'bg-green-200 hover:bg-green-300';
      case 'noble gas': return 'bg-purple-200 hover:bg-purple-300';
      case 'alkali metal': return 'bg-red-200 hover:bg-red-300';
      case 'alkaline earth metal': return 'bg-orange-200 hover:bg-orange-300';
      case 'metalloid': return 'bg-yellow-200 hover:bg-yellow-300';
      case 'polyatomic nonmetal': return 'bg-green-300 hover:bg-green-400';
      default: return 'bg-gray-100';
    }
  };

  const ElementCell = ({ element }: { element: any }) => (
    <div
      className={`p-2 border rounded-md text-center transition-transform transform hover:scale-110 cursor-pointer ${getElementColor(
        element.category
      )}`}
    >
      <div className="text-xs font-bold">{element.number}</div>
      <div className="text-lg font-bold">{element.symbol}</div>
      <div className="text-xs truncate">{element.name}</div>
      <div className="text-xs">{element.atomic_mass.toFixed(3)}</div>
    </div>
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
