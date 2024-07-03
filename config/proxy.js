export const proxy = {
    "/dev/": {
        target: "http://127.0.0.1:8001",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dev/, "")
    },

    "/prod/": {
        target: "https://show.cool-admin.com",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/prod/, "/api")
    }
};
