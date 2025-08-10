'use client';

import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Atom, FlaskConical, Beaker, FileText } from 'lucide-react';

const units = [
  {
    id: 'unit-1',
    title: 'الوحدة 1: حالات المادة',
    icon: Atom,
    progress: 30,
    lessons: [
      {
        title: 'الدرس 1: الحالة الغازية',
        parts: [
          { title: 'نظرية الحركة الجزيئية', path: '/part-1' },
          { title: 'مقدمة قوانين الغازات', path: '/part-2' },
          { title: 'قانون بويل', path: '/part-3' },
        ],
      },
      {
        title: 'الدرس 2: الحالة السائلة',
        parts: [{ title: 'مقدمة عن المواد السائلة', path: '/lesson-2/part-1' }],
      },
      {
        title: 'الدرس 3: الحالة الصلبة',
        parts: [{ title: 'مقدمة عن المواد الصلبة', path: '/lesson-3/part-1' }],
      },
      {
        title: 'الإثراء والتوسع',
        parts: [{ title: 'الربط', path: '/section-4/part-1' }],
      },
      { title: 'مراجعة الوحدة', parts: [{ title: 'ابدأ المراجعة', path: '/section-5' }] },
    ],
  },
  {
    id: 'unit-2',
    title: 'الوحدة 2: المحاليل',
    icon: Beaker,
    progress: 0,
    lessons: [
       {
        title: 'الدرس 1: تصنيف المحاليل',
        parts: [{ title: 'تصنيف المواد', path: '/unit-2/lesson-1/part-1' }],
      },
       {
        title: 'الدرس 2: خصائص المحاليل',
        parts: [{ title: 'الخصائص الجامعة للمحاليل', path: '/unit-2/lesson-2/part-1' }],
      },
    ],
  },
  {
    id: 'unit-3',
    title: 'الوحدة 3: الاتزان الكيميائي',
    icon: FlaskConical,
    progress: 0,
    lessons: [
       {
        title: 'الدرس 1: الاتزان الكيميائي والعوامل المؤثرة فيه',
        parts: [{ title: 'أنواع التفاعلات الكيميائية', path: '/unit-3/lesson-1/part-1' }],
      },
       {
        title: 'الدرس 2: تعبيرات ثابت الاتزان',
        parts: [{ title: 'تعبيرات ثابت الاتزان', path: '/unit-3/lesson-2/part-1' }],
      },
    ],
  },
    {
    id: 'unit-4',
    title: 'الوحدة 4: الحموض والقواعد',
    icon: FileText,
    progress: 0,
    lessons: [
       {
        title: 'الدرس 1: الحموض والقواعد',
        parts: [{ title: 'مفهوم أرهينيوس', path: '/unit-4/lesson-1/part-1' }],
      },
       {
        title: 'الدرس 2: الرقم الهيدروجيني',
        parts: [{ title: 'التأين الذاتي للماء', path: '/unit-4/lesson-2/part-1' }],
      },
       {
        title: 'الدرس 3: الحموض والقواعد الضعيفة',
        parts: [{ title: 'الاتزان في محاليل الحموض الضعيفة', path: '/unit-4/lesson-3/part-1' }],
      },
        {
        title: 'الدرس 4: الأملاح والمحاليل المنظمة',
        parts: [{ title: 'الخصائص الحمضية والقاعدية للأملاح', path: '/unit-4/lesson-4/part-1' }],
      },
    ],
  },
];

export default function Semester1Page() {
  return (
    <div className="container mx-auto p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-2">الفصل الدراسي الأول</h1>
        <p className="text-lg text-muted-foreground">
          استعرض وحدات الفصل الأول وابدأ رحلتك في عالم الكيمياء.
        </p>
      </header>

      <main>
        <Accordion type="single" collapsible className="w-full space-y-6">
          {units.map((unit) => (
            <AccordionItem key={unit.id} value={unit.id} asChild>
              <Card>
                <AccordionTrigger className="p-6 text-xl hover:no-underline">
                  <div className="flex items-center gap-4 w-full">
                    <unit.icon className="h-8 w-8 text-primary" />
                    <div className="flex-1 text-right">
                      <h2 className="font-semibold">{unit.title}</h2>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={unit.progress} className="w-full" />
                        <span className="text-sm text-muted-foreground font-mono">
                          {unit.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent asChild>
                  <div className="p-6 pt-0">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {unit.lessons.map((lesson, index) => (
                        <div key={index} className="space-y-2">
                          <h4 className="font-semibold">{lesson.title}</h4>
                          <ul className="space-y-1">
                            {lesson.parts.map((part, pIndex) => (
                              <li key={pIndex}>
                                <Link
                                  href={`/materials/semester-1/${unit.id.replace('unit-','unit-')}${lesson.title.includes('الدرس') ? `/lesson-${lesson.title.match(/\d+/)[0]}`: ''}${part.path}`}
                                  passHref
                                >
                                  <Button
                                    variant="ghost"
                                    className="w-full justify-start text-muted-foreground hover:text-primary"
                                  >
                                    <CheckCircle className="h-4 w-4 ml-2 text-transparent" />
                                    {part.title}
                                  </Button>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </div>
  );
}
