'use client';

import Diagram from './diagram';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Dot } from 'lucide-react';

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
            <ul className="space-y-3 mt-4">
               <li className="flex items-start">
                 <Dot className="h-6 w-6 text-primary ml-2 flex-shrink-0" />
                 <span>تتكون الغازات من جسيمات (جزيئات أو ذرات) متناهية في الصغر وذات كتل، وحجم هذه الجسيمات صغير جدًا يمكن إهماله مقارنة بالمسافات التي تفصل بينها.</span>
               </li>
                <li className="flex items-start">
                  <Dot className="h-6 w-6 text-primary ml-2 flex-shrink-0" />
                  <span>تتحرك جسيمات الغاز حركة مستمرة وعشوائية في خطوط مستقيمة وفي الاتجاهات جميعها، مما يؤدي إلى تصادمها مع بعضها البعض ومع جدار الوعاء الذي يحتويها.</span>
                </li>
                 <li className="flex items-start">
                  <Dot className="h-6 w-6 text-primary ml-2 flex-shrink-0" />
                  <span>التصادمات بين جسيمات الغاز تصادمات مرنة (Elastic Collisions)؛ أي أن الطاقة الحركية الكلية للجسيمات المتصادمة تبقى ثابتة.</span>
                </li>
                 <li className="flex items-start">
                  <Dot className="h-6 w-6 text-primary ml-2 flex-shrink-0" />
                  <span>لا توجد قوى تجاذب أو تنافر بين جسيمات الغاز، باستثناء ما يحدث في أثناء لحظة التصادم.</span>
                </li>
                 <li className="flex items-start">
                  <Dot className="h-6 w-6 text-primary ml-2 flex-shrink-0" />
                  <span>متوسط الطاقة الحركية لجسيمات الغاز يتناسب طرديًا مع درجة الحرارة المطلقة (بالكلفن).</span>
                </li>
            </ul>
            <p className="mt-4">
              ويُطلق على الغاز الذي تنطبق عليه جميع هذه الفرضيات اسم **الغاز المثالي (Ideal Gas)**.
            </p>
          </article>
        </div>

        <aside className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>محاكاة حركة الجزيئات</CardTitle>
            </CardHeader>
            <CardContent>
              <Diagram />
              <p className="text-sm text-muted-foreground mt-4 text-center">
                محاكاة تفاعلية تظهر حركة الجسيمات العشوائية في الحالة الغازية وفقًا لفرضيات نظرية الحركة الجزيئية.
              </p>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
}
