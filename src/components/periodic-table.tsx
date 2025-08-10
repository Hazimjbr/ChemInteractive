'use client';

import { cn } from "@/lib/utils.tsx";
import type { SVGProps } from "react";

const elements = [
    // Row 1
    { x: 51.6, y: 30.1, number: 1, symbol: 'H', name: 'هيدروجين', mass: '1.008' },
    { x: 896.5, y: 30.1, number: 2, symbol: 'He', name: 'هيليوم', mass: '4.003' },
    // Row 2
    { x: 51.6, y: 85.9, number: 3, symbol: 'Li', name: 'ليثيوم', mass: '6.941' },
    { x: 101.3, y: 85.9, number: 4, symbol: 'Be', name: 'بيريليوم', mass: '9.012' },
    { x: 648, y: 85.9, number: 5, symbol: 'B', name: 'بورون', mass: '10.81' },
    { x: 697.7, y: 85.9, number: 6, symbol: 'C', name: 'كربون', mass: '12.01' },
    { x: 747.4, y: 85.9, number: 7, symbol: 'N', name: 'نيتروجين', mass: '14.01' },
    { x: 797.1, y: 85.9, number: 8, symbol: 'O', name: 'أكسجين', mass: '16.00' },
    { x: 846.8, y: 85.9, number: 9, symbol: 'F', name: 'فلور', mass: '19.00' },
    { x: 896.5, y: 85.9, number: 10, symbol: 'Ne', name: 'نيون', mass: '20.18' },
    // Row 3
    { x: 51.6, y: 141.7, number: 11, symbol: 'Na', name: 'صوديوم', mass: '22.99' },
    { x: 101.3, y: 141.7, number: 12, symbol: 'Mg', name: 'ماغنسيوم', mass: '24.31' },
    { x: 648, y: 141.7, number: 13, symbol: 'Al', name: 'ألومنيوم', mass: '26.98' },
    { x: 697.7, y: 141.7, number: 14, symbol: 'Si', name: 'سيليكون', mass: '28.09' },
    { x: 747.4, y: 141.7, number: 15, symbol: 'P', name: 'فسفور', mass: '30.97' },
    { x: 797.1, y: 141.7, number: 16, symbol: 'S', name: 'كبريت', mass: '32.07' },
    { x: 846.8, y: 141.7, number: 17, symbol: 'Cl', name: 'كلور', mass: '35.45' },
    { x: 896.5, y: 141.7, number: 18, symbol: 'Ar', name: 'أرجون', mass: '39.95' },
    // Row 4
    { x: 51.6, y: 197.5, number: 19, symbol: 'K', name: 'بوتاسيوم', mass: '39.10' },
    { x: 101.3, y: 197.5, number: 20, symbol: 'Ca', name: 'كالسيوم', mass: '40.08' },
    { x: 151, y: 197.5, number: 21, symbol: 'Sc', name: 'سكانديوم', mass: '44.96' },
    { x: 200.7, y: 197.5, number: 22, symbol: 'Ti', name: 'تيتانيوم', mass: '47.87' },
    { x: 250.4, y: 197.5, number: 23, symbol: 'V', name: 'فاناديوم', mass: '50.94' },
    { x: 300.1, y: 197.5, number: 24, symbol: 'Cr', name: 'كروم', mass: '52.00' },
    { x: 349.8, y: 197.5, number: 25, symbol: 'Mn', name: 'منغنيز', mass: '54.94' },
    { x: 399.5, y: 197.5, number: 26, symbol: 'Fe', name: 'حديد', mass: '55.85' },
    { x: 449.2, y: 197.5, number: 27, symbol: 'Co', name: 'كوبالت', mass: '58.93' },
    { x: 498.9, y: 197.5, number: 28, symbol: 'Ni', name: 'نيكل', mass: '58.69' },
    { x: 548.6, y: 197.5, number: 29, symbol: 'Cu', name: 'نحاس', mass: '63.55' },
    { x: 598.3, y: 197.5, number: 30, symbol: 'Zn', name: 'خارصين', mass: '65.39' },
    { x: 648, y: 197.5, number: 31, symbol: 'Ga', name: 'جاليوم', mass: '69.72' },
    { x: 697.7, y: 197.5, number: 32, symbol: 'Ge', name: 'جرمانيوم', mass: '72.64' },
    { x: 747.4, y: 197.5, number: 33, symbol: 'As', name: 'زرنيخ', mass: '74.92' },
    { x: 797.1, y: 197.5, number: 34, symbol: 'Se', name: 'سيلينيوم', mass: '78.96' },
    { x: 846.8, y: 197.5, number: 35, symbol: 'Br', name: 'بروم', mass: '79.90' },
    { x: 896.5, y: 197.5, number: 36, symbol: 'Kr', name: 'كريبتون', mass: '83.80' },
    // Row 5
    { x: 51.6, y: 253.3, number: 37, symbol: 'Rb', name: 'روبيديوم', mass: '85.47' },
    { x: 101.3, y: 253.3, number: 38, symbol: 'Sr', name: 'سترونشيوم', mass: '87.62' },
    { x: 151, y: 253.3, number: 39, symbol: 'Y', name: 'إتريوم', mass: '88.91' },
    { x: 200.7, y: 253.3, number: 40, symbol: 'Zr', name: 'زركونيوم', mass: '91.22' },
    { x: 250.4, y: 253.3, number: 41, symbol: 'Nb', name: 'نيوبيوم', mass: '92.91' },
    { x: 300.1, y: 253.3, number: 42, symbol: 'Mo', name: 'موليبدنوم', mass: '95.94' },
    { x: 349.8, y: 253.3, number: 43, symbol: 'Tc', name: 'تكنيشيوم', mass: '(98)' },
    { x: 399.5, y: 253.3, number: 44, symbol: 'Ru', name: 'روثينيوم', mass: '101.1' },
    { x: 449.2, y: 253.3, number: 45, symbol: 'Rh', name: 'روديوم', mass: '102.9' },
    { x: 498.9, y: 253.3, number: 46, symbol: 'Pd', name: 'بالاديوم', mass: '106.4' },
    { x: 548.6, y: 253.3, number: 47, symbol: 'Ag', name: 'فضة', mass: '107.9' },
    { x: 598.3, y: 253.3, number: 48, symbol: 'Cd', name: 'كادميوم', mass: '112.4' },
    { x: 648, y: 253.3, number: 49, symbol: 'In', name: 'إنديوم', mass: '114.8' },
    { x: 697.7, y: 253.3, number: 50, symbol: 'Sn', name: 'قصدير', mass: '118.7' },
    { x: 747.4, y: 253.3, number: 51, symbol: 'Sb', name: 'إثمد', mass: '121.8' },
    { x: 797.1, y: 253.3, number: 52, symbol: 'Te', name: 'تيلوريوم', mass: '127.6' },
    { x: 846.8, y: 253.3, number: 53, symbol: 'I', name: 'يود', mass: '126.9' },
    { x: 896.5, y: 253.3, number: 54, symbol: 'Xe', name: 'زينون', mass: '131.3' },
];

