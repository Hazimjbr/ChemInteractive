'use client';

import Diagram from './diagram';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default function LessonPartPage() {
  return (
    <div className="container mx-auto p-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">الدرس الأول: الحالة الغازية</h1>
        <p className="text-lg text-muted-foreground">نظرية الحركة الجزيئية</p>
      </header>

      <main className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الفكرة الرئيسة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                تصف نظرية الحركة الجزيئية سلوك المادة بالاعتماد على حركة جسيماتها، وتفسر الخصائص الفيزيائية للمواد في حالاتها المختلفة.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>نتاجات التعلم</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 ml-2 flex-shrink-0" />
                  <span>
                    أصف الخصائص الفيزيائية للغازات وأفسرها باستخدام نظرية الحركة الجزيئية.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <article className="prose prose-lg max-w-none text-foreground">
            <h2 className="text-2xl font-bold mb-4">خصائص الغازات ونظرية الحركة الجزيئية</h2>
            <p>
              تتميز المواد في الحالة الغازية بخصائص فيزيائية فريدة. فجسيماتها (ذرات أو جزيئات) متباعدة جدًا مقارنة بحجمها، وقوى التجاذب بينها شبه معدومة، مما يسمح لها بالتحرك بحرية وبسرعة عالية في جميع الاتجاهات. هذا ما يفسر لماذا تأخذ الغازات شكل وحجم الوعاء الذي توضع فيه، ولماذا تكون كثافتها منخفضة جدًا مقارنة بالمواد السائلة والصلبة.
            </p>
            <p>
              لتفسير هذه الخصائص وغيرها، وضع العلماء نموذجًا يسمى **نظرية الحركة الجزيئية للغازات (Kinetic Molecular Theory of Gases)**، والذي يرتكز على الفرضيات الآتية:
            </p>
          </article>
        </div>

        <aside className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>شكل توضيحي</CardTitle>
            </CardHeader>
            <CardContent>
              <Diagram />
              <p className="text-sm text-muted-foreground mt-2 text-center">
                حركة الجزيئات في الحالة الغازية.
              </p>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
}
