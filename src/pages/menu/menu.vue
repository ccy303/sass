<template>
    <view class="relative overflow-hidden pt-162rpx bg-white h-100vh" v-if="!loading">
        <view class="w-full h-full relative flex flex-col" v-if="goods.length">
            <view class="nav w-full h-137rpx flex-shrink-0 flex flex-col">
                <view class="header w-full flex items-center justify-between p-20rpx bg-#fffff h-140rpx">
                    <view class="left flex-1 flex flex-col" v-if="orderStore.orderType == 'takein'">
                        <view class="store-name flex justify-start items-center font-size-28rpx mb-10rpx">
                            <text @tap="goToShopList">{{ orderStore.address.shopName ? orderStore.address.shopName : '请选择店铺' }}</text>
                            <view class="iconfont iconarrow-right ml-10rpx line-height-100%"></view>
                        </view>
                        <view class="store-location flex justify-start items-center c-#919293 font-size-24rpx">
                            <image src="/static/images/order/location.png" style="width: 30rpx; height: 30rpx" class="mr-10"></image>
                            <text>距离您 {{ orderStore.store.distance_text }}</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="content flex-1 overflow-hidden w-full flex">
                <scroll-view class="menus w-200rpx h-full overflow-hidden bg-#f5f5f5" :scroll-into-view="menuScrollIntoView" scroll-with-animation scroll-y>
                    <view class="wrapper w-full h-full">
                        <view
                            class="menu flex items-center justify-start py-30rpx px-20rpx font-size-26rpx c-#919293 relative"
                            :id="`menu-${item.id}`"
                            :class="{ current: item.id === currentCateId }"
                            v-for="(item, index) in goods"
                            :key="index"
                            @tap="handleMenuTap(item.id)"
                        >
                            <text>{{ item.name }}</text>
                            <view class="dot absolute w-34rpx h-34rpx line-height-34rpx font-size-22rpx bg-#6b69f8 c-#ffffff top-16rpx right-10rpx b-rd-100% text-align-center" v-show="menuCartNum(item.id)">{{ menuCartNum(item.id) }}</view>
                        </view>
                    </view>
                </scroll-view>
                <!-- goods list begin -->
                <scroll-view class="goods flex-1 h-full overflow-hidden bg-#ffffff" scroll-with-animation scroll-y :scroll-top="cateScrollTop" @scroll="handleGoodsScroll">
                    <view class="wrapper w-full h-full p-20rpx">
                        <view class="list w-full font-size-28rpx pb-120rpx">
                            <!-- category begin -->
                            <view class="category w-full" v-for="(item, index) in goods" :key="index" :id="`cate-${item.id}`">
                                <view class="title py-30rpx px-0 flex items-center c-#5a5b5c">
                                    <text>{{ item.name }}</text>
                                    <image :src="item.icon" class="icon w-38rpx h-38rpx ml-10rpx"></image>
                                </view>
                                <view class="items flex flex-col pb--30rpx">
                                    <!-- 商品 begin -->
                                    <view class="good flex items-center mb-30rpx" v-for="(_good, key) in item.goods" :key="key">
                                        <image :src="_good.images" class="image w-160rpx h-160rpx mr-20rpx b-rd-4" @tap="showGoodDetailModal(item, _good)"></image>
                                        <view class="right flex-1 h-160rpx overflow-hidden flex flex-col items-start justify-between pr-14rpx">
                                            <text class="name font-size-28rpx mb-10rpx">{{ _good.name }}</text>
                                            <text class="tips w-full h-40rpx line-height-40rpx overflow-hidden text-ellipsis whitespace-nowrap font-size-24rpx mb-10rpx">{{ _good.content }}</text>
                                            <view class="price_and_action w-full flex justify-between items-center">
                                                <view>
                                                    <text class="font-size-28rpx font-600">￥{{ _good.discountPrice / 100 }}</text>
                                                    <text class="font-size-26rpx line-through">￥{{ _good.originalPrice / 100 }}</text>
                                                </view>
                                                <view class="btn-group flex justify-between items-center relative" v-if="_good.attrs.length > 0">
                                                    <button
                                                        type="primary"
                                                        class="btn property_btn py-0 px-20rpx box-border font-size-24rpx h-44rpx line-height-44rpx b-rd-24rpx"
                                                        hover-class="none"
                                                        size="mini"
                                                        @tap="showGoodDetailModal(item, _good)"
                                                    >
                                                        选规格
                                                    </button>
                                                    <view class="dot" v-show="goodCartNum(_good.id)">{{ goodCartNum(_good.id) }}</view>
                                                </view>
                                                <view class="btn-group flex justify-between items-center relative" v-else>
                                                    <button
                                                        type="default"
                                                        v-show="goodCartNum(_good.id)"
                                                        plain
                                                        class="btn reduce_btn py-0 px-20rpx box-border font-size-24rpx h-44rpx line-height-44rpx p-0 w-44rpx b-rd-44rpx"
                                                        size="mini"
                                                        hover-class="none"
                                                        @tap="handleReduceFromCart(item, _good)"
                                                    >
                                                        <view class="iconfont iconsami-select"></view>
                                                    </button>
                                                    <view class="number" v-show="goodCartNum(_good.id)">{{ goodCartNum(_good.id) }}</view>
                                                    <button
                                                        type="primary"
                                                        class="btn add_btn py-0 px-20rpx box-border font-size-24rpx h-44rpx line-height-44rpx p-0 w-44rpx b-rd-44rpx"
                                                        size="min"
                                                        hover-class="none"
                                                        @tap="handleAddToCart(item, _good, 1)"
                                                    >
                                                        <view class="iconfont iconadd-select"></view>
                                                    </button>
                                                </view>
                                            </view>
                                        </view>
                                    </view>
                                    <!-- 商品 end -->
                                </view>
                            </view>
                            <!-- category end -->
                        </view>
                    </view>
                </scroll-view>
                <!-- goods list end -->
            </view>
            <!-- content end -->
            <!-- 购物车栏 begin -->
            <view class="cart-box absolut bottom-30rpx left-30rpx right-30rpx h-96rpx b-rd-48rpx  bg-white flex items-center justify-between z-9999" v-if="cart.length > 0">
                <view class="mark pl-46rpx mr-30rpx relative">
                    <image src="/static/images/menu/cart.png" class="cart-img w-96rpx h-96rpx relative mt--48" @tap="openCartPopup"></image>
                    <view class="tag bg-#fab714 c-white flex justify-center items-center font-size-24rpx absolute right--10rpx top--50rpx b-rd-10% p-4rpx w-40rpx h-40rpx opacity-90">{{ getCartGoodsNumber }}</view>
                </view>
                <view class="price flex-1">￥{{ getCartGoodsPrice }}</view>
                <button type="primary" class="pay-btn h-full py-0 px-30rpx c-white b-rd-r-50rpx b-rd-b-50rpx flex items-center font-size-28rpx" @tap="toPay" :disabled="disabledPay">
                    {{ disabledPay ? `差${spread}元起送` : "去结算" }}
                </button>
            </view>
            <!-- 购物车栏 end -->
        </view>
        <!-- 商品详情模态框 begin -->
        <base-dialog v-model="goodDetailModalVisible" class="good-detail-modal" color="#5A5B5C" width="90%" custom padding="0rpx" radius="12rpx">
            <view class="cover h-320rpx py-30rpx flex justify-center items-center relative">
                <image v-if="good.images" :src="good.images" class="image w-260rpx h-260rpx"></image>
                <view class="btn-group absolute right-10 top-0 flex items-center justify-around">
                    <!-- <image class="w-80rpx h-80rpx" src="/static/images/menu/share-good.png"></image> -->
                    <image class="w-80rpx h-80rpx" src="/static/images/menu/close.png" @tap="closeGoodDetailModal"></image>
                </view>
            </view>
            <scroll-view class="detail w-full min-h-1vh " scroll-y>
                <view class="wrapper w-full h-full overflow-hidden">
                    <view class="basic pr-20rpx pb-30rpx pl-30rpx flex flex-col">
                        <view class="name font-size-28rpx mb-10rpx">{{ good.name }}</view>
                        <view class="tips font-size-24rpx c-#878889">{{ good.content }}</view>
                    </view>
                    <view class="properties w-full b-t-2rpx b-t-solid b-t-#878889 pt-10rpx pl-30rpx flex flex-col" v-if="good.use_property">
                        <view class="property w-full flex flex-col mb-30rpx pb--16rpx" v-for="(item, index) in good.attrs" :key="index">
                            <view class="title w-full flex justify-start items-center mb-20rpx">
                                <text class="name font-size-26rpx c-#5a5b5c mr-20rpx">{{ item.name }}</text>
                                <view class="desc flex-1 font-size-24rpx c-#ad8838 overflow-hidden text-ellipsis whitespace-nowrap" v-if="item.desc">({{ item.desc }})</view>
                            </view>
                            <view class="values w-full flex flex-wrap">
                                <view
                                    class="value b-rd-8rpx bg-#f5f5f5 py-16rpx px-30rpx font-size-26rpx mr-16rpx mb-16rpx"
                                    v-for="(value, key) in item.values"
                                    :key="key"
                                    :class="{ default: value.is_default }"
                                    @tap="changePropertyDefault(index, key)"
                                >
                                    {{ value.value }}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
            <view class="action flex items-center justify-between bg-#f5f5f5 h-120rpx px-26rpx">
                <view class="left flex-1 flex flex-col justify-center mr-20rpx overflow-hidden">
                    <view class="price font-size-32rpx c-#5a5b5c">￥{{ good.discountPrice / 100 }}</view>
                    <view class="props font-size-24rpx w-full overflow-hidden text-ellipsis whitespace-nowrap" v-if="getGoodSelectedProps(good)">
                        {{ getGoodSelectedProps(good) }}
                    </view>
                </view>
                <view class="btn-group flex items-center justify-around">
                    <button type="default" plain class="btn p-0 font-size-28rpx w-44rpx h-44rpx line-height-44rpx b-rd-100%" size="mini" hover-class="none" @tap="handlePropertyReduce">
                        <view class="iconfont iconsami-select"></view>
                    </button>
                    <view class="number font-size-28rpx w-44rpx h-44rpx line-height-44rpx text-center">{{ good.number }}</view>
                    <button type="primary" class="btn p-0 font-size-28rpx w-44rpx h-44rpx line-height-44rpx b-rd-100%" size="min" hover-class="none" @tap="handlePropertyAdd">
                        <view class="iconfont iconadd-select"></view>
                    </button>
                </view>
            </view>
            <view class="add-to-cart-btn flex justify-center items-center bg-#6b69f8 c-white font-size-28rpx h-80rpx b-rd-b-12rpx" @tap="handleAddToCartInModal">
                <view>加入购物车</view>
            </view>
        </base-dialog>
        <!-- 商品详情模态框 end -->
        <!-- 购物车详情popup -->
        <base-popup direction="bottom" v-model="cartPopupVisible"  class="cart-popup">
            <!-- <template v-slot:content> -->
                <view class="top py-10rpx px-30rpx font-size-24rpx text-align-right">
                    <text @tap="handleCartClear">清空</text>
                </view>
                <scroll-view class="cart-list bg-white w-full overflow-hidden min-h-1vh max-h-60vh" scroll-y>
                    <view class="wrapper h-full flex flex-col py-0 px-30 mb-156rpx">
                        <view class="item flex justify-between items-center py-30rpx px-0 relative" v-for="(item, index) in cart" :key="index">
                            <view class="left flex-1 flex flex-col overflow-hidden mr-30rpx">
                                <view class="name font-size-24rpx">{{ item.name }}</view>
                                <view class="props font-size-24rpx overflow-hidden text-ellipsis whitespace-nowrap">{{ item.props_text }}</view>
                            </view>
                            <view class="center mr-120rpx font-size-24rpx">
                                <text>￥{{ item.price }}</text>
                            </view>
                            <view class="right flex items-center justify-between">
                                <button type="default" plain size="mini" class="btn w-46rpx h-46rpx b-rd-100% p-0 text-center line-height-46rpx" hover-class="none" @tap="handleCartItemReduce(index)">
                                    <view class="iconfont iconsami-select"></view>
                                </button>
                                <view class="number font-size-24rpx w-46rpx h-46rpx text-center line-height-46rpx">{{ item.number }}</view>
                                <button type="primary" class="btn w-46rpx h-46rpx b-rd-100% p-0 text-center line-height-46rpx" size="min" hover-class="none" @tap="handleCartItemAdd(index)">
                                    <view class="iconfont iconadd-select"></view>
                                </button>
                            </view>
                        </view>
                        <view class="item" v-if="orderStore.orderType == 'takeout' && orderStore.store.packing_fee">
                            <view class="left">
                                <view class="name">包装费</view>
                            </view>
                            <view class="center">
                                <text>￥{{ parseFloat(orderStore.store.packing_fee) }}</text>
                            </view>
                            <view class="right invisible">
                                <button type="default" plain size="mini" class="btn" hover-class="none">
                                    <view class="iconfont iconsami-select"></view>
                                </button>
                                <view class="number">1</view>
                                <button type="primary" class="btn" size="min" hover-class="none">
                                    <view class="iconfont iconadd-select"></view>
                                </button>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            <!-- </template> -->
        </base-popup>
        <!-- 购物车详情popup -->
    </view>
    <view class="loading w-full h-full flex items-center justify-center" v-else>
        <image class="w-260rpx h-260rpx relative mt--200rpx" src="/static/images/loading.gif"></image>
    </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { useOrderStore } from "@/stores/order";
