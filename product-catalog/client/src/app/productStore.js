import { create } from "zustand";


let useMyProductStore = create((set) => ({
    myProducts: [],
    addProduct: (product) => set((state) => ({
        myProducts:[...state.myProducts,product]
    })),
    removeProduct: (productId) => set((state) => ({
        myProducts:[...state.myProducts.filter(product => product.id !== productId)]
    }))

}))


export default useMyProductStore