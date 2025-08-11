
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils.tsx';

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

type AnswerStatus = 'unanswered' | 'correct' | 'incorrect';

const experimentQuiz: QuizQuestion[] = [
    {
        question: "ماذا يحدث لحجم البالون عند وضعه في الحمام الثلجي، كما هو موضح في المحاكاة؟",
        options: [
            "يزداد حجمه",
            "يقل حجمه",
            "يبقى حجمه ثابتًا",
            "ينفجر البالون"
        ],
        correctAnswerIndex: 1,
        explanation: "عندما تنخفض درجة حرارة الهواء داخل البالون، تقل الطاقة الحركية لجسيمات الهواء، فتقل تصادماتها مع جدار البالون الداخلي، مما يؤدي إلى انكماش البالون ونقصان حجمه."
    },
    {
        question: "ماذا يحدث لحجم البالون عند وضعه في الحمام المائي الساخن؟",
        options: [
            "يزداد حجمه",
            "يقل حجمه",
            "يبقى حجمه ثابتًا",
            "يتغير لونه"
        ],
        correctAnswerIndex: 0,
        explanation: "عندما ترتفع درجة حرارة الهواء داخل البالون، تزداد الطاقة الحركية لجسيمات الهواء، فتزداد قوة وسرعة تصادماتها مع جدار البالون الداخلي، مما يؤدي إلى تمدد البالون وزيادة حجمه."
    },
    {
        question: "بناءً على التجربة، ما هي العلاقة التي يمكن استنتاجها بين حجم الغاز ودرجة حرارته عند ثبات الضغط؟",
        options: [
            "علاقة عكسية (كلما زادت الحرارة قل الحجم)",
            "علاقة طردية (كلما زادت الحرارة زاد الحجم)",
            "لا توجد علاقة واضحة",
            "العلاقة تعتمد على نوع الغاز"
        ],
        correctAnswerIndex: 1,
        explanation: "توضح التجربة أنه كلما زادت درجة الحرارة، زاد حجم الغاز، والعكس صحيح. هذه العلاقة تُعرف بالعلاقة الطردية، وهي أساس قانون شارل."
    }
];

export default function Quiz() {
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(experimentQuiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('unanswered');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

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
       setIsFinished(true);
    }
  };
  
  const handleRestartQuiz = () => {
    setQuiz(experimentQuiz);
    setIsFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswerStatus('unanswered');
    setSelectedAnswer(null);
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
                 <RefreshCw className="ml-2 h-4 w-4" />
                إعادة الاختبار
            </Button>
        </div>
    )
  }

  if (!quiz) {
    return null;
  }

  const currentQuestion = quiz[currentQuestionIndex];

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
         <h4 className="font-bold">
            السؤال {currentQuestionIndex + 1} من {quiz.length}
         </h4>
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
