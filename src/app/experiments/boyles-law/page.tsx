
'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TestTubeDiagonal, Target, FlaskConical, AlertTriangle, ListOrdered, Beaker, CheckSquare, Droplets, Wind } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Quiz from './quiz';


const Diagram = dynamic(() => import('./diagram'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="h-[350px] w-full rounded-lg" />
      <Skeleton className="h-12 w-full" />
    </div>
  ),
});


export default function ExperimentPage() {
  return (
    <div className="container mx-auto p-8 relative">
       <Link href="/experiments" passHref>
          <Button variant="ghost" size="icon" className="absolute top-4 left-4">
            <X className="h-6 w-6" />
            <span className="sr-only">إغلاق</span>
          </Button>
        </Link>
      <header className="mb-10 text-center">
        <p className="text-lg text-muted-foreground">التجربة 1</p>
        <h1 className="text-4xl font-bold text-primary mb-2">
            قانون بويل
        </h1>
        <CardDescription>العلاقة بين حجم الغاز وضغطه عند ثبات درجة الحرارة</CardDescription>
      </header>

      <main className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><TestTubeDiagonal className="h-6 w-6 text-primary" /> الخلفية العلمية</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                        يُعَدُّ العالم بويل من أوائل العلماء الذين بحثوا في خصائص الغازات؛ إذ درس العلاقة بين حجم كمية محددة من الغاز المحصور والضغط المؤثر فيه عند ثبات درجة حرارته. توصَّل من ذلك إلى العلاقة التي سُمِّيت قانون بويل، وينص على أن: "حجم كميّة محدّدة من الغاز المحصور يتناسب تناسبًا عكسيًا مع الضغط المؤثر فيه عند ثبات درجة حرارته".
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Target className="h-6 w-6 text-primary" /> الهدف</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                        أستقصي العلاقة بين حجم الغاز وضغطه عند ثبات درجة حرارته.
                        </p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-6 w-6 text-destructive" /> إرشادات السلامة</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2">
                            <li>توضح هذه المحاكاة استخدام الزئبق وهو مادة سامة. يجب التعامل معه بحذر شديد في المختبر الحقيقي.</li>
                            <li>أرتدي معطف المختبر والنظارات الواقية والقفازات عند التعامل مع المواد الكيميائية.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Beaker className="h-6 w-6 text-primary" /> محاكاة التجربة</CardTitle>
                    <CardDescription>حرّك المنزلق لتغيير الضغط ولاحظ ما يحدث لحجم الغاز.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Diagram />
                </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wind className="h-6 w-6 text-primary" /> مثال من عالمنا: فقاعة الغواص</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full md:w-1/2" data-ai-hint="diver bubble pressure">
                         <svg viewBox="0 0 150 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                            <defs>
                                <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 0.8}} />
                                <stop offset="100%" style={{stopColor: 'hsl(var(--accent))', stopOpacity: 0.9}} />
                                </linearGradient>
                            </defs>
                            <rect width="150" height="200" fill="url(#waterGradient)"/>

                            <circle cx="85" cy="180" r="15" fill="white" fillOpacity="0.5" stroke="white" strokeWidth="1"/>
                            <text x="85" y="183" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">P ضغط عالٍ</text>

                            <circle cx="105" cy="100" r="25" fill="white" fillOpacity="0.5" stroke="white" strokeWidth="1"/>

                            <circle cx="115" cy="30" r="35" fill="white" fillOpacity="0.5" stroke="white" strokeWidth="1"/>
                             <text x="115" y="33" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">P ضغط منخفض</text>
                            
                            <path d="M 80 160 C 90 140, 100 120, 105 100" stroke="white" strokeWidth="1" strokeDasharray="2" fill="none"/>
                            <path d="M 105 100 C 110 80, 115 50, 115 30" stroke="white" strokeWidth="1" strokeDasharray="2" fill="none"/>

                            <text x="35" y="185" fontSize="24">🤿</text>
                        </svg>
                    </div>
                    <div className="w-full md:w-1/2 space-y-3">
                        <p>
                            تخيل غواصًا يطلق فقاعة هواء في أعماق البحر.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                            <li><strong className="text-accent">في الأعماق:</strong> يكون ضغط الماء هائلاً، مما يجبر فقاعة الهواء على أن تكون صغيرة الحجم.</li>
                            <li><strong className="text-primary">أثناء الصعود:</strong> كلما ارتفعت الفقاعة نحو السطح، يقل ضغط الماء عليها.</li>
                            <li><strong className="text-foreground">النتيجة:</strong> يتمدد الغاز داخل الفقاعة ويزداد حجمها بشكل كبير، تمامًا كما ينص قانون بويل.</li>
                        </ul>
                         <p className="text-xs text-muted-foreground pt-2 border-t">هذا المثال يوضح أن العلاقة بين الضغط والحجم عكسية: عندما يقل أحدهما، يزداد الآخر.</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-2"><CheckSquare className="h-6 w-6 text-primary" /> اختبر استنتاجك</CardTitle>
               <CardDescription>
                  أجب عن الأسئلة التالية للتأكد من فهمك لنتائج التجربة.
                </CardDescription>
          </CardHeader>
          <CardContent>
              <Quiz />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
