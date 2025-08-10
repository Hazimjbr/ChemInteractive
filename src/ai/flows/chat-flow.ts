'use server';
/**
 * @fileOverview A chemistry assistant AI agent.
 *
 * - chat - A function that handles the chat with the assistant.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';


const ChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({
        text: z.string()
    }))
  })).describe("The chat history."),
});
type ChatInput = z.infer<typeof ChatInputSchema>;


const chemistryTutorPrompt = ai.definePrompt({
    name: 'chemistryTutorPrompt',
    input: { schema: ChatInputSchema },
    prompt: `You are an expert chemistry tutor specializing in the Jordanian Tawjihi curriculum. Your name is "المساعد الذكي". Your tone should be friendly, encouraging, professional, and clear. You must always answer in Arabic.

    Your role is to help students understand chemistry concepts, solve problems, and prepare for their exams. When a student asks a question, provide a step-by-step explanation. If they ask for a definition, make it simple and provide an example from the Jordanian curriculum context.

    Always maintain a positive and supportive tone. Encourage students to ask more questions. Use markdown for formatting, like lists, bold text, and code blocks for chemical equations.`,
    
    // Pass the history directly to the model.
    history: (input) => input.history,
});


export async function chat(input: ChatInput): Promise<string> {
    const {output} = await chemistryTutorPrompt(input);
    return (output as string) || 'عذراً، لم أتمكن من فهم الطلب. الرجاء المحاولة مرة أخرى.';
}
