
'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, X, BookOpen, GitCompare, Thermometer, Box, Lightbulb, HelpCircle, ArrowRight, BookCopy, LineChart, Cpu } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Quiz from './quiz';
import InteractiveQuestionCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';

const Diagram = dynamic(() => import('./diagram'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="h-[350px] w-full rounded-lg" />
      <Skeleton className="h-12 w-full" />
    </div>
  ),
});

const lessonContent = `<p>بعد أن تعرفنا على المتغيرات الأربعة، سنبدأ الآن بدراسة العلاقات التي تربط بينها. أول هذه العلاقات اكتشفها العالم الإيرلندي روبرت بويل، الذي درس العلاقة بين ضغط الغاز وحجمه.</p>`;

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
        <p className="text-lg text-muted-foreground">قانون بويل</p>
      </header>

      <main className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BookCopy className="h-6 w-6 text-primary" /> الخلفية العلمية</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                        أجرى العالم بويل تجاربه باستخدام أنبوب زجاجي على شكل حرف J، حيث حصر كمية من الهواء باستخدام الزئبق. لاحظ أنه كلما أضاف زئبقًا (مما يزيد الضغط)، قل حجم الهواء المحصور.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><GitCompare className="h-6 w-6 text-primary" /> نص قانون بويل</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <blockquote className="border-r-4 border-primary pr-4">
                          "يتناسب حجم كمية محددة من الغاز المحصور تناسبًا عكسيًا مع الضغط الواقع عليه عند ثبات درجة حرارته."
                        </blockquote>
                         <p className="text-sm text-muted-foreground mt-2">بعبارة أخرى: كلما زاد الضغط، قل الحجم، والعكس صحيح.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Cpu className="h-6 w-6 text-primary" /> تفسير القانون</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                        عند زيادة الضغط على وعاء يحتوي على غاز (مع ثبات الحرارة)، تقل المسافة بين جدران الوعاء فتتقارب جسيمات الغاز ويقل حجمه. ولأن متوسط الطاقة الحركية للجسيمات ثابت، فإن تقاربها يزيد من عدد تصادماتها مع جدار الوعاء في وحدة الزمن، مما يظهر على شكل زيادة في الضغط.
                        </p>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Box className="h-6 w-6 text-primary" /> محاكاة التجربة</CardTitle>
                    <CardDescription>حرّك المنزلق لتغيير الضغط ولاحظ ما يحدث لحجم الغاز.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Diagram />
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>العلاقة الرياضية</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
                <p>يمكن التعبير عن العلاقة العكسية بين الضغط (P) والحجم (V) رياضيًا كالتالي:</p>
                <BlockMath math="V \propto \frac{1}{P}" />
                <p>لتحويل التناسب إلى مساواة، نستخدم ثابتًا (k)، لتصبح المعادلة:</p>
                <BlockMath math="V = \frac{k}{P} \quad \Rightarrow \quad P \cdot V = k" />
                <p>وهذا يعني أن حاصل ضرب الضغط في الحجم لكمية معينة من الغاز عند درجة حرارة ثابتة هو قيمة ثابتة. ويمكن استخدام هذه العلاقة لمقارنة حالتين مختلفتين للغاز (قبل وبعد التغيير):</p>
                 <BlockMath math="P_1 V_1 = P_2 V_2" />
                 <p className="text-sm text-muted-foreground" dir="rtl">
                    حيث <InlineMath math="P_1, V_1" /> هما الضغط والحجم الابتدائيان، و <InlineMath math="P_2, V_2" /> هما الضغط والحجم النهائيان.
                 </p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>مثال محلول</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4">
                    عينة من غاز النيتروجين حجمها <InlineMath math="150 \text{ mL}" /> عند ضغط مقداره <InlineMath math="98.8 \text{ kPa}" />. ما الحجم الجديد للعينة إذا انخفض الضغط إلى <InlineMath math="96.1 \text{ kPa}" /> مع بقاء درجة الحرارة ثابتة؟
                </p>
                <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                    <p><strong className="text-accent">المعطيات:</strong></p>
                    <ul className="list-disc mr-6 text-sm" dir="ltr">
                        <li><InlineMath math="V_1 = 150 \text{ mL}" /></li>
                        <li><InlineMath math="P_1 = 98.8 \text{ kPa}" /></li>
                        <li><InlineMath math="P_2 = 96.1 \text{ kPa}" /></li>
                    </ul>
                    <p><strong className="text-accent">المطلوب:</strong> الحجم الجديد <InlineMath math="V_2" /></p>
                    <p><strong className="text-accent">الحل:</strong></p>
                    <ol className="list-decimal mr-6 text-sm space-y-2">
                        <li>نكتب قانون بويل: <BlockMath math="P_1 V_1 = P_2 V_2" /></li>
                        <li>نعيد ترتيب المعادلة لحل <InlineMath math="V_2" />: <BlockMath math="V_2 = \frac{P_1 V_1}{P_2}" /></li>
                        <li>نعوض القيم: <BlockMath math="V_2 = \frac{(98.8 \text{ kPa}) \cdot (150 \text{ mL})}{96.1 \text{ kPa}}" /></li>
                        <li>نحسب الناتج: <BlockMath math="V_2 \approx 154.2 \text{ mL}" /></li>
                    </ol>
                    <p className="text-sm font-semibold border-t pt-2">
                       الجواب: الحجم الجديد للغاز هو <InlineMath math="154.2 \text{ mL}" />. وهذا منطقي، لأن الضغط انخفض، فمن المتوقع أن يزداد الحجم.
                    </p>
                </div>
            </CardContent>
        </Card>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-7 w-7 text-yellow-400" />
            <div>
              <h3 className="text-xl font-bold">تحقق من فهمك</h3>
              <p className="text-muted-foreground">أجب عن الأسئلة السريعة التالية لترسيخ المفاهيم.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
              <InteractiveQuestionCard 
                  question="أي من المتغيرات التالية يجب أن تبقى ثابتة عند تطبيق قانون بويل؟"
                  options={[
                      "الضغط والحجم",
                      "الحجم وكمية الغاز",
                      "درجة الحرارة والضغط",
                      "درجة الحرارة وكمية الغاز"
                  ]}
                  correctAnswerIndex={3}
                  explanation="ينص قانون بويل على دراسة العلاقة بين الضغط والحجم عند ثبات كل من درجة الحرارة وكمية الغاز."
              />
               <InteractiveQuestionCard 
                  question="إذا ضغطنا مكبسًا يحتوي على غاز إلى نصف حجمه الأصلي (مع ثبات الحرارة)، ماذا يحدث للضغط؟"
                  options={[
                      "يقل إلى النصف",
                      "يبقى ثابتًا",
                      "يتضاعف",
                      "يزداد أربع مرات"
                  ]}
                  correctAnswerIndex={2}
                  explanation="العلاقة بين الضغط والحجم عكسية. إذا قل الحجم إلى النصف (V/2)، يجب أن يتضاعف الضغط (2P) للحفاظ على حاصل الضرب P·V ثابتًا."
              />
          </div>
        </div>


        <Card>
          <CardHeader>
              <CardTitle>اختبر فهمك</CardTitle>
              <CardDescription>
                  بعد أن تعرفت على قانون بويل، اختبر فهمك له من خلال هذا الاختبار القصير.
              </CardDescription>
          </CardHeader>
          <CardContent>
              <Quiz lessonContent={lessonContent} />
          </CardContent>
        </Card>
      </main>

      <footer className="mt-12 border-t pt-6">
        <div className="flex justify-between">
            <Link href="/materials/semester-1/unit-1/lesson-1/part-2" passHref>
                <Button size="lg" variant="outline">
                <ArrowRight className="ml-2 h-5 w-5" />
                الجزء السابق
                </Button>
            </Link>
            <Link href="/materials/semester-1/unit-1/lesson-1/part-4" passHref>
                <Button size="lg">
                الجزء التالي: قانون شارل
                <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
            </Link>
        </div>
      </footer>
    </div>
  );
}
