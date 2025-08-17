
import { InlineMath } from 'react-katex';
import React from 'react';
import { GasSamplesDiagram, DiffusionProcessDiagram, BromineDiffusionDiagram, AmmoniumChlorideDiagram } from './diagram';

export interface QuizQuestion {
    question: React.ReactNode;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

const gasSamplesQuestionText = "ادرس الرسم المجاور والذي يمثل أربع عينات من الغازات متساوية الحجم عند نفس درجة الحرارة ثم أجب عن الأسئلة الثلاثة الآتية:";


export const staticQuizLvl1: QuizQuestion[] = [
    {
        question: <div><p>{gasSamplesQuestionText}</p><GasSamplesDiagram /><strong className="mt-2 block text-accent">1) عينة الغاز الأكبر ضغطًا:</strong></div>,
        options: ["A", "B", "C", "D"],
        correctAnswerIndex: 3,
        explanation: "الضغط يتناسب طرديًا مع عدد الجسيمات (المولات) عند ثبات الحجم والحرارة. العينة D تحتوي على أكبر عدد من الجسيمات (5 جسيمات)، لذا ضغطها هو الأكبر."
    },
    {
        question: <div><p>{gasSamplesQuestionText}</p><GasSamplesDiagram /><strong className="mt-2 block text-accent">2) عينة الغاز الأسرع تدفقًا:</strong></div>,
        options: ["A", "B", "C", "D"],
        correctAnswerIndex: 3,
        explanation: "سرعة التدفق تتناسب عكسيًا مع الكتلة المولية. الغاز الأسرع هو الذي له أقل كتلة مولية. بالنظر إلى الأشكال، الجسيمات في D هي الأصغر (ذرات منفردة)، مما يوحي بأنها الأخف والأسرع تدفقًا."
    },
    {
        question: <div><p>{gasSamplesQuestionText}</p><GasSamplesDiagram /><strong className="mt-2 block text-accent">3) إذا كانت الكتل المولية للغازات (A:20, B:18, C:46, D:32)g/mol، فإن عينة الغاز الأكثر كثافة هي:</strong></div>,
        options: ["A", "B", "C", "D"],
        correctAnswerIndex: 3,
        explanation: "الكثافة = الكتلة/الحجم. بما أن الحجم ثابت، فالأعلى كثافة هو صاحب الكتلة الأكبر. الكتلة تتناسب مع عدد الجسيمات والكتلة المولية. بحساب كتلة نسبية (عدد الجسيمات × الكتلة المولية): A=4×20=80, B=3×18=54, C=2×46=92, D=5×32=160. العينة D لها الكتلة الأعلى وبالتالي هي الأعلى كثافة."
    },
    {
        question: <div><p>أي من الأشكال التالية يوضح عملية الانتشار بشكل صحيح؟</p><DiffusionProcessDiagram /></div>,
        options: ["أ", "ب", "ج", "د"],
        correctAnswerIndex: 0,
        explanation: "الانتشار هو الاختلاط التدريجي للغازات بسبب حركتها العشوائية، والذي يؤدي إلى خليط متجانس. الشكل (أ) يوضح بشكل صحيح كيف أن الجسيمات التي بدأت منفصلة، اختلطت لتكوين خليط متجانس."
    },
    {
        question: <div><p>ادرس الرسم المجاور والذي يمثل وعاءين مفصولين بشريحة زجاجية في الشكل A ثم اختر العبارة الصحيحة التي تفسر ما حدث بعد إزالة الشريحة الزجاجية في الشكل B:</p><BromineDiffusionDiagram /></div>,
        options: [
            "جسيمات البروم والهواء تحركت بعشوائية",
            "جسيمات البروم تحركت للأعلى والهواء للأسفل",
            "لغاز البروم كثافة أكبر من الهواء",
            "للهواء كثافة أقل من غاز البروم"
        ],
        correctAnswerIndex: 0,
        explanation: "التفسير الأساسي لظاهرة الانتشار هو الحركة العشوائية المستمرة لجسيمات الغازات، والتي تؤدي إلى اختلاطها بمرور الوقت بغض النظر عن كثافتها."
    }
];

