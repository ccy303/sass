<template>
  <base-page class="container">
    <div v-if="!Object.keys(order).length" class="flex w-full h-full flex-col justify-center items-center bg-white">
      <image src="/static/images/loading.gif" class="drinks-img"></image>
      <view class="tips flex flex-col items-center font-size-28rpx text-color-assist">
        <view>您还没有点单</view>
        <view>快去犒劳一下自己吧~</view>
      </view>
      <button type="primary" class="drink-btn" size="default" @tap="menu">去点餐</button>
      <view class="font-size-24rpx text-color-primary" @tap="orders">查看历史订单</view>
    </div>
    <template v-else>
      <view class="order-box">
        <view class="bg-white">
          <view class="section">
            <!-- store info begin -->
            <list-cell :hover="false">
              <view class="w-full flex items-center">
                <view class="flex flex-col w-60">
                  <view class="w-full font-size-lg text-color-base text-truncate">{{ order.store.name }}</view>
                </view>
                <view class="flex justify-content-end items-center w-40">
                  <image src="/static/images/order/mobile.png" style="width: 60rpx; height: 60rpx;margin-right: 30rpx;">
                  </image>
                  <image src="/static/images/order/navigation.png" style="width: 60rpx; height: 60rpx;"></image>
                </view>
              </view>
            </list-cell>
            <!-- store info end -->
            <list-cell :hover="false" padding="50rpx 30rpx">
              <view class="w-full flex flex-col">
                <view class="flex items-center justify-center" v-if="order.typeCate == 1">
                  <view class="sort-num">{{ order.sort_num }}</view>
                </view>
                <!-- steps begin -->
                <view class="flex justify-center">
                  <view class="steps flex flex-col"
                    :class="{ 'w-80': order.typeCate == 1, 'w-full': order.typeCate == 2 }">
                    <view class="steps__img-column">
                      <view class="steps__img-column-item">
                        <image src="/static/images/order/ordered_selected.png" v-if="order.status >= 1"></image>
                        <image src="/static/images/order/ordered_selected.png" v-else></image>
                      </view>
                      <view class="steps__img-column-item" :class="{ active: order.status >= 2 }">
                        <image src="/static/images/order/production_selected.png" v-if="order.status >= 2"></image>
                        <image src="/static/images/order/production.png" v-else></image>
                      </view>
                      <view class="steps__img-column-item" :class="{ active: order.status >= 3 }"
                        v-if="order.typeCate == 2">
                        <image src="/static/images/order/delivery_selected.png" v-if="order.status >= 3"></image>
                        <image src="/static/images/order/delivered.png" v-else></image>
                      </view>
                      <view class="steps__img-column-item" :class="{ active: order.status >= 4 }">
                        <image src="/static/images/order/delivered_selected.png" v-if="order.status >= 4"></image>
                        <image src="/static/images/order/delivered.png" v-else></image>
                      </view>
                    </view>
                    <view class="steps__text-column">
                      <view class="steps__text-column-item" :class="{ active: order.status >= 1 }">
                        <view class="steps__column-item-line bg-transparent"></view>
                        <view class="steps__text-column-item-text">已下单</view>
                        <view class="steps__column-item-line"></view>
                      </view>
                      <view class="steps__text-column-item" :class="{ active: order.status >= 2 }">
                        <view class="steps__column-item-line"></view>
                        <view class="steps__text-column-item-text">制作中</view>
                        <view class="steps__column-item-line"></view>
                      </view>
                      <view class="steps__text-column-item" :class="{ active: order.status >= 3 }"
                        v-if="order.typeCate == 2">
                        <view class="steps__column-item-line"></view>
                        <view class="steps__text-column-item-text">配送中</view>
                        <view class="steps__column-item-line"></view>
                      </view>
                      <view class="steps__text-column-item" :class="{ active: order.status >= 4 }">
                        <view class="steps__column-item-line"></view>
                        <view class="steps__text-column-item-text">
                          {{ order.typeCate == 2 ? "已送达" : "请取餐" }}
                        </view>
                        <view class="steps__column-item-line bg-transparent"></view>
                      </view>
                    </view>
                  </view>
                </view>
                <!-- steps end -->
                <view v-if="order.status <= 1"
                  class="flex justify-center items-center font-size-28rpx text-color-assist mb-40rpx"> 您前面还有
                  <text class="text-color-primary mr-10 ml-10">4</text> 单待制作 </view>
                <!-- goods begin -->
                <view class="w-full flex flex-col position-relative mt-30" style="margin-bottom: -40rpx;">
                  <view class="w-full flex items-center mb-40rpx" v-for="(good, index) in order.goods" :key="index">
                    <view class="flex flex-col w-60 overflow-hidden">
                      <view class="font-size-lg text-color-base mb-10 text-truncate">{{ good.name }}</view>
                      <view class="font-size-24rpx text-color-assist text-truncate">{{ good.property }}</view>
                    </view>
                    <view class="flex w-40 items-center justify-content-between pl-30rpx">
                      <view class="font-size-28rpx text-color-base">x{{ good.number }}</view>
                      <view class="font-size-28rpx text-color-base font-bold">￥{{ good.price }}</view>
                    </view>
                  </view>
                </view>
                <!-- goods end -->
              </view>
            </list-cell>
          </view>
          <view class="section">
            <!-- payment and amount begin -->
            <list-cell :hover="false" padding="50rpx 30rpx">
              <view class="w-full flex flex-col">
                <view class="pay-cell">
                  <view>支付方式</view>
                  <view class="font-bold">{{ order.pay_mode }}</view>
                </view>
                <view class="pay-cell">
                  <view>金额总计</view>
                  <view class="font-bold">￥{{ order.amount }}</view>
                </view>
              </view>
            </list-cell>
            <!-- payment and amount end -->
          </view>
          <view class="section">
            <!-- order info begin -->
            <list-cell :hover="false" padding="50rpx 30rpx">
              <view class="w-full flex flex-col">
                <view class="pay-cell">
                  <view>下单时间</view>
                  <view class="font-bold">{{ $util.formatDateTime(order.created_at) }}</view>
                </view>
                <view class="pay-cell">
                  <view>下单门店</view>
                  <view class="font-bold">{{ order.store.name }}</view>
                </view>
                <view class="pay-cell">
                  <view>支付方式</view>
                  <view class="font-bold">{{ order.pay_mode }}</view>
                </view>
                <view class="pay-cell">
                  <view>订单号</view>
                  <view class="font-bold">{{ order.order_no }}</view>
                </view>
              </view>
            </list-cell>
            <!-- order info end -->
          </view>
          <!-- order other info begin -->
          <list-cell :hover="false" padding="50rpx 30rpx 20rpx" last>
            <view class="w-full flex flex-col">
              <view class="pay-cell">
                <view>取单号</view>
                <view class="font-bold">{{ order.sort_num }}</view>
              </view>
              <view class="pay-cell">
                <view>享用方式</view>
                <view class="font-bold">自取</view>
              </view>
              <view class="pay-cell">
                <view>取餐时间</view>
                <view class="font-bold">立即取餐</view>
              </view>
              <view class="pay-cell">
                <view>完成制作时间</view>
                <view class="font-bold">{{ order.productioned_time }}</view>
              </view>
              <view class="pay-cell">
                <view>备注</view>
                <view class="font-bold">{{ order.postscript }}</view>
              </view>
            </view>
          </list-cell>
          <!-- order other info end -->
        </view>
      </view>
    </template>
  </base-page>
