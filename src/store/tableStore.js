import { create } from "zustand";

const tableStore = create((set) => ({
    activeIndex: null,
    setActiveIndex: (index) => set({ activeIndex: index }),
    nodes: [],
    setNodes: (nodes) => set({ nodes }),
}))

export default tableStore;