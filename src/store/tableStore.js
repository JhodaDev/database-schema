import { create } from "zustand";

const tableStore = create((set) => ({
    activeIndex: null,
    setActiveIndex: (index) => set({ activeIndex: index }),
}))

export default tableStore;