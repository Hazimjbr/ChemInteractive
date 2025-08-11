'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Dot, ArrowLeft, X, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Quiz from './quiz';

const Diagram = dynamic(() => import('./diagram'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="h-[250px] w-full rounded-lg" />
      <div className="w-full flex items-center gap-2">
         <span className="text-sm text-muted-foreground">حجم الوعاء</span>
         <Skeleton className="h-4 w-full" />
      </div>
    </div>
  ),
});

const lessonContent = `
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
`;


export default function LessonPartPage() {
  return (
    <div className="container mx-auto p-8 relative">
       <Link href="/materials/semester-1" passHref>
          <Button variant="ghost" size="icon" className="absolute top-4 left-4">
            <X className="h-6 w-6" />
            <span className="sr-only">إغلاق</span>
          </Button>
        </Link>
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

          <article 
            className="prose prose-lg max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: lessonContent }}
          />

          <Card className="bg-gradient-to-br from-card to-secondary/30 border-primary/20 shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-accent">
                    <Info className="h-6 w-6" />
                    ملخص سريع للنقاط الأساسية
                </CardTitle>
            </CardHeader>
            <CardContent>
               <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-primary text-lg mt-[-2px]">1.</span>
                    <p><strong className="font-semibold">تكوين الغاز:</strong> جسيمات صغيرة ومتباعدة، حجمها مهمل وقوى التجاذب بينها شبه معدومة. هذا يفسر الكثافة المنخفضة وقابلية الانضغاط.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-primary text-lg mt-[-2px]">2.</span>
                    <p><strong className="font-semibold">حركة الجسيمات:</strong> حركة مستمرة، عشوائية، وسريعة في خطوط مستقيمة، مما يكسبها طاقة حركية عالية تفسر قدرتها على الانتشار والتدفق.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-primary text-lg mt-[-2px]">3.</span>
                    <div>
                        <p><strong className="font-semibold">التصادمات المرنة:</strong></p>
                        <ul className="mt-2 space-y-1 mr-4">
                            <li><span className="font-semibold text-accent/80">أ) مع جدار الوعاء:</span> لا تلتصق وتسبب ضغط الغاز.</li>
                            <li><span className="font-semibold text-accent/80">ب) مع بعضها البعض:</span> لا تتفاعل، ويبقى مجموع الطاقة الحركية ثابتًا.</li>
                        </ul>
                    </div>
                  </li>
                   <li className="flex items-start gap-3">
                    <span className="font-bold text-primary text-lg mt-[-2px]">4.</span>
                    <p><strong className="font-semibold">الطاقة الحركية والحرارة:</strong> متوسط الطاقة الحركية للجسيمات يتناسب طرديًا مع درجة الحرارة المطلقة.</p>
                  </li>
                   <li className="flex items-start gap-3">
                    <span className="font-bold text-primary text-lg mt-[-2px]">5.</span>
                    <p><strong className="font-semibold">الغاز المثالي:</strong> قوى التجاذب بين جسيماته معدومة، لذا لا يمكن إسالته بالضغط أو التبريد الشديد.</p>
                  </li>
               </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle>اختبر فهمك</CardTitle>
            </CardHeader>
            <CardContent>
                <Quiz lessonContent={lessonContent} />
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
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

      <footer className="mt-12 border-t pt-6">
        <div className="flex justify-end">
          <Link href="/materials/semester-1/unit-1/lesson-1/part-2" passHref>
            <Button size="lg">
              الدرس التالي: مقدمة قوانين الغازات
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
