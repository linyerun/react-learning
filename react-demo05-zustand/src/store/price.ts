import { create } from "zustand";

interface PriceStore {
  name: string;
  price: number;
  incPrice: () => void;
  decPrice: () => void;
  resetPrice: () => void;
  getPrice: () => number;
}

// create函数传入一个回调函数,回调函数的参数有get,set然后需要返回一个对象,对象类型就是我们传入的接口类型
// set函数我们返回的对象, 库内部会帮我们做第一层的属性拷贝,eg: {...state, ...我们返回的对象}
const usePriceStore = create<PriceStore>((set, get) => ({
  name: "price",
  price: 0,

  incPrice: () => {
    set((state) => ({
      price: state.price + 1,
    }));
  },

  decPrice: () => {
    set((state) => ({
      price: state.price - 1,
    }));
  },

  resetPrice: () => {
    set(() => ({
      price: 0,
    }));
  },

  getPrice: () => get().price,
}));

export default usePriceStore;
