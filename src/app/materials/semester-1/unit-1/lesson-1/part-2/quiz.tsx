
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import { Loader2, CheckCircle, XCircle, Star, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils.tsx';
import { useToast } from '@/hooks/use-toast';

// Define the type here as it's no longer exported from the server action
export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

interface QuizProps {
  lessonContent: string;
}

type AnswerStatus = 'unanswered' | 'correct' | 'incorrect';

const staticQuizLvl1: QuizQuestion[] = [
    {
        "question": "أي من التالي ليست من المتغيرات الأربعة الأساسية لوصف سلوك الغاز المحصور؟",
        "options": [
            "الضغط (P)",
            "الحجم (V)",
            "الكثافة (D)",
            "درجة الحرارة (T)"
        ],
        "correctAnswerIndex": 2,
        "explanation": "المتغيرات الأربعة الأساسية هي الضغط (P)، الحجم (V)، درجة الحرارة (T)، وكمية الغاز (n). الكثافة هي خاصية مهمة ولكنها ليست من المتغيرات الأساسية الأربعة المستخدمة في قوانين الغازات الأولية."
    },
    {
        "question": "ما هي وحدة قياس درجة الحرارة التي يجب استخدامها دائمًا في قوانين الغازات؟",
        "options": [
            "سيليزية (°C)",
            "فهرنهايت (°F)",
            "كلفن (K)",
            "جميع ما سبق صحيح"
        ],
        "correctAnswerIndex": 2,
        "explanation": "يجب استخدام درجة الحرارة المطلقة (كلفن) في جميع حسابات قوانين الغازات لأنها تبدأ من الصفر المطلق، حيث تتوقف حركة الجسيمات نظريًا."
    },
    {
        "question": "قيمة الضغط الجوي المعياري (1 atm) تعادل:",
        "options": [
            "101.3 mmHg",
            "760 Pa",
            "273 K",
            "760 mmHg"
        ],
        "correctAnswerIndex": 3,
        "explanation": "الضغط الجوي المعياري (1 atm) يعادل 760 مليمتر زئبق (mmHg) أو 101.3 كيلوباسكال (kPa)."
    },
    {
        "question": "ماذا تمثل الظروف المعيارية (STP)؟",
        "options": [
            "1 atm و 25 °C",
            "760 mmHg و 273 K",
            "101.3 kPa و 100 °C",
            "1 atm و 0 K"
        ],
        "correctAnswerIndex": 1,
        "explanation": "الظروف المعيارية (STP) هي ظروف مرجعية محددة عند ضغط 1 atm (والذي يعادل 760 mmHg) ودرجة حرارة 0 °C (والتي تعادل 273 K)."
    },
    {
        "question": "إذا كان حجم وعاء يحتوي على غاز هو 2 لتر، فما هو حجم الغاز؟",
        "options": [
            "1 لتر",
            "2 لتر",
            "لا يمكن تحديده",
            "أقل من 2 لتر"
        ],
        "correctAnswerIndex": 1,
        "explanation": "من خصائص الغازات أنها تتمدد لتملأ الحيز الذي توضع فيه بالكامل، لذلك فإن حجم الغاز يساوي حجم الوعاء الذي يحتويه، وهو 2 لتر."
    }
];

const staticQuizLvl2: QuizQuestion[] = [
    {
        "question": "إذا كانت درجة حرارة غرفة 298 كلفن، فما هي قيمتها بالدرجة المئوية (°C)؟",
        "options": [
            "25 °C",
            "273 °C",
            "571 °C",
            "-25 °C"
        ],
        "correctAnswerIndex": 0,
        "explanation": "للتحويل من كلفن إلى سيليزيوس، نستخدم العلاقة: T(°C) = T(K) - 273. إذن، 298 - 273 = 25 °C."
    },
    {
        "question": "إذا كان ضغط غاز يساوي 202.6 kPa، فما هي قيمة هذا الضغط بوحدة atm؟",
        "options": [
            "1 atm",
            "1.5 atm",
            "2 atm",
            "0.5 atm"
        ],
        "correctAnswerIndex": 2,
        "explanation": "نعلم أن 1 atm = 101.3 kPa. لمعرفة كم atm يعادل 202.6 kPa، نقسم: 202.6 / 101.3 = 2 atm."
    },
    {
        "question": "لماذا لا يمكن أن تكون قيمة درجة الحرارة بالكلفن سالبة؟",
        "options": [
            "لأنها وحدة قياس بريطانية.",
            "لأن الصفر كلفن (الصفر المطلق) يمثل أدنى طاقة حركية ممكنة للجسيمات.",
            "لأن التحويل من سيليزيوس يتطلب دائمًا إضافة 273.",
            "لأن الكلفن يستخدم فقط لقياس درجات الحرارة العالية جدًا."
        ],
        "correctAnswerIndex": 1,
        "explanation": "مقياس كلفن هو مقياس مطلق لدرجة الحرارة. الصفر المطلق (0 K) هو النقطة التي تتوقف عندها حركة الجسيمات تمامًا نظريًا، ولا يمكن وجود طاقة حركية أقل من الصفر، لذلك لا توجد درجات حرارة سالبة بالكلفن."
    },
    {
        "question": "في أي من الحالات التالية يكون عدد مولات الغاز (n) هو العامل الأكثر أهمية في تحديد الضغط؟",
        "options": [
            "عند مقارنة غازين مختلفين في نفس الوعاء ونفس درجة الحرارة.",
            "عند تغيير حجم الوعاء فقط.",
            "عند تغيير درجة حرارة الغاز فقط.",
            "عدد المولات لا يؤثر على الضغط أبدًا."
        ],
        "correctAnswerIndex": 0,
        "explanation": "عند ثبات الحجم ودرجة الحرارة، فإن ضغط الغاز يتناسب طرديًا مع عدد جسيماته (عدد المولات). كلما زادت كمية الغاز في نفس الحيز، زادت التصادمات مع الجدار وزاد الضغط."
    },
    {
        "question": "ماذا يعني أن حجم الغاز يساوي حجم الوعاء؟",
        "options": [
            "أن جسيمات الغاز تملأ جزءًا صغيرًا من الوعاء.",
            "أن جسيمات الغاز تتجمع في قاع الوعاء.",
            "أن جسيمات الغاز تنتشر لتشغل كل الحيز المتاح لها داخل الوعاء.",
            "أن حجم الوعاء يتغير ليتناسب مع حجم الغاز."
        ],
        "correctAnswerIndex": 2,
        "explanation": "بسبب الطاقة الحركية العالية وقوى التجاذب الضعيفة جدًا بين جسيمات الغاز، فإنها تتحرك بحرية وتتباعد لتملأ أي وعاء توضع فيه بالكامل، مما يجعل حجم الغاز مطابقًا لحجم الوعاء."
    }
];

export default function Quiz({ lessonContent }: QuizProps) {
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('unanswered');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const { toast } = useToast();

 const handleGenerateQuiz = async (level: number) => {
    setIsLoading(true);
    setQuiz(null);
    setIsFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswerStatus('unanswered');
    setSelectedAnswer(null);

    // Simulate loading
    setTimeout(() => {
        if (level === 1) {
            setQuiz(staticQuizLvl1);
        } else {
            // For any level > 1, use the more difficult quiz
            setQuiz(staticQuizLvl2);
        }
        setIsLoading(false);
    }, 1000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (answerStatus !== 'unanswered') return;

    setSelectedAnswer(answerIndex);
    const isCorrect = quiz![currentQuestionIndex].correctAnswerIndex === answerIndex;

    if (isCorrect) {
      setAnswerStatus('correct');
      setScore((prev) => prev + 1);
    } else {
      setAnswerStatus('incorrect');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz!.length - 1) {
       setAnswerStatus('unanswered');
       setSelectedAnswer(null);
       setCurrentQuestionIndex((prev) => prev + 1);
    } else {
        // Quiz is finished
        const finalScore = score / quiz!.length;
        if(finalScore >= 0.8) {
            setDifficultyLevel(prev => prev + 1);
             toast({
                title: 'مستوى الصعوبة ارتفع!',
                description: `رائع! لقد أتقنت هذا المستوى. الاختبار القادم سيكون أكثر تحديًا. المستوى الجديد: ${difficultyLevel + 1}`,
                className: 'bg-green-100 border-green-400 text-green-800'
            });
        }
       setIsFinished(true);
    }
  };
  
  const handleRestartQuiz = () => {
    handleGenerateQuiz(difficultyLevel);
  }


  if (isFinished) {
    return (
        <div className="text-center space-y-4 p-4 rounded-lg bg-muted">
            <h3 className="text-2xl font-bold">اكتمل الاختبار!</h3>
            <p className="text-lg">
                نتيجتك النهائية هي: <span className="font-bold text-primary">{score}</span> من {quiz?.length}
            </p>
            <div className="flex items-center justify-center gap-2">
                <Progress value={(score / (quiz?.length || 1)) * 100} className="w-1/2" />
                <span>{Math.round((score / (quiz?.length || 1)) * 100)}%</span>
            </div>
            <Button onClick={handleRestartQuiz}>
                 <Sparkles className="ml-2 h-4 w-4" />
                {score / (quiz?.length || 1) >= 0.8 ? `تحدّ جديد (المستوى ${difficultyLevel})` : `إعادة الاختبار (المستوى ${difficultyLevel})`}
            </Button>
        </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p>جاري إنشاء اختبار مخصص لك...</p>
        <p className="text-sm font-semibold">مستوى الصعوبة: {difficultyLevel}</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center space-y-3">
         <div className='flex justify-center items-center gap-1 font-bold text-accent'>
            <Star className='h-5 w-5' />
            <span>مستوى الصعوبة: {difficultyLevel}</span>
        </div>
        <Button onClick={() => handleGenerateQuiz(difficultyLevel)}>
          أنشئ اختباري
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
            انقر لإنشاء اختبار قصير مخصص حول هذا الدرس بواسطة الذكاء الاصطناعي.
        </p>
      </div>
    );
  }

  const currentQuestion = quiz[currentQuestionIndex];

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
         <h4 className="font-bold">
            السؤال {currentQuestionIndex + 1} من {quiz.length}
         </h4>
        <div className='flex items-center gap-1 text-sm font-semibold text-accent'>
            <Star className='h-4 w-4' />
            <span>مستوى الصعوبة: {difficultyLevel}</span>
        </div>
       </div>
        <Progress value={((currentQuestionIndex + 1) / quiz.length) * 100} className="w-full" />


      <p className="text-lg font-semibold">{currentQuestion.question}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => {
          const isCorrect = index === currentQuestion.correctAnswerIndex;
          const isSelected = selectedAnswer === index;
          
          let buttonClass = '';
          if (answerStatus === 'correct' && isCorrect) {
            buttonClass = 'bg-green-500/20 border-green-500 text-green-700';
          } else if (answerStatus === 'incorrect' && isSelected) {
            buttonClass = 'bg-red-500/20 border-red-500 text-red-700';
          } else if (answerStatus !== 'unanswered' && isCorrect) {
             buttonClass = 'bg-green-500/20 border-green-500 text-green-700';
          }

          return (
            <Button
              key={index}
              variant="outline"
              size="lg"
              className={cn("justify-start text-right h-auto py-3 whitespace-normal", buttonClass)}
              onClick={() => handleAnswerSelect(index)}
              disabled={answerStatus !== 'unanswered'}
            >
              <span className="ml-4 font-bold">{String.fromCharCode(65 + index)}</span>
              <span>{option}</span>
            </Button>
          );
        })}
      </div>

      {answerStatus !== 'unanswered' && (
         <div className="space-y-4">
            <Alert variant={answerStatus === 'correct' ? 'default' : 'destructive'} className={cn(answerStatus === 'correct' && 'border-green-500')}>
                {answerStatus === 'correct' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4" />}
                <AlertTitle>
                    {answerStatus === 'correct' ? 'إجابة صحيحة!' : 'إجابة خاطئة!'}
                </AlertTitle>
                <AlertDescription>
                    {currentQuestion.explanation}
                </AlertDescription>
            </Alert>
            <Button onClick={handleNextQuestion} className="w-full">
                {currentQuestionIndex < quiz.length - 1 ? 'السؤال التالي' : 'إنهاء الاختبار'}
            </Button>
         </div>
      )}
    </div>
  );
}

    