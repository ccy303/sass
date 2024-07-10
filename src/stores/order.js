import { defineStore } from "pinia";
import addresses from "@/http/data/addresses";
import api from "@/http/data";

export const useOrderStore = defineStore('order', {
    state: () => ({ 
        store: {},
        cart: [],
        orderType: "takein",
        address: {},
        addresses: addresses,
        member: {},
        order: {},
     }),
    getters: {
        isLogin: (state) => Object.keys(state.member).length > 0, //是否登录
    },
    actions: {
        async getStore() {
            const store = await api("store");
            // const store = {}
            // commit("SET_STORE", store);
            this.store = store
        },
    },
  })