import { getCategoryHomeList } from "@/http/goods";

const orderStore = useOrderStore();

const goods = ref([]);
const loading = ref(true);
const currentCateId = ref(6905);
const cateScrollTop = ref(0);
const menuScrollIntoView = ref("");
const cart = ref([]);
const goodDetailModalVisible = ref(false);
const good = ref({});
const category = ref({});
const cartPopupVisible = ref(false);
const sizeCalcState = ref(false);

onLoad(async () => {
    await init();
})

const goodCartNum = computed(() => {
    //计算单个饮品添加到购物车的数量
    return id =>
        cart.value.reduce((acc, cur) => {
            if (cur.id === id) {
                return (acc += cur.number);
            }
            return acc;
        }, 0);
});

const menuCartNum = computed(() => {
    return id =>
        cart.value.reduce((acc, cur) => {
            if (cur.cate_id === id) {
                return (acc += cur.number);
            }
            return acc;
        }, 0);
});

const getCartGoodsNumber = computed(() => {
    //计算购物车总数
    return cart.value.reduce((acc, cur) => acc + cur.number, 0);
});
const getCartGoodsPrice = computed(() => {
    //计算购物车总价
    return cart.value.reduce((acc, cur) => acc + cur.number * cur.price, 0);
});

const disabledPay = computed(() => {
    //是否达到起送价
    return orderStore.orderType == "takeout" && getCartGoodsPrice.value < orderStore.store.min_price ? true : false;
});
const spread = computed(() => {
    //差多少元起送
    if (orderStore.orderType != "takeout") return;
    return parseFloat((orderStore.store.min_price - getCartGoodsPrice.value).toFixed(2));
});

