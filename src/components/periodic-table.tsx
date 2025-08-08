'use client';

import * as React from 'react';

const PeriodicTable = () => {
  // The component is temporarily emptied to fix a UI issue.
  // The full periodic table will be restored later.
  return (
    <div className="w-full h-96 flex items-center justify-center bg-muted/50 rounded-lg">
      <p className="text-muted-foreground">سيتم عرض الجدول الدوري هنا قريبًا.</p>
    </div>
  );
};

export default PeriodicTable;
