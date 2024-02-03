import { StateCreator } from "zustand";

export interface ConfirmationSlice {
  confirmed: boolean;
  setConfirmed: (confirmed: boolean) => void;
}

export const createConfirmationSlice: StateCreator<ConfirmationSlice> = (
  set
) => ({
  confirmed: false,
  setConfirmed: (confirmed: boolean) => set({ confirmed }),
});
