import { create } from "zustand";


const useAIStore = create((set) => ({
    resultSchema: null,
    setResultSchema: (resultSchema) => set({ resultSchema }),
    markdown: "",
    setMarkdown: (markdown) => set({ markdown }),
    activeOption: null,
    setActiveOption: (activeOption) => set({ activeOption }),
    jsonTables: null,
    setJsonTables: (jsonTables) => set({ jsonTables })
}))

export default useAIStore;