</template>

<script setup>
import listCell from "./list-cell/list-cell.vue";
import { useOrderStore } from "@/stores/order";


const orderStore = useOrderStore();
const order = computed(() => {
  return orderStore.order
})

const orders = () => {
  // if (!orderStore.isLogin) {
  //   uni.navigateTo({ url: "/pages/login/login" });
  //   return;
  // }
  uni.navigateTo({
    url: "/subPages/orders/orders",
  });
}
const menu = () => {
  uni.switchTab({
    url: "/pages/menu/menu",
  });
}

</script>


<style lang="scss" scoped>
/* #ifdef H5 */
page {
  min-height: 100%;
  background-color: $bg-color;
}

/* #endif */
.order-box {
  padding: 20rpx;
  /* #ifdef H5 */
  margin-bottom: 100rpx;
  /* #endif */
}

.drinks-img {
  width: 260rpx;
  height: 260rpx;
}

.tips {
  margin: 60rpx 0 80rpx;
  line-height: 48rpx;
}

.drink-btn {
  width: 320rpx;
  border-radius: 50rem !important;
  margin-bottom: 40rpx;
  font-size: 28rpx;
  line-height: 3;
}

@mixin arch {
  content: "";
  position: absolute;
  background-color: $bg-color;
  width: 30rpx;
  height: 30rpx;
  bottom: -15rpx;
  z-index: 10;
  border-radius: 100%;
}

.section {
  position: relative;

  &::before {
    @include arch;
    left: -15rpx;
  }

  &::after {
    @include arch;
    right: -15rpx;
  }
}

.pay-cell {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 28rpx;
  color: $text-color-base;
  margin-bottom: 40rpx;

  &:nth-last-child(1) {
    margin-bottom: 0;
  }
}

.sort-num {
  font-size: 64rpx;
  font-weight: bold;
  color: $text-color-base;
  line-height: 2;
}

.steps__img-column {
  display: flex;
  margin: 30rpx 0;

  .steps__img-column-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    image {
      width: 80rpx;
      height: 80rpx;
    }
  }
}

.steps__text-column {
  display: flex;
  margin-bottom: 40rpx;

  .steps__text-column-item {
    flex: 1;
    display: inline-flex;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    color: $text-color-assist;

    &.active {
      color: $text-color-base;
      font-weight: bold;

      .steps__column-item-line {
        background-color: $text-color-base;
      }
    }

    .steps__column-item-line {
      flex: 1;
      height: 2rpx;
      background-color: #919293;
      transform: scaleY(0.5);
    }

    .steps__text-column-item-text {
      margin: 0 8px;
    }
  }
}</style>
