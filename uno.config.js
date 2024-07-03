import { defineConfig, transformerDirectives, transformerVariantGroup } from "unocss";
import { presetUni } from "@uni-helper/unocss-preset-uni";
import presetRemToPx from "@unocss/preset-rem-to-px";

let presets;

if (process.env.UNI_PLATFORM == "h5") {
    presets = [presetUni(), presetRemToPx({ baseFontSize: 4 })];
} else if (process.env.UNI_UTS_PLATFORM == "mp-weixin") {
    presets = [presetUni({ remRpx: { baseFontSize: 4, mode: "rem2rpx", screenWidth: 375 } })];
}

export default defineConfig({
    presets,
    shortcuts: [
        ["flex-center", "flex flex-items-center flex-justify-center"],
        ["absolute-center", "absolute left-50% translate-x--50%"],
        ["flex-direction-col", "flex flex-col"],
        [/^border-rd-top-(.*)$/, ([, size]) => `border-rd-lt-${size} border-rd-rt-${size}`]
    ],
    rules: [
        [
            /^uno-text-ellipsis-(\d+)$/,
            ([, line]) => ({
                "text-overflow": "ellipsis",
                "-webkit-box-orient": "vertical",
                "-webkit-line-clamp": line,
                overflow: "hidden",
                display: "-webkit-box"
            })
        ]
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()]
});
