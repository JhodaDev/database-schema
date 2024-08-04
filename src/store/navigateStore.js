import { create } from "zustand";
import { MarkdownComponente } from "../components/Markdown";
import { Editor } from "../components/cm/Editor";

const navigateStore = create((set) => ({
    Component: Editor,
    setShowComponent: (component) => set({ Component: component }),
}))

export default navigateStore;
