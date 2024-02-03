import { StateCreator } from "zustand";

export interface DateSlice {
  eventDate: Date;
  eventYYYYMMDD: () => string;
  eventHHMM: () => string;
  setEventDate: (parcialDate: string) => void;
  setEventTime: (parcialTime: string) => void;
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
  eventDate: new Date(),

  eventYYYYMMDD: () => {
    return get().eventDate.toISOString().split("T")[0];
  },

  eventHHMM: () => {
    return (
      get().eventDate.getHours().toString().padStart(2, "0") +
      ":" +
      get().eventDate.getMinutes().toString().padStart(2, "0")
    );
  },

  setEventDate: (parcialDate: string) =>
    set((state) => {
      const date = new Date(parcialDate);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate() + 1;

      const newDate = new Date(state.eventDate);
      newDate.setFullYear(year, month, day);

      return {
        eventDate: newDate,
      };
    }),

  setEventTime: (parcialTime: string) => {
    const [hours, minutes] = parcialTime.split(":");
    const date = new Date(get().eventDate);
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    set({ eventDate: date });
  },
});
