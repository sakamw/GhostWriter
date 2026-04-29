import { GoogleGenerativeAI } from "@google/generative-ai";
import { Observable, from } from 'rxjs';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export interface Insights {
  contradiction: string;
  statProof: string;
  punchline: string;
}

export const extractInsights = (text: string): Observable<string> => {
  return new Observable(subscriber => {
    const prompt = `Act as a Content Strategist. Your task is to analyze the provided transcript and extract the following:
    
    1. The 'Contradiction': One thing the speaker says that goes against common wisdom.
    2. The 'Stat/Proof': One specific number, result, or hard fact mentioned.
    3. The 'Punchline': The most impactful sentence in the whole text.

    Output this STRICTLY in JSON format with keys: "contradiction", "statProof", "punchline".
    
    Transcript: ${text}`;

    async function run() {
      try {
        const result = await model.generateContentStream(prompt);
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          subscriber.next(chunkText);
        }
        subscriber.complete();
      } catch (error) {
        subscriber.error(error);
      }
    }
    run();
  });
};

export const generateHooks = (insights: Insights): Observable<{type: string, text: string}[]> => {
  return from((async () => {
    const prompt = `Using the following 'Insight Extractor' data, generate 3 distinct LinkedIn Hooks:
    
    Contradiction: ${insights.contradiction}
    Stat/Proof: ${insights.statProof}
    Punchline: ${insights.punchline}

    Generate 3 distinct LinkedIn Hooks:
    1. The Contradictory Hook: Start with 'Most people believe [Common Wisdom]. They are wrong.'
    2. The Result-First Hook: Start with '[Specific Result] in just [Timeframe]. Here is the breakdown.'
    3. The 'Why You're Failing' Hook: Start with 'The reason you aren't seeing [Goal] isn't [Mistake A]. It's [Mistake B].'
    
    Constraints: Maximum 12 words per hook. No emojis.
    Output as JSON array of objects: [{"type": "contradictory", "text": "..."}, {"type": "result", "text": "..."}, {"type": "failing", "text": "..."}]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Basic extraction of JSON from response
    const jsonMatch = text.match(/\[.*\]/s);
    return JSON.parse(jsonMatch ? jsonMatch[0] : "[]");
  })());
};

export const generatePostParts = (hook: string, insights: Insights): Observable<string> => {
  return new Observable(subscriber => {
    const prompt = `Take the selected Hook and the transcript data to build the post body using the 1-3-1 Method:
    
    Hook: ${hook}
    Transcript/Insights: ${JSON.stringify(insights)}

    Structure:
    1. 1 sentence: Reinforce the hook with a transition.
    2. 3 bullet points: Explain the 'How-to' or 'Why' using plain English (Grade 6 reading level).
    3. 1 sentence: A 'Mic Drop' conclusion that summarizes the value.
    4. Engagement Closer: A 'Forced Choice' closing question. Do not ask 'What do you think?'. Example: 'Are you prioritizing Speed or Quality this quarter?'

    Style Guide: Ban all 'AI-isms' (delve, tapestry, unlock). Use active verbs only.
    Stream the response word by word.`;

    async function run() {
      try {
        const result = await model.generateContentStream(prompt);
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          subscriber.next(chunkText);
        }
        subscriber.complete();
      } catch (error) {
        subscriber.error(error);
      }
    }
    run();
  });
};
