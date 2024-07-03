export const useNavHeight = () => {
    const height = computed(() => {
        const { statusBarHeight } = uni.getSystemInfoSync();
        return `${statusBarHeight + 44}`;
    });

    return height;
};

// 异步函数执行队列
export class AsyncQueue {
    constructor() {
        this.queue = [];
        this.isRunning = false;
    }

    enqueue(fn) {
        const promise = new Promise((resolve, reject) => {
            this.queue.push(() => fn().then(resolve).catch(reject));
        });
        this.run();
        return promise;
    }

    async run() {
        if (this.isRunning || this.queue.length === 0) {
            return;
        }
        this.isRunning = true;
        const fn = this.queue.shift();
        try {
            await fn();
        } catch (error) {
            console.error("异步队列执行错误", error);
        }
        this.isRunning = false;
        this.run();
    }
}