const init = async () => {
    //页面初始化
    loading.value = true;
    await orderStore.getStore();
    // goods.value = await $api("goods");
    try {
        const res = await getCategoryHomeList()
        goods.value = res || []
    } catch (error) {
        console.log(error)
    }
    loading.value = false;
    cart.value = uni.getStorageSync("cart") || [];
};

const takein = () => {
    orderStore.setOrderType('takein')
}

const takout = () => {
    if (orderStore.orderType == "takeout") return;

    // 没登录先去登录
    // if (!orderStore.isLogin) {
    //     uni.navigateTo({ url: "/pages/login/login" });
    //     return;
    // }

    uni.navigateTo({
        url: "/pages/address/address?is_choose=true"
    });
};
const handleMenuTap = id => {
    //点击菜单项事件
    // if (!sizeCalcState.value) {
    //     calcSize();
    // }

    currentCateId.value = id;
    nextTick(() => {
        cateScrollTop.value = goods.value.find(item => item.id == id).top
    });
};
const handleGoodsScroll = ({ detail }) => {

    //商品列表滚动事件
    // if (!sizeCalcState.value) {
    //     calcSize();
    // }
    const { scrollTop } = detail;
    let tabs = goods.value.filter(item => item.top <= scrollTop).reverse();
    if (tabs.length > 0) {
        currentCateId.value = tabs[0].id;
    }
};

