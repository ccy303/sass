import { createSSRApp } from "vue";
import * as Pinia from "pinia";
import App from "./App.vue";

import "virtual:uno.css";

export const createApp = () => {
    const app = createSSRApp(App);

    app.use(Pinia.createPinia());

    return {
        app,
        Pinia
    };
};
