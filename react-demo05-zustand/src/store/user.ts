import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface User {
  name: string;
  age: number;
  hobby: {
    sing: string;
    dance: string;
    rap: string;
    basketball: string;
  };
  setHobbyRap: (rap: string) => void;
  setHobbyBasketball: (basketball: string) => void;
}

// 创建 store
/*
interface User {
  gourd: {
    oneChild: string;
    twoChild: string;
    threeChild: string;
    fourChild: string;
    fiveChild: string;
    sixChild: string;
    sevenChild: string;
  };
  updateGourd: () => void;
}
const useUserStore = create<User>((set) => ({
  // 初始化葫芦娃状态
  gourd: {
    oneChild: "大娃",
    twoChild: "二娃",
    threeChild: "三娃",
    fourChild: "四娃",
    fiveChild: "五娃",
    sixChild: "六娃",
    sevenChild: "七娃",
  },
  // 更新方法
  updateGourd: () =>
    set((state) => ({
      gourd: {
        ...state.gourd, // 需要手动合并状态(因为zustand只帮我们做第一层属性的拷贝, 可以使用immer解决这个问题)
        oneChild: "大娃-超进化",
      },
    })),
}));
*/

const useUserStore = create<User>()(
  immer((set) => ({
    name: "坤坤",
    age: 18,
    hobby: {
      sing: "坤式唱腔",
      dance: "坤式舞步",
      rap: "坤式rap",
      basketball: "坤式篮球",
    },
    setHobbyRap: (rap: string) =>
      set((state) => {
        state.hobby.rap = rap;
      }),
    setHobbyBasketball: (basketball: string) =>
      set((state) => {
        state.hobby.basketball = basketball;
      }),
  })),
);

export default useUserStore;
