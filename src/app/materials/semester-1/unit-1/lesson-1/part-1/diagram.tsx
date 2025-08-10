'use client';

import Image from 'next/image';

export default function Diagram() {
  return (
    <div className="w-full h-auto rounded-lg overflow-hidden border">
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/sturdy-gantry-427713-p2.appspot.com/o/images%2FWhatsApp%20Image%202024-07-28%20at%2018.59.39_6b054238.jpg?alt=media&token=e937d570-5b5c-4f10-9b4e-e17f49552b07"
        alt="شرح الدرس الأول في الكيمياء"
        width={812}
        height={588}
        className="object-contain"
        data-ai-hint="chemistry lesson"
      />
    </div>
  );
}
