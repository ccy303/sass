import path from "path";
import fs from "fs";
export default () => {
    const virtualModuleId = "virtual:ctx";
    const resolvedVirtualModuleId = "\0" + virtualModuleId;
    let pages = [];
    let subPackages = [];
    let isWatch = false;

    const demoPath = path.resolve(__dirname, "../src/pages/demo");
    const demoPageCfg = path.resolve(__dirname, "../src/pages/demo/config.json");

    const readDemoFile = () => {
        const config = JSON.parse(fs.readFileSync(demoPageCfg, "utf-8"));
        const demoPages = [];
        fs.readdirSync(demoPath).map(name => {
            if (name.includes(".vue")) {
                const fileName = name.replace(".vue", "");
                const { style, ...other } = config?.[fileName] || {};
                demoPages.push({ path: `pages/demo/${fileName}`, style: { ...style }, ...other });
            }
        });
        return demoPages;
    };

    const watchDemoFile = () => {
        if (isWatch) {
            return;
        }
        isWatch = true;
        fs.watch(demoPath, eventType => {
            if (eventType == "rename") {
                const tarJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../src/gxota.pages.json"), "utf-8"));

                tarJson.pages.push(...readDemoFile());

                writePageJson(tarJson);
            }
        });
    };

    const writePageJson = json => {
        const pageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../src/pages.json"), "utf-8"));

        if (JSON.stringify(json) == JSON.stringify(pageJson)) {
            return;
        }

        console.log(`重写 pages.json 文件...`);

        fs.writeFileSync(path.resolve(__dirname, "../src/pages.json"), JSON.stringify(json));
    };

    return {
        name: "format-page-json",
        options() {
            console.log("\x1b[32m%s\x1b[0m", "触发format-page-json插件");

            const tarJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../src/gxota.pages.json"), "utf-8"));

            process.env.NODE_ENV == "development" && tarJson.pages.push(...readDemoFile());

            pages = tarJson.pages;
            subPackages = tarJson.subPackages;

            writePageJson(tarJson);

            process.env.NODE_ENV == "development" && watchDemoFile();
        },
        buildStart() {
            this.addWatchFile(path.resolve(__dirname, "../src/gxota.pages.json"));
        },

        resolveId(id) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId;
            }
        },
        load(id) {
            if (id === resolvedVirtualModuleId) {
                return `export const ctx = ${JSON.stringify({ pages, subPackages })}`;
            }
        }
    };
};
