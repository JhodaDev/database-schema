import { create } from "zustand";


const useAIStore = create((set) => ({
    resultSchema: null,
    setResultSchema: (resultSchema) => set({ resultSchema }),
    markdown: "",
    setMarkdown: (markdown) => set({ markdown }),
}))

export default useAIStore;