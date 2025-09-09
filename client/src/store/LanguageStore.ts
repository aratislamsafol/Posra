import { create } from "zustand";

export type Language = {
  code: string;
  name: string;
  flag: string;
};

export const languages: Language[] = [
  {
    code: "EN",
    name: "English",
    flag: "https://i.postimg.cc/L6DLZcnF/Flag-of-the-United-States.png",
  },
  {
    code: "BD",
    name: "Bangla",
    flag: "https://i.postimg.cc/wjBJ5wmy/images.png",
  },
  {
    code: "DE",
    name: "Deutsch",
    flag: "https://i.postimg.cc/W1fZ50G9/Flag-of-Germany-svg.png",
  },
];

type LanguageState = {
  selected: Language;
  setSelected: (lang: Language) => void;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  selected: languages[0],
  setSelected: (lang) => set({ selected: lang }),
}));
