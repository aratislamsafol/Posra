import { create } from "zustand";
type LocationState = {
  division: string;
  district: string;
  setDivision: (division: string) => void;
  setDistrict: (district: string) => void;
  setLocation: (division: string, district: string) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  division: "Dhaka",
  district: "Dhaka",
  setDivision: (division) => set({ division }),
  setDistrict: (district) => set({ district }),
  setLocation: (division, district) => set({ division, district }),
}));