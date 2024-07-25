import { create } from "zustand";
import { MarkdownComponente } from "../components/Markdown";

const navigateStore = create((set) => ({
    Component: MarkdownComponente,
    setShowComponent: (component) => set({ Component: component }),
}))

export default navigateStore;