interface ElementCellProps {
    x: number;
    y: number;
    number: number;
    symbol: string;
    name: string;
    mass: string;
}

const ElementCell = ({ x, y, number, symbol, name, mass }: ElementCellProps) => (
    <>
        <rect x={x} y={y} width="49.7" height="55.8" stroke="#000" strokeWidth="0.59" fill="#fff" strokeMiterlimit={10} />
        <text x={x + 16} y={y + 11.9} fontFamily="Arial-BoldMT, Arial" fontWeight={700} fontSize="12px" textAnchor="start">{number}</text>
        <text x={x + 24.85} y={y + 24.9} fontFamily="Arial-BoldMT, Arial" fontWeight={700} fontSize="14px" textAnchor="middle">{symbol}</text>
        <text x={x + 24.85} y={y + 39.9} fontFamily="ArialMT, Arial" fontSize="12px" textAnchor="middle">{name}</text>
        <text x={x + 24.85} y={y + 51.9} fontFamily="ArialMT, Arial" fontSize="12px" textAnchor="middle">{mass}</text>
    </>
);

function PeriodicTable({ className, ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 950 310"
            className={cn("w-full h-auto", className)}
            {...props}
        >
            {elements.map(el => (
                <ElementCell key={el.number} {...el} />
            ))}
        </svg>
    )
}

export default PeriodicTable;
