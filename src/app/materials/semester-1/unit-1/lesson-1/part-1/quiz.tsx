
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
        "question": "وفقًا لنظرية الحركة الجزيئية، أي من العبارات التالية تصف سلوك جسيمات الغاز بشكل صحيح؟",
        "options": [
            "تتحرك في مسارات دائرية منتظمة.",
            "تهتز في مكانها فقط.",
            "تتحرك بشكل مستمر وعشوائي في خطوط مستقيمة.",
            "تفقد طاقتها عند كل تصادم."
        ],
        "correctAnswerIndex": 2,
        "explanation": "نظرية الحركة الجزيئية تفترض أن جسيمات الغاز في حركة مستمرة، عشوائية، وسريعة في جميع الاتجاهات وفي خطوط مستقيمة حتى تصطدم بجسيم آخر أو بجدار الوعاء."
    },
    {
        "question": "ماذا يحدث لمتوسط الطاقة الحركية لجسيمات الغاز عند زيادة درجة الحرارة المطلقة؟",
        "options": [
            "يقل",
            "يبقى ثابتًا",
            "يزداد",
            "يصبح صفرًا"
        ],
        "correctAnswerIndex": 2,
        "explanation": "ينص أحد بنود نظرية الحركة الجزيئية على أن متوسط الطاقة الحركية لجسيمات الغاز يتناسب طرديًا مع درجة الحرارة المطلقة (بالكلفن)."
    },
    {
        "question": "أي من الخصائص التالية لا تنطبق على الغاز المثالي؟",
        "options": [
            "قوى التجاذب بين جسيماته معدومة.",
            "حجم جسيماته مهمل (يساوي صفر).",
            "يمكن إسالته بزيادة الضغط وخفض الحرارة.",
            "تصادماته مرنة تمامًا."
        ],
        "correctAnswerIndex": 2,
        "explanation": "الغاز المثالي هو نموذج افتراضي لا يمكن إسالته، لأننا نفترض عدم وجود قوى تجاذب بين جسيماته. الغازات الحقيقية هي التي يمكن إسالتها."
    },
    {
        "question": "ماذا يطلق على الحركة العشوائية للغبار في الهواء الناتجة عن تصادمه مع جسيمات الهواء غير المرئية؟",
        "options": [
            "الحركة الدورانية",
            "الحركة الاهتزازية",
            "الحركة الانتقالية",
            "الحركة البراونية"
        ],
        "correctAnswerIndex": 3,
        "explanation": "الحركة البراونية هي الحركة العشوائية للجسيمات المرئية (مثل الغبار) بسبب تصادمها مع الجسيمات غير المرئية للمائع (مثل الهواء) التي تتحرك باستمرار."
    },
    {
        "question": "عندما يصطدم جسيم غاز بجدار الوعاء، ماذا ينتج عن هذا التصادم؟",
        "options": [
            "انخفاض في درجة حرارة الغاز.",
            "قوة تساهم في ضغط الغاز.",
            "تكاثف الغاز إلى سائل.",
            "انخفاض في حجم الوعاء."
        ],
        "correctAnswerIndex": 1,
        "explanation": "ينشأ ضغط الغاز عن القوة الناتجة عن تصادمات جسيماته المستمرة مع جدران الوعاء الذي يحتويه."
    }
];

