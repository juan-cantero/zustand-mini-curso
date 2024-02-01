import { StateCreator, create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { firebaseStorage } from "../storages/firebase.storage";

interface PersonState {
  firstName: string;
  lastName: string;

  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

const storeAPI: StateCreator<PersonState, [["zustand/devtools", never]]> = (
  set
) => ({
  firstName: "",
  lastName: "",
  setFirstName: (firstName: string) =>
    set({ firstName }, false, "setFirstName"),
  setLastName: (lastName: string) => set({ lastName }, false, "setLastName"),
});

export const usePersonStore = create<PersonState>()(
  devtools(
    persist(storeAPI, {
      name: "person-storage",
      storage: firebaseStorage,
    })
  )
);
