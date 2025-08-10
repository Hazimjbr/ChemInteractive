'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
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

export default function Quiz({ lessonContent }: QuizProps) {
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('unanswered');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const { toast } = useToast();

  const handleGenerateQuiz = async () => {
    setIsLoading(true);
    setQuiz(null);
    setIsFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    try {
      const result = await generateQuiz(lessonContent);
      setQuiz(result.quiz);
    } catch (error) {
      console.error('Failed to generate quiz:', error);
      toast({
        variant: 'destructive',
        title: 'خطأ في إنشاء الاختبار',
        description: 'حدث خطأ أثناء محاولة إنشاء الاختبار. الرجاء المحاولة مرة أخرى.',
      });
    } finally {
      setIsLoading(false);
    }
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
    setAnswerStatus('unanswered');
    setSelectedAnswer(null);
    if (currentQuestionIndex < quiz!.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };
  
  const handleRestartQuiz = () => {
    handleGenerateQuiz();
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
                إعادة إنشاء الاختبار
            </Button>
        </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p>جاري إنشاء اختبار مخصص لك...</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center">
        <Button onClick={handleGenerateQuiz}>
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
         <Progress value={((currentQuestionIndex + 1) / quiz.length) * 100} className="w-1/2" />
       </div>

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