const staticQuizLvl2: QuizQuestion[] = [
    {
        "question": "ما هو الافتراض الأساسي الذي يميز الغاز المثالي عن الغاز الحقيقي فيما يتعلق بقوى التجاذب وحجم الجسيمات؟",
        "options": [
            "الغاز المثالي له حجم جسيمات وقوى تجاذب لا يمكن إهمالها.",
            "الغاز المثالي ليس له حجم للجسيمات ولا قوى تجاذب بينها.",
            "الغاز الحقيقي ليس له حجم للجسيمات ولا قوى تجاذب بينها.",
            "كلاهما لهما نفس الخصائص تمامًا في جميع الظروف."
        ],
        "correctAnswerIndex": 1,
        "explanation": "الفرق الجوهري هو أن نموذج الغاز المثالي يفترض نظريًا أن حجم الجسيمات وقوى التجاذب بينها معدومة (تساوي صفر) لتبسيط الحسابات، بينما في الغازات الحقيقية، هذه الخصائص موجودة ولكنها صغيرة جدًا."
    },
    {
        "question": "أي من الغازات التالية يُتوقع أن يكون انحرافه عن سلوك الغاز المثالي هو الأكبر عند نفس الظروف من الضغط والحرارة؟ (الكتل المولية: Ne=20, NH3=17, HF=20)",
        "options": [
            "Ne (نيون)",
            "NH3 (الأمونيا)",
            "HF (فلوريد الهيدروجين)",
            "جميعها تنحرف بنفس المقدار."
        ],
        "correctAnswerIndex": 2,
        "explanation": "يزداد الانحراف عن السلوك المثالي بزيادة قوى التجاذب بين الجسيمات. غاز HF يحتوي على روابط هيدروجينية وهي الأقوى، تليها NH3 (ثنائية القطب)، ثم Ne (قوى لندن). لذلك، HF هو الأكثر انحرافًا."
    },
    {
        "question": "عند ضغط غاز حقيقي في حجم صغير جدًا، لماذا يصبح حجم الجسيمات الفعلي مهمًا ولا يمكن إهماله؟",
        "options": [
            "لأن الجسيمات تبدأ في فقدان طاقتها الحركية.",
            "لأن حجم الجسيمات يصبح نسبة كبيرة من الحجم الكلي للوعاء.",
            "لأن قوى التجاذب بين الجسيمات تختفي تمامًا.",
            "لأن درجة حرارة الغاز تزداد بشكل كبير."
        ],
        "correctAnswerIndex": 1,
        "explanation": "في الأحجام الكبيرة، يكون حجم الجسيمات ضئيلًا مقارنة بالفراغ بينها. ولكن عند ضغط الغاز، يقل الفراغ بشكل كبير، ويصبح الحجم الذي تشغله الجسيمات نفسها نسبة مؤثرة من الحجم الكلي، مما يسبب انحرافًا عن السلوك المثالي."
    },
    {
        "question": "في محاكاة حركة الجزيئات، ماذا يحدث لسرعة الجسيمات إذا تم زيادة حجم الوعاء مع الحفاظ على ثبات درجة الحرارة؟",
        "options": [
            "تزداد سرعة الجسيمات.",
            "تقل سرعة الجسيمات.",
            "تبقى سرعة الجسيمات (متوسط الطاقة الحركية) ثابتة.",
            "تتوقف الجسيمات عن الحركة."
        ],
        "correctAnswerIndex": 2,
        "explanation": "وفقًا لنظرية الحركة الجزيئية، تعتمد الطاقة الحركية (وبالتالي متوسط السرعة) لجسيمات الغاز على درجة الحرارة المطلقة فقط. طالما بقيت درجة الحرارة ثابتة، فإن متوسط سرعة الجسيمات لن يتغير."
    },
    {
        "question": "لماذا تعتبر التصادمات بين جسيمات الغاز \"مرنة\"؟",
        "options": [
            "لأنها تزيد من درجة حرارة الغاز.",
            "لأنها تؤدي إلى التصاق الجسيمات ببعضها.",
            "لأنه لا يحدث فقدان في الطاقة الحركية الكلية للنظام بعد التصادم.",
            "لأنها تقلل من ضغط الغاز."
        ],
        "correctAnswerIndex": 2,
        "explanation": "التصادم المرن هو تصادم مثالي لا يتم فيه فقدان أي طاقة حركية. قد تنتقل الطاقة من جسيم إلى آخر، لكن الطاقة الحركية الإجمالية لجميع الجسيمات قبل التصادم تساوي الطاقة الحركية الإجمالية بعده."
    }
];

