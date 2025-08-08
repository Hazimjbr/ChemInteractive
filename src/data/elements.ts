export interface Element {
  name: string;
  symbol: string;
  number: number;
  atomic_mass: number;
  category: string;
  xpos: number;
  ypos: number;
}

export const elements: Element[] = [
  { "name": "هيدروجين", "symbol": "H", "number": 1, "atomic_mass": 1.008, "category": "diatomic nonmetal", "xpos": 1, "ypos": 1 },
  { "name": "هيليوم", "symbol": "He", "number": 2, "atomic_mass": 4.002602, "category": "noble gas", "xpos": 18, "ypos": 1 },
  { "name": "ليثيوم", "symbol": "Li", "number": 3, "atomic_mass": 6.94, "category": "alkali metal", "xpos": 1, "ypos": 2 },
  { "name": "بيريليوم", "symbol": "Be", "number": 4, "atomic_mass": 9.0121831, "category": "alkaline earth metal", "xpos": 2, "ypos": 2 },
  { "name": "بورون", "symbol": "B", "number": 5, "atomic_mass": 10.81, "category": "metalloid", "xpos": 13, "ypos": 2 },
  { "name": "كربون", "symbol": "C", "number": 6, "atomic_mass": 12.011, "category": "polyatomic nonmetal", "xpos": 14, "ypos": 2 },
  { "name": "نيتروجين", "symbol": "N", "number": 7, "atomic_mass": 14.007, "category": "diatomic nonmetal", "xpos": 15, "ypos": 2 },
  { "name": "أكسجين", "symbol": "O", "number": 8, "atomic_mass": 15.999, "category": "diatomic nonmetal", "xpos": 16, "ypos": 2 },
  { "name": "فلورين", "symbol": "F", "number": 9, "atomic_mass": 18.998403163, "category": "diatomic nonmetal", "xpos": 17, "ypos": 2 },
  { "name": "نيون", "symbol": "Ne", "number": 10, "atomic_mass": 20.1797, "category": "noble gas", "xpos": 18, "ypos": 2 },
  { "name": "صوديوم", "symbol": "Na", "number": 11, "atomic_mass": 22.98976928, "category": "alkali metal", "xpos": 1, "ypos": 3 },
  { "name": "مغنيسيوم", "symbol": "Mg", "number": 12, "atomic_mass": 24.305, "category": "alkaline earth metal", "xpos": 2, "ypos": 3 },
  { "name": "ألومنيوم", "symbol": "Al", "number": 13, "atomic_mass": 26.9815385, "category": "post-transition metal", "xpos": 13, "ypos": 3 },
  { "name": "سيليكون", "symbol": "Si", "number": 14, "atomic_mass": 28.085, "category": "metalloid", "xpos": 14, "ypos": 3 },
  { "name": "فسفور", "symbol": "P", "number": 15, "atomic_mass": 30.973762, "category": "polyatomic nonmetal", "xpos": 15, "ypos": 3 },
  { "name": "كبريت", "symbol": "S", "number": 16, "atomic_mass": 32.06, "category": "polyatomic nonmetal", "xpos": 16, "ypos": 3 },
  { "name": "كلور", "symbol": "Cl", "number": 17, "atomic_mass": 35.45, "category": "diatomic nonmetal", "xpos": 17, "ypos": 3 },
  { "name": "أرجون", "symbol": "Ar", "number": 18, "atomic_mass": 39.948, "category": "noble gas", "xpos": 18, "ypos": 3 },
  { "name": "بوتاسيوم", "symbol": "K", "number": 19, "atomic_mass": 39.0983, "category": "alkali metal", "xpos": 1, "ypos": 4 },
  { "name": "كالسيوم", "symbol": "Ca", "number": 20, "atomic_mass": 40.078, "category": "alkaline earth metal", "xpos": 2, "ypos": 4 },
  { "name": "سكانديوم", "symbol": "Sc", "number": 21, "atomic_mass": 44.955908, "category": "transition metal", "xpos": 3, "ypos": 4 },
  { "name": "تيتانيوم", "symbol": "Ti", "number": 22, "atomic_mass": 47.867, "category": "transition metal", "xpos": 4, "ypos": 4 },
  { "name": "فاناديوم", "symbol": "V", "number": 23, "atomic_mass": 50.9415, "category": "transition metal", "xpos": 5, "ypos": 4 },
  { "name": "كروم", "symbol": "Cr", "number": 24, "atomic_mass": 51.9961, "category": "transition metal", "xpos": 6, "ypos": 4 },
  { "name": "منغنيز", "symbol": "Mn", "number": 25, "atomic_mass": 54.938044, "category": "transition metal", "xpos": 7, "ypos": 4 },
  { "name": "حديد", "symbol": "Fe", "number": 26, "atomic_mass": 55.845, "category": "transition metal", "xpos": 8, "ypos": 4 },
  { "name": "كوبالت", "symbol": "Co", "number": 27, "atomic_mass": 58.933194, "category": "transition metal", "xpos": 9, "ypos": 4 },
  { "name": "نيكل", "symbol": "Ni", "number": 28, "atomic_mass": 58.6934, "category": "transition metal", "xpos": 10, "ypos": 4 },
  { "name": "نحاس", "symbol": "Cu", "number": 29, "atomic_mass": 63.546, "category": "transition metal", "xpos": 11, "ypos": 4 },
  { "name": "زنك", "symbol": "Zn", "number": 30, "atomic_mass": 65.38, "category": "transition metal", "xpos": 12, "ypos": 4 },
  { "name": "غاليوم", "symbol": "Ga", "number": 31, "atomic_mass": 69.723, "category": "post-transition metal", "xpos": 13, "ypos": 4 },
  { "name": "جرمانيوم", "symbol": "Ge", "number": 32, "atomic_mass": 72.63, "category": "metalloid", "xpos": 14, "ypos": 4 },
  { "name": "زرنيخ", "symbol": "As", "number": 33, "atomic_mass": 74.921595, "category": "metalloid", "xpos": 15, "ypos": 4 },
  { "name": "سيلينيوم", "symbol": "Se", "number": 34, "atomic_mass": 78.971, "category": "polyatomic nonmetal", "xpos": 16, "ypos": 4 },
  { "name": "بروم", "symbol": "Br", "number": 35, "atomic_mass": 79.904, "category": "diatomic nonmetal", "xpos": 17, "ypos": 4 },
  { "name": "كريبتون", "symbol": "Kr", "number": 36, "atomic_mass": 83.798, "category": "noble gas", "xpos": 18, "ypos": 4 },
  { "name": "روبيديوم", "symbol": "Rb", "number": 37, "atomic_mass": 85.4678, "category": "alkali metal", "xpos": 1, "ypos": 5 },
  { "name": "سترونشيوم", "symbol": "Sr", "number": 38, "atomic_mass": 87.62, "category": "alkaline earth metal", "xpos": 2, "ypos": 5 },
  { "name": "يتريوم", "symbol": "Y", "number": 39, "atomic_mass": 88.90584, "category": "transition metal", "xpos": 3, "ypos": 5 },
  { "name": "زركونيوم", "symbol": "Zr", "number": 40, "atomic_mass": 91.224, "category": "transition metal", "xpos": 4, "ypos": 5 },
  { "name": "نيوبيوم", "symbol": "Nb", "number": 41, "atomic_mass": 92.90637, "category": "transition metal", "xpos": 5, "ypos": 5 },
  { "name": "موليبدينوم", "symbol": "Mo", "number": 42, "atomic_mass": 95.95, "category": "transition metal", "xpos": 6, "ypos": 5 },
  { "name": "تكنيتيوم", "symbol": "Tc", "number": 43, "atomic_mass": 98, "category": "transition metal", "xpos": 7, "ypos": 5 },
  { "name": "روثينيوم", "symbol": "Ru", "number": 44, "atomic_mass": 101.07, "category": "transition metal", "xpos": 8, "ypos": 5 },
  { "name": "روديوم", "symbol": "Rh", "number": 45, "atomic_mass": 102.9055, "category": "transition metal", "xpos": 9, "ypos": 5 },
  { "name": "بلاديوم", "symbol": "Pd", "number": 46, "atomic_mass": 106.42, "category": "transition metal", "xpos": 10, "ypos": 5 },
  { "name": "فضة", "symbol": "Ag", "number": 47, "atomic_mass": 107.8682, "category": "transition metal", "xpos": 11, "ypos": 5 },
  { "name": "كادميوم", "symbol": "Cd", "number": 48, "atomic_mass": 112.414, "category": "transition metal", "xpos": 12, "ypos": 5 },
  { "name": "إنديوم", "symbol": "In", "number": 49, "atomic_mass": 114.818, "category": "post-transition metal", "xpos": 13, "ypos": 5 },
  { "name": "قصدير", "symbol": "Sn", "number": 50, "atomic_mass": 118.71, "category": "post-transition metal", "xpos": 14, "ypos": 5 },
  { "name": "أنتيمون", "symbol": "Sb", "number": 51, "atomic_mass": 121.76, "category": "metalloid", "xpos": 15, "ypos": 5 },
  { "name": "تيلوريوم", "symbol": "Te", "number": 52, "atomic_mass": 127.6, "category": "metalloid", "xpos": 16, "ypos": 5 },
  { "name": "يود", "symbol": "I", "number": 53, "atomic_mass": 126.90447, "category": "diatomic nonmetal", "xpos": 17, "ypos": 5 },
  { "name": "زينون", "symbol": "Xe", "number": 54, "atomic_mass": 131.293, "category": "noble gas", "xpos": 18, "ypos": 5 }
];
