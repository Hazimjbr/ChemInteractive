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
  })).describe("The chat history, including the latest user message."),
});
type ChatInput = z.infer<typeof ChatInputSchema>;

// A simplified system prompt to diagnose the model's non-responsiveness.
const systemPrompt = `You are a helpful and friendly chemistry tutor. Your name is "المساعد الذكي".
You must always answer in Arabic. Your tone should be encouraging and professional.
Your main goal is to help students with their chemistry questions.
Use markdown for formatting when necessary.`;


const chemistryTutorPrompt = ai.definePrompt({
    name: 'chemistryTutorPrompt',
    model: 'googleai/gemini-1.5-flash',
    input: { schema: ChatInputSchema },
    output: { format: 'text' }, // Ensure the output is treated as simple text.
    messages: (input) => [
        { role: 'system', content: [{ text: systemPrompt }] },
        ...input.history.filter(m => m.content[0]?.text), // Filter out empty messages
    ],
});


export async function chat(input: ChatInput): Promise<string> {
    const {output} = await chemistryTutorPrompt(input);
    // The output is now a direct string, no need for casting or complex checks.
    return output || 'عذراً، لم أتمكن من فهم الطلب. الرجاء المحاولة مرة أخرى.';
}
