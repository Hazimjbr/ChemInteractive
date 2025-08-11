
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, X, BookOpen, Thermometer, Box, Beaker, GitCompare, Pipette } from 'lucide-react';
import Quiz from './quiz';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card'; // Re-using the same component

const lessonContent = `<p>لفهم سلوك الغازات بشكل دقيق، نحتاج إلى دراسة العوامل التي تؤثر فيها. هذه العوامل هي متغيرات يمكن قياسها وتغييرها، وهي تحدد حالة الغاز. في هذا الجزء، سنتعرف على هذه المتغيرات الأربعة الأساسية التي ستكون حجر الزاوية في جميع قوانين الغازات التي سندرسها لاحقًا.</p>`;

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
        <p className="text-lg text-muted-foreground">مقدمة قوانين الغازات</p>
      </header>

      <main className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الفكرة الرئيسة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                يمكن وصف سلوك الغازات من خلال أربع متغيرات أساسية قابلة للقياس: الضغط (P)، الحجم (V)، درجة الحرارة (T)، وكمية الغاز (n). فهم هذه المتغيرات هو مفتاح فهم قوانين الغازات.
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
                    أحدد المتغيرات الأربعة (الضغط، الحجم، الحرارة، كمية الغاز) التي تصف سلوك الغاز.
                  </span>
                </li>
                 <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 ml-2 flex-shrink-0" />
                  <span>
                    أصف المقصود بكل متغير وأذكر وحدات القياس الشائعة له.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <article 
            className="prose prose-lg max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: lessonContent }}
          />

          <div className="grid md:grid-cols-2 gap-6">
              <FlippableCard
                cardTitle="الضغط (Pressure)"
                cardIcon={<GitCompare className="h-6 w-6" />}
              >
                 <div className="space-y-3">
                    <p className="font-semibold text-sm">هو القوة المؤثرة عموديًا على وحدة المساحة.</p>
                    <p className="text-xs text-muted-foreground">ينشأ ضغط الغاز عن تصادم جسيماته بجدار الوعاء الذي يحتويه. كلما زادت التصادمات، زاد الضغط.</p>
                    <div>
                        <h4 className="font-semibold text-accent text-xs mb-1">وحدات القياس:</h4>
                        <ul className="list-disc mr-4 text-xs space-y-1">
                            <li>باسكال (Pa) وهي الوحدة الدولية (SI).</li>
                            <li>كيلوباسكال (kPa).</li>
                            <li>ضغظ جوي (atm).</li>
                            <li>مليمتر زئبق (mmHg).</li>
                            <li>تور (Torr).</li>
                        </ul>
                    </div>
                     <p className='text-xs mt-2 text-muted-foreground italic border-t pt-2'>
                        1 atm = 760 mmHg = 760 Torr = 101.325 kPa
                    </p>
                 </div>
              </FlippableCard>

              <FlippableCard
                cardTitle="الحجم (Volume)"
                cardIcon={<Box className="h-6 w-6" />}
              >
                 <div className="space-y-3">
                    <p className="font-semibold text-sm">هو مقدار الحيز الذي تشغله جسيمات الغاز.</p>
                    <p className="text-xs text-muted-foreground">بما أن جسيمات الغاز تتحرك بحرية تامة، فإن حجم الغاز يساوي حجم الوعاء الذي يوجد فيه.</p>
                    <div>
                        <h4 className="font-semibold text-accent text-xs mb-1">وحدات القياس:</h4>
                        <ul className="list-disc mr-4 text-xs space-y-1">
                            <li>متر مكعب (m³) وهي الوحدة الدولية (SI).</li>
                            <li>لتر (L).</li>
                            <li>مليلتر (mL) أو سنتيمتر مكعب (cm³).</li>
                        </ul>
                    </div>
                     <p className='text-xs mt-2 text-muted-foreground italic border-t pt-2'>
                        1 L = 1000 mL = 1000 cm³
                    </p>
                 </div>
              </FlippableCard>

               <FlippableCard
                cardTitle="درجة الحرارة (Temperature)"
                cardIcon={<Thermometer className="h-6 w-6" />}
              >
                 <div className="space-y-3">
                    <p className="font-semibold text-sm">هي مقياس لمتوسط الطاقة الحركية لجسيمات الغاز.</p>
                    <p className="text-xs text-muted-foreground">عندما تزداد درجة الحرارة، تزداد سرعة حركة الجسيمات وطاقتها الحركية.</p>
                    <div>
                        <h4 className="font-semibold text-accent text-xs mb-1">وحدات القياس:</h4>
                        <ul className="list-disc mr-4 text-xs space-y-1">
                            <li>كلفن (K) وهي الوحدة المعتمدة في قوانين الغازات.</li>
                            <li>درجة مئوية (سيليزية) (°C).</li>
                        </ul>
                    </div>
                     <p className='text-xs mt-2 text-muted-foreground italic border-t pt-2'>
                        K = °C + 273.15
                    </p>
                 </div>
              </FlippableCard>

               <FlippableCard
                cardTitle="كمية الغاز (Amount)"
                cardIcon={<Pipette className="h-6 w-6" />}
              >
                 <div className="space-y-3">
                    <p className="font-semibold text-sm">هي عدد جسيمات الغاز الموجودة في حجم معين.</p>
                     <p className="text-xs text-muted-foreground">غالبًا ما يتم التعبير عن كمية الغاز بعدد المولات لأنه من غير العملي عد الجسيمات مباشرة.</p>
                    <div>
                        <h4 className="font-semibold text-accent text-xs mb-1">وحدات القياس:</h4>
                        <ul className="list-disc mr-4 text-xs space-y-1">
                            <li>مول (mol) ويرمز له بالرمز n.</li>
                        </ul>
                    </div>
                     <p className='text-xs mt-2 text-muted-foreground italic border-t pt-2'>
                        المول الواحد يحتوي على عدد أفوجادرو من الجسيمات (6.022 × 10²³).
                    </p>
                 </div>
              </FlippableCard>
          </div>
          

          <Card>
            <CardHeader>
                <CardTitle>اختبر فهمك</CardTitle>
                 <CardDescription>
                    بعد أن تعرفت على المتغيرات الأربعة، اختبر فهمك لها من خلال هذا الاختبار القصير.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Quiz lessonContent={lessonContent} />
            </CardContent>
          </Card>
        </div>

      </main>

      <footer className="mt-12 border-t pt-6">
        <div className="flex justify-between">
            <Link href="/materials/semester-1/unit-1/lesson-1/part-1" passHref>
                <Button size="lg" variant="outline">
                <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                الدرس السابق
                </Button>
            </Link>
            <Link href="/materials/semester-1/unit-1/lesson-1/part-3" passHref>
                <Button size="lg">
                الدرس التالي: قانون بويل
                <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
            </Link>
        </div>
      </footer>
    </div>
  );
}
