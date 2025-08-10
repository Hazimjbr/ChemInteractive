'use server';
/**
 * @fileOverview A flow for generating a quiz based on lesson content.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const QuizQuestionSchema = z.object({
  question: z.string().describe('The question text.'),
  options: z
    .array(z.string())
    .length(4)
    .describe('An array of exactly 4 possible answers.'),
  correctAnswerIndex: z
    .number()
    .min(0)
    .max(3)
    .describe('The index of the correct answer in the options array.'),
  explanation: z
    .string()
    .describe('A step-by-step explanation for why the correct answer is right.'),
});

const GenerateQuizOutputSchema = z.object({
  quiz: z
    .array(QuizQuestionSchema)
    .length(5)
    .describe('An array of 5 quiz questions.'),
});

type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

const quizGenerationPrompt = ai.definePrompt({
  name: 'quizGenerationPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: z.object({ lessonContent: z.string() }) },
  output: { schema: GenerateQuizOutputSchema },
  prompt: `أنت مساعد تعليمي خبير في الكيمياء. مهمتك هي إنشاء اختبار قصير (كويز) من 5 أسئلة اختيار من متعدد بناءً على محتوى الدرس التالي.

**معايير الجودة (مهم جداً):**
1.  **الدقة العلمية:** يجب أن تكون الأسئلة والإجابات والشروحات دقيقة 100% بناءً على محتوى الدرس المقدم حصراً.
2.  **التحقق الذاتي الإلزامي:** قبل تقديم الإجابة النهائية، يجب عليك مراجعة كل سؤال للتأكد من أن **شرح الإجابة** يتطابق تمامًا مع **الإجابة الصحيحة** التي قمت بتحديدها. إذا كان هناك أي تناقض، يجب عليك تصحيح السؤال أو الإجابة أو الشرح لضمان التوافق التام. يجب أن يكون الشرح دليلًا قاطعًا على صحة الإجابة المختارة.
3.  **جودة الخيارات المضللة:** تأكد من أن الخيارات الخاطئة معقولة ولكنها غير صحيحة بشكل قاطع.


**المتطلبات:**
*   يجب أن تكون الأسئلة ذات جودة عالية وتغطي المفاهيم الأساسية في النص.
*   لكل سؤال، قدم 4 خيارات، وحدد الإجابة الصحيحة، وقدم شرحًا واضحًا ومفصلاً لسبب صحة هذه الإجابة.
*   يجب أن يكون كامل المحتوى الذي تنشئه باللغة العربية.

محتوى الدرس:
---
{{{lessonContent}}}
---

قم بإنشاء الأسئلة بتنسيق JSON المطلوب.`,
});

export async function generateQuiz(
  lessonContent: string
): Promise<GenerateQuizOutput> {
  const { output } = await quizGenerationPrompt({ lessonContent });
  if (!output) {
    throw new Error('Failed to generate quiz. The AI model returned no output.');
  }
  return output;
}
