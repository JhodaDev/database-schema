import { create } from "zustand";

const navigateStore = create((set) => ({
    href: "/dashboard",
    setHref: (href) => set({ href }),
}))

export default navigateStore;
