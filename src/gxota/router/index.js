import { last } from "lodash-es";
import { ctx } from "virtual:ctx";

const routes = [...ctx.pages];

// 子包
if (ctx.subPackages) {
    ctx.subPackages.forEach(a => {
        a.pages.forEach(b => {
            routes.push({ ...a, ...b, path: a.root + "/" + b.path });
        });
    });
}

const globalStyle = ctx.globalStyle || {};

const router = {
    // 当前页
    currentPage() {
        return last(getCurrentPages());
    },

    routes,
    globalStyle,

    // 当前路由信息
    info() {
        const page = this.currentPage();

        if (page) {
            const { route, $page, $vm, $getAppWebview } = page;

            const q = {};
            try {
                $page?.fullPath
                    .split("?")?.[1]
                    ?.split("&")
                    ?.forEach(e => {
                        const [k, v] = e.split("=");
                        q[k] = decodeURIComponent(v);
                    });
            } catch (e) {
                console.log("error", e);
            }

            // 页面配置
            const attrs = this.routes.find(e => e.path == route);

            let d = {
                $vm,
                $getAppWebview,
                path: `/${route}`,
                fullPath: $page?.fullPath,
                query: q || {},
                attrs
            };

            return d;
        } else {
            return null;
        }
    }
};

export { router };