const staticQuizLvl3: QuizQuestion[] = [
    {
        "question": "أي من الظروف التالية تجعل غاز الكلور (Cl2) يسلك سلوكًا هو الأقرب إلى الغاز المثالي؟",
        "options": [
            "ضغط مرتفع ودرجة حرارة منخفضة.",
            "ضغط منخفض ودرجة حرارة مرتفعة.",
            "ضغط مرتفع ودرجة حرارة مرتفعة.",
            "ضغط منخفض ودرجة حرارة منخفضة."
        ],
        "correctAnswerIndex": 1,
        "explanation": "يسلك الغاز الحقيقي سلوكًا قريبًا من المثالي عندما تكون قوى التجاذب بين جسيماته وطاقته الحركية هي الأقل تأثيرًا. يحدث هذا عند ضغط منخفض (حيث تكون الجسيمات متباعدة) ودرجة حرارة مرتفعة (حيث تكون طاقتها الحركية عالية جدًا وتتغلب على قوى التجاذب)."
    },
    {
        "question": "غازان A و B عند نفس درجة الحرارة. إذا كانت الكتلة المولية للغاز A أكبر من الكتلة المولية للغاز B، فأي عبارة صحيحة؟",
        "options": [
            "متوسط الطاقة الحركية لـ A أكبر من B.",
            "متوسط سرعة جسيمات A أكبر من متوسط سرعة جسيمات B.",
            "متوسط الطاقة الحركية لـ A يساوي متوسط الطاقة الحركية لـ B.",
            "متوسط الطاقة الحركية لـ A أصغر من B."
        ],
        "correctAnswerIndex": 2,
        "explanation": "الطاقة الحركية تعتمد فقط على درجة الحرارة. بما أن الغازين عند نفس درجة الحرارة، فإن لهما نفس متوسط الطاقة الحركية. ولكن، بما أن الغاز A له كتلة أكبر، يجب أن تكون سرعته أقل من سرعة B لتحقيق نفس الطاقة الحركية (KE = 0.5 * m * v^2)."
    },
    {
        "question": "في وعاء مغلق حجمه ثابت، تمت مضاعفة كمية غاز مثالي مع الحفاظ على درجة الحرارة ثابتة. ماذا يحدث للضغط؟",
        "options": [
            "يبقى ثابتًا.",
            "يتضاعف.",
            "ينخفض إلى النصف.",
            "يزداد أربع مرات."
        ],
        "correctAnswerIndex": 1,
        "explanation": "ينشأ الضغط عن تصادم الجسيمات مع جدار الوعاء. عند مضاعفة كمية الغاز (عدد المولات) في نفس الحجم وعند نفس درجة الحرارة، فإن عدد التصادمات مع الجدار في وحدة الزمن يتضاعف، مما يؤدي إلى تضاعف الضغط."
    },
    {
        "question": "أي من الغازات التالية يُتوقع أن يكون له أعلى قابلية للإسالة (أكثر انحرافًا عن السلوك المثالي)؟",
        "options": [
            "H2 (هيدروجين)",
            "He (هيليوم)",
            "CH4 (ميثان)",
            "SO2 (ثاني أكسيد الكبريت)"
        ],
        "correctAnswerIndex": 3,
        "explanation": "تزداد قابلية الإسالة بزيادة قوى التجاذب بين الجسيمات. SO2 هو جزيء قطبي وله كتلة مولية هي الأكبر بين الخيارات، مما يعني أن له أقوى قوى تجاذب (قوى لندن وثنائية القطب). بقية الغازات غير قطبية وقوى التجاذب بينها أضعف."
    },
    {
        "question": "وفقًا لفرضيات نظرية الحركة الجزيئية، لماذا لا \"يستقر\" الغاز في قاع الوعاء بفعل الجاذبية؟",
        "options": [
            "لأن حجم جسيمات الغاز مهمل.",
            "لأن التصادمات بين الجسيمات مرنة تمامًا.",
            "لأن الطاقة الحركية للجسيمات أكبر بكثير من تأثير قوى الجاذبية بينها.",
            "لأن قوى التجاذب بين الجسيمات معدومة."
        ],
        "correctAnswerIndex": 2,
        "explanation": "السبب الرئيسي هو أن جسيمات الغاز تمتلك طاقة حركية هائلة تجعلها في حركة مستمرة وعشوائية. هذه الطاقة تتغلب بسهولة على قوى الجاذبية الضعيفة بين الجسيمات وعلى تأثير الجاذبية الأرضية، مما يجعلها تنتشر لتملأ الوعاء كاملاً."
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
        } else if (level === 2) {
            setQuiz(staticQuizLvl2);
        } else {
             // For any level > 2, use the most difficult quiz
            setQuiz(staticQuizLvl3);
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

    
