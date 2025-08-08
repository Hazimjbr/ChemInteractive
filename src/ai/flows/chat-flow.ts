'use server';
/**
 * @fileOverview A chemistry assistant AI agent.
 *
 * - chat - A function that handles the chat with the assistant.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
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
  message: z.string().describe('The user\'s message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.string();
export type ChatOutput = z.infer<typeof ChatOutputSchema>;


const chemistryTutorPrompt = ai.definePrompt({
    name: 'chemistryTutorPrompt',
    input: { schema: ChatInputSchema },
    output: { schema: ChatOutputSchema },
    prompt: `You are an expert chemistry tutor specializing in the Jordanian Tawjihi curriculum. Your tone should be friendly, encouraging, and clear.

    Your role is to help students understand chemistry concepts, solve problems, and prepare for their exams. When a student asks a question, provide a step-by-step explanation. If they ask for a definition, make it simple and provide an example.

    Always maintain a positive and supportive tone. Encourage students to ask more questions.

    Here is the chat history, use it for context:
    {{#each history}}
      {{#if (eq role 'user')}}From User: {{content.[0].text}}{{/if}}
      {{#if (eq role 'model')}}From You: {{content.[0].text}}{{/if}}
    {{/each}}

    New message from the student:
    {{{message}}}`,
});


export async function chat(input: ChatInput): Promise<ChatOutput> {
    const {output} = await chemistryTutorPrompt(input);
    return output!;
}
