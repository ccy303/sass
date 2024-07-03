<template>
    <base-page :widthNav="false" status-bar-background="transparent">
        <view class="page-home">
            <view class="logo">
                <text class="name">LF-UI</text>
                <text class="version">0.1.0</text>
            </view>

            <view class="group" v-for="(item, index) in list" :key="index">
                <text class="title">{{ item.label }}</text>

                <view class="list">
                    <view class="item" v-for="(item2, index2) in item.children" :key="index2" @tap="toLink(item2.path)">
                        <text class="label">{{ item2.label }}</text>
                        <base-icon name="arrow-right" color="info"></base-icon>
                    </view>
                </view>
            </view>
        </view>
    </base-page>
</template>

<script setup>
    const list = ref([
        {
            label: "基础组件",
            children: [
                { label: "Button 按钮", path: "/pages/demo/button" },
                { label: "Text 文本", path: "/pages/demo/text" },
                { label: "Image 图片", path: "/pages/demo/image" },
                { label: "Icon 图标", path: "/pages/demo/icon" },
                { label: "Tag 标签", path: "/pages/demo/tag" },
                { label: "Toast 提示", path: "/pages/demo/toast" },
                { label: "Loading 加载", path: "/pages/demo/loading" }
            ]
        },
        {
            label: "表单组件",
            children: [
                { label: "Input 输入框", path: "/pages/demo/input" },
                { label: "InputNumber 计数器", path: "/pages/demo/input-number" },
                { label: "Textarea 文本域", path: "/pages/demo/textarea" },
                { label: "Checkbox 多选框", path: "/pages/demo/checkbox" },
                { label: "Radio 单选框", path: "/pages/demo/radio" },
                { label: "Select 下拉框", path: "/pages/demo/select" },
                { label: "SelectDate 时间选择器", path: "/pages/demo/select-date" },
                { label: "SelectPopup 下拉框弹窗", path: "/pages/demo/select-popup" },
                { label: "SelectCity 城市选择器", path: "/pages/demo/select-city" },
                { label: "Rate 评分", path: "/pages/demo/rate" },
                { label: "Switch 开关", path: "/pages/demo/switch" },
                { label: "Upload 文件上传", path: "/pages/demo/upload" },
                { label: "Form 表单", path: "/pages/demo/form" }
            ]
        },
        {
            label: "视图组件",
            children: [
                { label: "Avatar 头像", path: "/pages/demo/avatar" },
                { label: "Badge 角标", path: "/pages/demo/badge" },
                { label: "Banner 轮播图", path: "/pages/demo/banner" },
                { label: "Card 卡片", path: "/pages/demo/card" },
                { label: "Countdown 倒计时", path: "/pages/demo/countdown" },
                { label: "Divider 分割线", path: "/pages/demo/divider" },
                { label: "Flex 弹性", path: "/pages/demo/flex" },
                { label: "Grid 宫格", path: "/pages/demo/grid" },
                { label: "List 列表", path: "/pages/demo/list" },
                { label: "ListIndex 索引列表", path: "/pages/demo/list-index" },
                { label: "Loadmore 加载更多", path: "/pages/demo/loadmore" },
                { label: "Noticebar 通知栏", path: "/pages/demo/noticebar" },
                { label: "Popup 弹出框", path: "/pages/demo/popup" },
                { label: "Progress 进度条", path: "/pages/demo/progress" },
                { label: "Search 搜索框", path: "/pages/demo/search" },
                { label: "Slider 滑块", path: "/pages/demo/slider" },
                { label: "Tabs 选项卡", path: "/pages/demo/tabs" },
                { label: "Timeline 时间线", path: "/pages/demo/timeline" },
                { label: "Waterfall 瀑布流", path: "/pages/demo/waterfall" },
                { label: "Scroller 滚动条", path: "/pages/demo/scroller" },
                { label: "Skeleton 骨架图", path: "/pages/demo/skeleton" }
            ]
        },
        {
            label: "高级组件",
            children: [
                { label: "ActionSheet 操作菜单", path: "/pages/demo/action-sheet" },
                { label: "Captcha 验证码", path: "/pages/demo/captcha" },
                { label: "Confirm 确认框", path: "/pages/demo/confirm" },
                { label: "Dialog 对话框", path: "/pages/demo/dialog" },
                { label: "FilterBar 过滤栏", path: "/pages/demo/filter-bar" },
                { label: "Page 页面", path: "/pages/demo/page" },
                { label: "Tree 树形", path: "/pages/demo/tree" },
                { label: "Service 服务", path: "/pages/demo/service" }
            ]
        }
    ]);

    const toLink = path => {
        uni.navigateTo({ url: path });
    };
</script>

<style lang="scss" scoped>
    .page-home {
        .logo {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 150rpx 0 100rpx 0;
            height: 60rpx;
            font-weight: bold;

            .name {
                font-size: 80rpx;
                animation: showName 2.5s forwards;
                background: linear-gradient(to right, #6b69f8, #a35df2, #d14bd8);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .version {
                margin-top: 10rpx;
                font-size: 28rpx;
                color: #666;
                animation: showV 2.5s forwards;
            }
        }

        .dd {
            display: flex;
            padding: 50rpx;

            .a {
                flex: 1;
            }
        }

        @keyframes showName {
            from {
                letter-spacing: -40rpx;
                filter: blur(20rpx);
            }

            to {
                letter-spacing: 6rpx;
            }
        }

        @keyframes showV {
            from {
                letter-spacing: -10rpx;
                filter: blur(20rpx);
            }

            to {
                letter-spacing: 1rpx;
            }
        }

        .group {
            padding: 30rpx;

            .title {
                display: block;
                margin-bottom: 20rpx;
                margin-left: 10rpx;
                font-size: 26rpx;
                color: #999;
            }

            .list {
                .item {
                    display: flex;
                    align-items: center;
                    height: 80rpx;
                    padding: 0 30rpx;
                    margin-bottom: 25rpx;
                    background-color: #fff;
                    border-radius: 80rpx;
                    box-shadow: 0 1rpx 8rpx #6666660f;

                    .label {
                        flex: 1;
                        font-size: 28rpx;
                        font-weight: bold;
                    }
                }
            }
        }
    }
</style>
