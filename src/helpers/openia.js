import { createOpenAI } from "@ai-sdk/openai";

const openai = createOpenAI({
    apiKey: import.meta.env.VITE_OPENIA_KEY,
});

export default openai;