import { create } from "zustand";
import { PersonSlice, createPersonSlice } from "./person.slice";
import { devtools } from "zustand/middleware";
import { GuestSlice, createGuestSlice } from "./guests.slice";
import { DateSlice, createDateSlice } from "./date.slice";
import {
  ConfirmationSlice,
  createConfirmationSlice,
} from "./confirmation.slice";

type WeddingBoundState = PersonSlice &
  GuestSlice &
  DateSlice &
  ConfirmationSlice;

export const useWeddingBoundStore = create<WeddingBoundState>()(
  devtools((...a) => ({
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
    ...createDateSlice(...a),
    ...createConfirmationSlice(...a),
  }))
);
