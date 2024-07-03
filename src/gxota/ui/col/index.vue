<template>
    <div :class="[classList]" :style="{ 'padding-left': padding, 'padding-right': padding }" @click="tap">
        <slot></slot>
    </div>
</template>

<script>
    import { useTap } from "../../hooks";
    import { getParent } from "../../utils";

    export default defineComponent({
        name: "BaseCol",
        props: {
            // 栅格占据的列数
            span: { type: Number, default: 24 },
            // 栅格左侧的间隔格数
            offset: Number,
            // 栅格向右移动格数
            pull: Number,
            // 栅格向左移动格数
            push: Number
        },

        setup(props, { emit }) {
            // <base-row />
            const parent = getParent("BaseRow", ["gutter"]);
            // 间距
            const padding = computed(() => (parent.value ? parent.value.gutter / 2 + "rpx" : 0));

            // 样式
            const classList = computed(() => {
                let list = ["cui-col"];
                const validProps = ["span", "offset", "pull", "push"];
                validProps.forEach(k => {
                    let value = props[k];
                    if (value || value === 0) {
                        list.push(k !== "span" ? `cui-col-${k}-${value}` : `cui-col-${value}`);
                    }
                });
                return list.join(" ");
            });

            return { classList, parent, padding, ...useTap(emit) };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-col {
        @apply w-100% box-border float-left;

        &::before {
            content: "";
            display: block;
        }
    }

    .cui-col-0 {
        @apply hidden w-0;
    }

    @for $i from 1 through 24 {
        .cui-col-push-#{$i},
        .cui-col-pull-#{$i} {
            position: relative;
        }
    }

    @for $i from 1 through 24 {
        $w: math.div(100%, 24);

        .cui-col-#{$i} {
            width: $w * $i;
        }

        .cui-col-offset-#{$i} {
            margin-left: $w * $i;
        }

        .cui-col-pull-#{$i} {
            right: $w * $i;
        }

        .cui-col-push-#{$i} {
            left: $w * $i;
        }
    }
</style>
