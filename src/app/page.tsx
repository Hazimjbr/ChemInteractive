import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckSquare, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4">
          أهلاً بك في ChemInteractive
        </h1>
        <p className="text-xl text-muted-foreground mb-2">
          منصتك التفاعلية لإتقان كيمياء التوجيهي الأردني بأحدث الطرق التعليمية.
        </p>
        <p className="text-2xl font-semibold text-accent mt-4" dir="ltr">
            مع المعلم حازم جبر 0799747775
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Button size="lg" variant="default">
            <BookOpen className="ml-2" />
            ابدأ التعلم
          </Button>
          <Button size="lg" variant="outline">
             <CheckSquare className="ml-2" />
            اختبر نفسك
          </Button>
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">لوحة تحكم سريعة</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock />
                أكمل من حيث توقفت
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                الحالة الغازية: نظرية الحركة الجزيئية
              </p>
              <Button>متابعة الدرس</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                 <CheckSquare />
                امتحان مقترح
              </CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-muted-foreground mb-4">
                اختبر فهمك في وحدة "حالات المادة".
              </p>
              <Button variant="outline">بدء الامتحان</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
