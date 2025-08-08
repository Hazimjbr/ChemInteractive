"use client";

import * as React from 'react';
import { elements } from '@/data/elements';

const PeriodicTable = () => {
  // Create a 7x18 grid for the main table layout
  const table = Array(7).fill(null).map(() => Array(18).fill(null));

  // Place elements in the grid based on their xpos and ypos
  elements.forEach(element => {
    // Check for lanthanides and actinides to place them later
    if (element.category !== 'lanthanide' && element.category !== 'actinide') {
       if (element.ypos-1 < 7 && element.xpos-1 < 18) {
        table[element.ypos - 1][element.xpos - 1] = element;
      }
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
      case 'post-transition metal': return 'bg-blue-200 hover:bg-blue-300';
      case 'transition metal': return 'bg-blue-300 hover:bg-blue-400';
      case 'lanthanide': return 'bg-indigo-200 hover:bg-indigo-300';
      case 'actinide': return 'bg-pink-200 hover:bg-pink-300';
      default: return 'bg-gray-100';
    }
  };

  const ElementCell = ({ element }: { element: any }) => (
    <div
      className={`p-1 sm:p-2 border rounded-md text-center transition-transform transform hover:scale-110 cursor-pointer ${getElementColor(element.category)}`}
    >
      <div className="text-xs font-bold">{element.number}</div>
      <div className="text-sm sm:text-lg font-bold">{element.symbol}</div>
      <div className="hidden sm:block text-xs truncate">{element.name}</div>
      <div className="hidden sm:block text-xs">{element.atomic_mass.toFixed(3)}</div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-18 gap-1">
        {table.flat().map((element, index) => (
          element ? <ElementCell key={element.number} element={element} /> : <div key={index}></div>
        ))}
      </div>
    </div>
  );
};

export default PeriodicTable;
