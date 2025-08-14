
'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, X, BookCopy, Thermometer, Box, Cpu, Lightbulb, LineChart, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Quiz from './quiz';
import InteractiveQuestionCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';

const Diagram = dynamic(() => import('./diagram'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="h-[300px] w-full rounded-lg" />
      <Skeleton className="h-12 w-full" />
    </div>
  ),
});

const lessonContent = `<p>بعد أن درسنا العلاقة بين الضغط والحجم، ننتقل الآن إلى علاقة مهمة أخرى اكتشفها العالم الفرنسي جاك شارل، الذي كان مهتمًا بالمناطيد. درس شارل العلاقة بين حجم الغاز ودرجة حرارته.</p>`;

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
        <p className="text-lg text-muted-foreground">قانون شارل</p>
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
                        لاحظ العالم شارل أن حجم الهواء في البالونات يتغير بتغير درجة حرارته. عند تسخين الهواء يتمدد ويزداد حجمه، وعند تبريده يتقلص وينقص حجمه. قاده هذا الاكتشاف إلى دراسة العلاقة بشكل منهجي.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Thermometer className="h-6 w-6 text-primary" /> نص قانون شارل</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <blockquote className="border-r-4 border-primary pr-4">
                          "يتناسب حجم كمية محددة من الغاز المحصور تناسبًا طرديًا مع درجة حرارته المطلقة عند ثبات ضغطه."
                        </blockquote>
                         <p className="text-sm text-muted-foreground mt-2">بعبارة أخرى: كلما زادت درجة حرارة الغاز، زاد حجمه، والعكس صحيح.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Cpu className="h-6 w-6 text-primary" /> تفسير القانون</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                        عند رفع درجة حرارة الغاز (مع ثبات الضغط)، يزداد متوسط الطاقة الحركية لجسيماته، فتتحرك بسرعة أكبر وتتصادم بقوة أكبر مع جدار الوعاء. للحفاظ على الضغط ثابتًا، يجب أن يزداد حجم الوعاء لتقليل عدد التصادمات في وحدة الزمن.
                        </p>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Box className="h-6 w-6 text-primary" /> محاكاة التجربة</CardTitle>
                    <CardDescription>اختر بين الحمام الثلجي والحمام الساخن ولاحظ تأثير درجة الحرارة على حجم البالون.</CardDescription>
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
                <p>يمكن التعبير عن العلاقة الطردية بين الحجم (V) ودرجة الحرارة المطلقة (T) رياضيًا كالتالي:</p>
                <BlockMath math="V \propto T" />
                <p>لتحويل التناسب إلى مساواة، نستخدم ثابتًا (k)، لتصبح المعادلة:</p>
                <BlockMath math="\frac{V}{T} = k" />
                <p>وهذا يعني أن حاصل قسمة الحجم على درجة الحرارة المطلقة لكمية معينة من الغاز عند ضغط ثابت هو قيمة ثابتة. ويمكن استخدام هذه العلاقة لمقارنة حالتين مختلفتين للغاز:</p>
                 <BlockMath math="\frac{V_1}{T_1} = \frac{V_2}{T_2}" />
                 <p className="text-sm text-muted-foreground" dir="rtl">
                    حيث <InlineMath math="V_1, T_1" /> هما الحجم والحرارة الابتدائيان، و <InlineMath math="V_2, T_2" /> هما الحجم والحرارة النهائيان. **يجب دائمًا استخدام درجة حرارة الكلفن (K)**.
                 </p>
            </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 items-start">
            <Card>
                <CardHeader>
                    <CardTitle>مثال محلول</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">
                       إذا كان حجم بالون <InlineMath math="2.5 \text{ L}" /> عند درجة حرارة <InlineMath math="25^\circ\text{C}" />, فما هو حجمه الجديد إذا سخن إلى <InlineMath math="55^\circ\text{C}" /> مع بقاء الضغط ثابتًا؟
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                        <p><strong className="text-accent">المعطيات:</strong></p>
                        <ul className="list-disc mr-6 text-sm space-y-1">
                            <li className="flex justify-between"><span>الحجم الابتدائي:</span><span dir="ltr"><InlineMath math="V_1 = 2.5 \text{ L}" /></span></li>
                            <li className="flex justify-between"><span>الحرارة الابتدائية:</span><span dir="ltr"><InlineMath math="T_1 = 25^\circ\text{C}" /></span></li>
                            <li className="flex justify-between"><span>الحرارة النهائية:</span><span dir="ltr"><InlineMath math="T_2 = 55^\circ\text{C}" /></span></li>
                        </ul>
                        <p><strong className="text-accent">المطلوب:</strong> الحجم الجديد <InlineMath math="V_2" /></p>
                        <p><strong className="text-accent">الحل:</strong></p>
                        <ol className="list-decimal mr-6 text-sm space-y-2">
                            <li>**الخطوة الأولى والأهم:** نحول درجات الحرارة إلى كلفن.
                                <BlockMath math="T_1(K) = 25 + 273 = 298 \text{ K}" />
                                <BlockMath math="T_2(K) = 55 + 273 = 328 \text{ K}" />
                            </li>
                            <li>نكتب قانون شارل: <BlockMath math="\frac{V_1}{T_1} = \frac{V_2}{T_2}" /></li>
                            <li>نعيد ترتيب المعادلة لحل <InlineMath math="V_2" />: <BlockMath math="V_2 = \frac{V_1 T_2}{T_1}" /></li>
                            <li>نعوض القيم: <BlockMath math="V_2 = \frac{(2.5 \text{ L}) \cdot (328 \text{ K})}{298 \text{ K}}" /></li>
                            <li>نحسب الناتج: <BlockMath math="V_2 \approx 2.75 \text{ L}" /></li>
                        </ol>
                        <p className="text-sm font-semibold border-t pt-2">
                           الجواب: الحجم الجديد للبالون هو <InlineMath math="2.75 \text{ L}" />. وهذا منطقي، لأن درجة الحرارة زادت، فمن المتوقع أن يزداد الحجم.
                        </p>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2 text-base font-semibold"><LineChart className="h-5 w-5 text-primary" /> العلاقة البيانية</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-xs text-muted-foreground text-center mb-2">
                    يمثل الخط المستقيم العلاقة الطردية بين الحجم ودرجة الحرارة المطلقة، عند ثبات الضغط وعدد المولات.
                </p>
                <div className="flex justify-center items-center p-4">
                    <svg width="250" height="200" viewBox="0 0 150 120" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs h-auto">
                         <defs>
                            <marker id="arrowhead" markerWidth="5" markerHeight="3.5" refX="0" refY="1.75" orient="auto">
                                <polygon points="0 0, 5 1.75, 0 3.5" fill="hsl(var(--muted-foreground))" />
                            </marker>
                        </defs>
                        
                        <line x1="20" y1="110" x2="20" y2="10" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                        <text x="10" y="15" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">V</text>
                        
                        <line x1="20" y1="110" x2="140" y2="110" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                        <text x="140" y="120" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">T</text>
                        
                        <line x1="25" y1="105" x2="120" y2="20" stroke="hsl(var(--primary))" strokeWidth="2.5" />

                        <text x="80" y="40" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))">ثبات الضغط</text>
                        <text x="80" y="55" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))">وعدد المولات</text>
                    </svg>
                </div>
                </CardContent>
            </Card>
        </div>
        
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
                  question="عينة من غاز محصور حجمها 4L وضغطها 2atm عند درجة حرارة 200°C فإن حجمها عندما تصبح درجة حرارتها 250°C وضغطها 2atm يساوي:"
                  options={[
                      "5L",
                      "3.6L",
                      "4.4L",
                      "3.2L"
                  ]}
                  correctAnswerIndex={2}
                  explanation="أولاً، نحول الحرارة إلى كلفن: T₁=200+273=473K, T₂=250+273=523K. الضغط ثابت، لذا نستخدم قانون شارل: V₂ = V₁T₂/T₁ = (4L * 523K) / 473K ≈ 4.4L."
              />
               <InteractiveQuestionCard 
                  question="عينة من غاز محصور حجمها 4L درجة حرارتها 400K. عند مضاعفة حرارتها وثبات ضغطها فإن حجمها:"
                  options={[
                      "يصبح 5L",
                      "يزداد إلى الضعف",
                      "يقل إلى النصف",
                      "لا يتغير"
                  ]}
                  correctAnswerIndex={1}
                  explanation="قانون شارل ينص على علاقة طردية بين الحجم ودرجة الحرارة المطلقة. عند مضاعفة درجة الحرارة (من 400K إلى 800K)، يجب أن يتضاعف الحجم أيضًا للحفاظ على النسبة ثابتة، فيصبح 8L."
              />
          </div>
        </div>


        <Card>
          <CardHeader>
              <CardTitle>اختبر فهمك</CardTitle>
              <CardDescription>
                  بعد أن تعرفت على قانون شارل، اختبر فهمك له من خلال هذا الاختبار القصير.
              </CardDescription>
          </CardHeader>
          <CardContent>
              <Quiz lessonContent={lessonContent} />
          </CardContent>
        </Card>
      </main>

      <footer className="mt-12 border-t pt-6">
        <div className="flex justify-between">
            <Link href="/materials/semester-1/unit-1/lesson-1/part-3" passHref>
                <Button size="lg" variant="outline">
                <ArrowRight className="ml-2 h-5 w-5" />
                الجزء السابق
                </Button>
            </Link>
            <Link href="/materials/semester-1/unit-1/lesson-1/part-5" passHref>
                <Button size="lg">
                الجزء التالي: قانون جاي لوساك
                <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
            </Link>
        </div>
      </footer>
    </div>
  );
}

    