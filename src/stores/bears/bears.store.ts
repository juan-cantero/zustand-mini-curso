import  { create } from 'zustand';

interface Bear {
    id: number;
    name: string;
}

interface BearState {
    blackBears: number;
    polarBears: number;
    pandaBears: number;
    bears: Bear[];
    computed: {
        totalBears: number;
    },
    increaseBlackBears: (by: number) => void;
     increasePolarBears: (by: number) => void;
     increasePandaBears: (by: number) => void;


     doNothing: () => void;

     addBear: () => void;
     clearBears: () => void;


}

export const useBearStore = create<BearState>()((set,get) => ({
    blackBears: 0,
    polarBears: 0,
    pandaBears: 0,
    bears: [{ id: 1, name: 'Black' }, { id: 2, name: 'Polar' }, { id: 3, name: 'Panda' }],
    increaseBlackBears: (by) => set((state) => ({ blackBears: state.blackBears + by })),
    increasePolarBears: (by) => set((state) => ({ polarBears: state.polarBears + by })),
    increasePandaBears: (by) => set((state) => ({ pandaBears: state.pandaBears + by })),

    doNothing: () => set((state) => ({bears: [...state.bears]})),
    
    clearBears: () => set((state) => ({ bears: [] })),

    addBear: () => set((state) => ({ bears: [...state.bears, { id: 4, name: 'Bear' }] })),

    computed: {
        get totalBears() {
            return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
        }    
    }
    

}))