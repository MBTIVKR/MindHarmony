import create from 'zustand';

interface SidebarStore {
  activeTab: number | undefined;
  setActiveTab: (index: number) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  activeTab: undefined,
  setActiveTab: (index) => set({ activeTab: index }),
}));