const handleAddToCart = (cate, good, num) => {
    //添加到购物车
    const index = cart.value.findIndex(item => {
        if (good.use_property) {
            return item.id === good.id && item.props_text === good.props_text;
        } else {
            return item.id === good.id;
        }
    });
    if (index > -1) {
        cart.value[index].number += num;
    } else {
        cart.value.push({
            id: good.id,
            cate_id: cate.id,
            name: good.name,
            price: good.originalPrice / 100,
            number: num,
            image: good.images,
            use_property: good.use_property,
            props_text: good.props_text,
            props: good.props
        });
    }
};
const handleReduceFromCart = (item, good) => {
    const index = cart.value.findIndex(item => item.id === good.id);
    cart.value[index].number -= 1;
    if (cart.value[index].number <= 0) {
        cart.value.splice(index, 1);
    }
};
const showGoodDetailModal = (item, _good) => {
    good.value = JSON.parse(JSON.stringify({ ..._good, number: 1 }));

    category.value = JSON.parse(JSON.stringify(item));
    goodDetailModalVisible.value = true;
};
const closeGoodDetailModal = () => {
    //关闭饮品详情模态框
    goodDetailModalVisible.value = false;
    category.value = {};
    good.value = {};
};
const changePropertyDefault = (index, key) => {
    //改变默认属性值
    good.value.property[index].values.forEach(value => value.is_default = 0);
    good.value.property[index].values[key].is_default = 1;
    good.value.number = 1;
};
const getGoodSelectedProps = (good, type = "text") => {
    //计算当前饮品所选属性
    if (good.use_property) {
        let props = [];
        good.property.forEach(({ values }) => {
            values.forEach(value => {
                if (value.is_default) {
                    props.push(type === "text" ? value.value : value.id);
                }
            });
        });
        return type === "text" ? props.join("，") : props;
    }
    return "";
};
const handlePropertyAdd = () => {
    good.value.number += 1;
};
const handlePropertyReduce = () => {
    if (good.value.number === 1) return;
    good.value.number -= 1;
};
const handleAddToCartInModal = () => {
    const product = Object.assign({}, good.value, {
        props_text: getGoodSelectedProps(good.value),
        props: getGoodSelectedProps(good.value, "id")
    });
    handleAddToCart(category.value, product, good.value.number);
    closeGoodDetailModal();
};
const openCartPopup = () => {
    //打开/关闭购物车列表popup
    console.log('打开/关闭购物车列表popup', cartPopupVisible.value)
    cartPopupVisible.value = !cartPopupVisible.value;
};
const handleCartClear = () => {
    //清空购物车
    uni.showModal({
        title: "提示",
        content: "确定清空购物车么",
        success: ({ confirm }) => {
            if (confirm) {
                cartPopupVisible.value = false;
                cart.value = [];
            }
        }
    });
};
const handleCartItemAdd = index => {
    cart.value[index].number += 1;
};
const handleCartItemReduce = index => {
    if (cart.value[index].number === 1) {
        cart.value.splice(index, 1);
    } else {
        cart.value[index].number -= 1;
    }
    if (!cart.value.length) {
        cartPopupVisible.value = false;
    }
};
const toPay = () => {
    // if (!orderStore.isLogin) {
    //     uni.navigateTo({ url: "/subPages/login/index" });
    //     return;
    // }

    uni.showLoading({ title: "加载中" });
    uni.setStorageSync("cart", JSON.parse(JSON.stringify(cart.value)));

    uni.navigateTo({
        url: "/subPages/pay/pay"
    });
    uni.hideLoading();
};

const goToShopList = () => {
    uni.navigateTo({
        url: '/subPages/orders/address?is_choose=true'
    })
}
</script>

<style lang="scss" scoped>
@import "~@/pages/menu/menu.scss";
</style>
