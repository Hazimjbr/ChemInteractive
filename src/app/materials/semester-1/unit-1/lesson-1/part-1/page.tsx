
'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Dot, ArrowLeft, X, Info, Beaker, GitCommitHorizontal, HelpCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Quiz from './quiz';
import FlippableCard from './flippable-card';

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

const lessonContent = `<p>استكشف المفاهيم الأساسية للحالة الغازية من خلال البطاقات التفاعلية التالية:</p>`;


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
          
          <FlippableCard
            cardTitle="نظرية الحركة الجزيئية"
            cardIcon={<HelpCircle className="h-6 w-6" />}
          >
             <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-primary text-lg mt-[-2px]">1.</span>
                  <div>
                    <p className='font-semibold'>تصف سلوك جسيمات المادة وتفترض حركتها الدائمة المستمرة:</p>
                     <ul className="mt-2 space-y-1 mr-4 text-xs">
                        <li><strong className="font-semibold text-accent/80">أ) الصلبة:</strong> حركة اهتزازية في مكانها.</li>
                        <li><strong className="font-semibold text-accent/80">ب) السائلة والغازية:</strong> تتحرك عشوائيا في جميع الاتجاهات.</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-primary text-lg mt-[-2px]">2.</span>
                   <div>
                    <p className='font-semibold'>تفسر الخصائص الفيزيائية والسلوك الفيزيائي للمواد اعتمادا على:</p>
                     <ul className="mt-2 space-y-1 mr-4 text-xs">
                        <li><strong className="font-semibold text-accent/80">أ) الطاقة الحركية للجسيمات</strong></li>
                        <li><strong className="font-semibold text-accent/80">ب) قوى التجاذب بين الجسيمات</strong></li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-primary text-lg mt-[-2px]">3.</span>
                  <p className='font-semibold'>تستخدم قوانين الغازات في وصف العلاقة بين العوامل المؤثرة في سلوك الغاز الفيزيائي.</p>
                </li>
             </ul>
          </FlippableCard>

          <FlippableCard
            cardTitle="بنود نظرية الحركة الجزيئية للغازات"
            cardIcon={<Info className="h-6 w-6" />}
          >
             <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-primary text-lg mt-[-2px]">1.</span>
                  <p><strong className="font-semibold">تكوين الغاز:</strong> يتكون الغاز من جسيمات صغيرة جدا (مهملة الحجم) متباعدة جدا وقوى التجاذب بينها شبه معدومة (باستثناء ما يحدث في أثناء لحظة التصادم) لذلك معظم حجم الغاز فراغ (تفسير كثافة الغاز القليلة وقابلية الانضغاط وتشابه جميع الغازات في خصائصها)</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-primary text-lg mt-[-2px]">2.</span>
                  <p><strong className="font-semibold">حركة الجسيمات:</strong> حركة مستمرة، عشوائية، وسريعة في خطوط مستقيمة، مما يكسبها طاقة حركية تمكنها من التغلب على قوى التجاذب بينها (تفسير انتشار وتدفق الغازات – الحركة البراونية).</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-primary text-lg mt-[-2px]">3.</span>
                  <div>
                      <p><strong className="font-semibold">التصادمات المرنة:</strong></p>
                      <ul className="mt-2 space-y-1 mr-4">
                          <li><span className="font-semibold text-accent/80">أ) مع جدار الوعاء:</span> لا تلتصق وتسبب ضغط الغاز.</li>
                          <li><span className="font-semibold text-accent/80">ب) مع بعضها البعض:</span> لا تتفاعل، ويبقى مجموع الطاقة الحركية ثابت.</li>
                      </ul>
                  </div>
                </li>
                 <li className="flex items-start gap-3">
                  <span className="font-bold text-primary text-lg mt-[-2px]">4.</span>
                  <p><strong className="font-semibold">الطاقة الحركية والحرارة:</strong> يتناسب متوسط الطاقة الحركية (KE) للجسيمات تناسبا طرديا مع سرعتها التي تزداد بازدياد درجة الحرارة.</p>
                </li>
                 <li className="flex items-start gap-3">
                  <span className="font-bold text-primary text-lg mt-[-2px]">5.</span>
                  <p><strong className="font-semibold">قوى التجاذب في الغاز المثالي:</strong> معدومة فلا يمكن إسالته مهما زاد الضغط أو انخفضت حرارته.</p>
                </li>
             </ul>
          </FlippableCard>
          
          <FlippableCard
            cardTitle="الغاز المثالي (Ideal Gas)"
            cardIcon={<Beaker className="h-6 w-6" />}
          >
              <p className="mb-4 font-semibold">هو غاز افتراضي يتميز بالخصائص التالية:</p>
              <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                      <span className="font-bold text-primary text-lg mt-[-2px]">1.</span>
                      <p>حجم جسيماته يساوي صفر (مهمل).</p>
                  </li>
                  <li className="flex items-start gap-3">
                      <span className="font-bold text-primary text-lg mt-[-2px]">2.</span>
                      <p>قوى التجاذب بين جسيماته تساوي صفر (معدومة).</p>
                  </li>
                  <li className="flex items-start gap-3">
                      <span className="font-bold text-primary text-lg mt-[-2px]">3.</span>
                      <p>تنطبق عليه فرضيات نظرية الحركة الجزيئية وقوانين الغازات عند كل الظروف.</p>
                  </li>
                  <li className="flex items-start gap-3">
                      <span className="font-bold text-primary text-lg mt-[-2px]">4.</span>
                      <p>لا يمكن إسالته مهما انخفضت درجة حرارته أو زاد الضغط عليه.</p>
                  </li>
              </ul>
              <p className='text-xs mt-4 text-muted-foreground italic border-t pt-3'>
                يستخدم العلماء نموذج الغاز المثالي لتبسيط الحسابات وفهم سلوك الغازات الحقيقية في ظروف معينة (مثل الضغط المنخفض والحرارة المرتفعة).
              </p>
          </FlippableCard>

           <FlippableCard
            cardTitle="انحراف الغازات الحقيقية"
            cardIcon={<GitCommitHorizontal className="h-6 w-6" />}
          >
              <p className="mb-4 text-sm">تتشابه الغازات الحقيقية مع الغاز المثالي في الظروف الطبيعية إلى حد كبير.</p>
              <p className="mb-4 font-semibold">يزداد انحراف الغازات الحقيقية عن سلوك الغاز المثالي كلما:</p>
              <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                      <span className="font-bold text-primary text-lg mt-[-2px]">1.</span>
                      <div>
                          <p className='font-semibold'>ازدادت قوى التجاذب بين جسيمات الغاز:</p>
                          <ul className="mt-2 space-y-2 mr-4 text-xs">
                              <li><span className="font-semibold text-accent/80">أ) اختلاف نوع الترابط بين الجسيمات:</span> (هيدروجيني مثل HF > ثنائي قطب مثل NH3 > قوى لندن مثل Ne)</li>
                              <li><span className="font-semibold text-accent/80">ب) ازدياد الكتلة المولية:</span> (مثلًا Cl2 > F2) لأن زيادة الكتلة المولية تزيد من قوى لندن.</li>
                          </ul>
                      </div>
                  </li>
                  <li className="flex items-start gap-3">
                      <span className="font-bold text-primary text-lg mt-[-2px]">2.</span>
                      <p className='font-semibold'>ازداد الضغط على الغاز أو قل حجمه.</p>
                  </li>
                   <li className="flex items-start gap-3">
                      <span className="font-bold text-primary text-lg mt-[-2px]">3.</span>
                      <p className='font-semibold'>انخفضت درجة الحرارة.</p>
                  </li>
              </ul>
              <p className='text-xs mt-3 text-muted-foreground'>
                  (ملاحظة: زيادة الحرارة تقلل من قوة الترابط بين الجسيمات وتزيد من طاقتها الحركية، مما يجعلها تسلك سلوكًا أقرب للمثالي).
              </p>
          </FlippableCard>


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

    

    

    