export const staticQuizLvl2: QuizQuestion[] = [
    {
        question: (
            <>
                <span>إذا كان معدل تدفق غاز الهيدروجين (</span>
                <span dir="ltr" className="inline-block"><InlineMath math="H_2" /></span>
                <span>) يساوي 4 أضعاف معدل تدفق غاز مجهول، فما الكتلة المولية للغاز المجهول؟ (الكتلة المولية لـ </span>
                <span dir="ltr" className="inline-block"><InlineMath math="H_2" /></span>
                <span> = 2g/mol)</span>
            </>
        ),
        options: ["8g/mol", "16g/mol", "32g/mol", "64g/mol"],
        correctAnswerIndex: 2,
        explanation: "وفقًا لقانون جراهام، (r₁/r₂)² = Mr₂/Mr₁. هنا r(H₂)/r(X) = 4. إذن، (4)² = Mr(X)/Mr(H₂). ومنها 16 = Mr(X)/2. وبالتالي، Mr(X) = 16 * 2 = 32g/mol."
    },
    {
        question: (
            <>
                <span>أي الغازات التالية هو الأبطأ انتشارًا في نفس الظروف؟ (الكتل المولية: O=16, S=32, C=12, H=1, N=14)</span>
            </>
        ),
        options: ["O₂", "H₂S", "CH₄", "SO₂"],
        correctAnswerIndex": 3,
        explanation: "الأبطأ انتشارًا هو الغاز الذي له أعلى كتلة مولية. نحسب الكتل المولية: O₂=32, H₂S=34, CH₄=16, SO₂=64. غاز SO₂ هو الأثقل، وبالتالي هو الأبطأ انتشارًا."
    },
    {
        question: "ما النسبة بين معدل سرعة تدفق غاز الهيليوم (He) إلى غاز النيون (Ne)؟ (الكتل المولية: He=4, Ne=20)",
        options: ["1 : 2.24", "2.24 : 1", "1 : 5", "5 : 1"],
        correctAnswerIndex: 1,
        explanation: "r(He)/r(Ne) = √(Mr(Ne)/Mr(He)) = √(20/4) = √5 ≈ 2.24. إذن النسبة هي 2.24 إلى 1."
    },
     {
        question: <div><p>ادرس الرسم التالي الذي يوضح تجربة لدراسة انتشار غازي HCl و NH₃ في أنبوب زجاجي، ثم أجب عن السؤال:</p><AmmoniumChlorideDiagram /><strong className="text-accent mt-2 block">عند أي نقطة يتوقع أن تتكون حلقة بيضاء من كلوريد الأمونيوم (NH₄Cl)؟</strong></div>,
        options: ["A", "B", "C", "عند مسافة متساوية من الطرفين"],
        correctAnswerIndex: 2,
        explanation: "غاز NH₃ (الكتلة المولية ≈ 17) أخف من غاز HCl (الكتلة المولية ≈ 36.5). لذلك، ينتشر NH₃ بسرعة أكبر ويقطع مسافة أطول في الأنبوب قبل أن يلتقي بغاز HCl. ستتكون الحلقة البيضاء عند النقطة C، الأقرب إلى مصدر HCl."
    },
     {
        question: <><span>معدل سرعة انتشار غاز الأكسجين (</span><span dir="ltr" className="inline-block"><InlineMath math="O_2"/></span><span>) في الظروف المعيارية 32m/s، فإن معدل سرعة انتشار غاز الهيدروجين (</span><span dir="ltr" className="inline-block"><InlineMath math="H_2"/></span><span>) يساوي: (الكتل المولية: H=1, O=16)</span></>,
        options: ["128m/s", "8m/s", "64m/s", "32m/s"],
        correctAnswerIndex: 0,
        explanation: "Mr(O₂)=32, Mr(H₂)=2. r(H₂)/r(O₂) = √(Mr(O₂)/Mr(H₂)) = √(32/2) = √16 = 4. إذن، r(H₂) = 4 * r(O₂) = 4 * 32 = 128m/s."
    }
];

export const staticQuizLvl3: QuizQuestion[] = [
    {
        question: "إذا قطع غاز النيون (Ne) مسافة 20 مترًا في زمن معين، فما المسافة التي يقطعها غاز الأمونيا (NH₃) في نفس الزمن والظروف؟ (الكتل المولية: Ne=20, NH₃=17)",
        options: ["17m", "20m", "21.8m", "23.5m"],
        correctAnswerIndex: 2,
        explanation: "المسافة المقطوعة تتناسب طرديًا مع معدل الانتشار. r(NH₃)/r(Ne) = √(Mr(Ne)/Mr(NH₃)) = √(20/17) ≈ 1.08. إذن، المسافة التي يقطعها NH₃ = 1.08 * 20m ≈ 21.8m."
    },
    {
        question: "ماذا يحدث لمعدل انتشار الغاز عند زيادة درجة الحرارة؟",
        options: ["يزداد", "يقل", "يبقى ثابتًا", "يعتمد على الضغط"],
        correctAnswerIndex: 0,
        explanation: "قانون جراهام يفترض ثبات درجة الحرارة. ولكن بشكل عام، زيادة درجة الحرارة تزيد من الطاقة الحركية للجسيمات، مما يزيد من سرعتها وبالتالي يزيد من معدل انتشارها."
    },
    {
        question: "لماذا ينتشر الغاز أسرع في الفراغ منه في الهواء؟",
        options: [
            "لأن ضغط الفراغ أعلى.",
            "لأن درجة حرارة الفراغ أعلى.",
            "لعدم وجود جسيمات أخرى تعيق حركته وتصطدم به.",
            "لأن قوى التجاذب في الفراغ أقل."
        ],
        correctAnswerIndex: 2,
        explanation: "الانتشار في الهواء يتباطأ بسبب التصادمات المستمرة بين جسيمات الغاز المنتشر وجسيمات الهواء (النيتروجين والأكسجين). في الفراغ، لا توجد هذه التصادمات، فتتحرك الجسيمات بحرية حتى تصطدم بجدار الوعاء."
    },
     {
        question: "غازان A و B، إذا كان Mr(A) = 4 * Mr(B)، فما العلاقة بين معدلي انتشارهما؟",
        options: [
            "r(A) = 2 * r(B)",
            "r(B) = 2 * r(A)",
            "r(A) = 4 * r(B)",
            "r(B) = 4 * r(A)"
        ],
        correctAnswerIndex: 1,
        explanation: "r(B)/r(A) = √(Mr(A)/Mr(B)) = √(4*Mr(B)/Mr(B)) = √4 = 2. إذن، r(B) = 2 * r(A)، أي أن الغاز الأخف B أسرع بمرتين من الغاز الأثقل A."
    },
    {
        question: "أي من الخصائص التالية لا تؤثر بشكل مباشر على معدل انتشار غاز معين وفقًا لقانون جراهام؟",
        options: ["الكتلة المولية للغاز", "درجة الحرارة", "الضغط", "لون الغاز"],
        correctAnswerIndex": 3,
        explanation: "قانون جراهام يربط معدل الانتشار بالكتلة المولية عند ثبات الحرارة والضغط. لون الغاز هو خاصية فيزيائية لا علاقة لها بسرعة حركة جسيماته."
    }
];

    