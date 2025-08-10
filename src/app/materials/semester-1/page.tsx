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
import { units } from '@/data/materials';

const constructPath = (unitId: string, lesson: any, part: any) => {
    const unitNum = unitId.replace('unit-', '');
    let path = `/materials/semester-1/unit-${unitNum}`;
    if (lesson.lessonNum) {
        path += `/lesson-${lesson.lessonNum}`;
    } else if (lesson.sectionNum) {
        path += `/section-${lesson.sectionNum}`;
    }
    if (part.partNum) {
        path += `/part-${part.partNum}`;
    }
    return path;
}


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
                                  href={constructPath(unit.id, lesson, part)}
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
