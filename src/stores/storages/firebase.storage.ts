import { StateStorage, createJSONStorage } from "zustand/middleware";

const firebaseURL = "https://zustand-st-default-rtdb.firebaseio.com/zustand";

const storageAPI: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    let data = null;

    // eslint-disable-next-line no-useless-catch
    try {
      data = await fetch(`${firebaseURL}/${name}.json`).then((res) =>
        res.json()
      );
    } catch (error) {
      throw error;
    }

    return JSON.stringify(data);
  },
  setItem: async function (name: string, value: string): Promise<void> {
    const data = await fetch(`${firebaseURL}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((res) => res.json());
    return;
  },
  removeItem: function (name: string): void | Promise<void> {
    sessionStorage.removeItem(name);
  },
};

export const firebaseStorage = createJSONStorage(() => storageAPI);
