<template>
    <template v-if="!fileList.length && !disabled">
        <div class="cui-upload" @click="choiceFile">
            <base-icon v-if="fileMediatype == 'image'" name="image" :size="50" :color="'#AC936B'"></base-icon>
            <base-icon v-if="fileMediatype == 'video'" name="play" :size="50" :color="'#AC936B'"></base-icon>
            <view class="cui-upload__icon-add">上传{{ fileMediatype == "image" ? "图片" : "视频" }}</view>
        </div>
    </template>

    <div flex gap-10 flex-wrap v-else>
        <div v-for="(file, idx) in fileList" :key="idx" class="cui-upload">
            <img v-if="fileMediatype == 'image'" class="cui-upload__img-warp" :src="file.thumb" @click.stop="() => previewMedia(idx)" />
            <div v-if="fileMediatype == 'video'" class="cui-upload__video-warp">
                <img class="image" :src="file.thumb" />
                <img v-if="file.status == 'success'" class="play-icon" src="../../../static//play.png" @click="() => previewMedia(idx)" />
            </div>

            <template v-if="!disabled">
                <div class="cui-upload__del-icon" @click.stop="() => del(idx)">
                    <base-icon name="close-border" :size="40" :color="'#fff'"></base-icon>
                </div>
                <div v-if="file.status == 'fail'" class="cui-upload__upload-again" @click.stop="() => uploadAgain(idx)">
                    <base-icon name="refresh" :size="50" :color="'#fff'" />
                </div>
            </template>
        </div>
        <div class="cui-upload" v-if="fileList.length < limit && !disabled" @click="choiceFile">
            <base-icon v-if="fileMediatype == 'image'" name="image" :size="50" :color="'#AC936B'"></base-icon>
            <base-icon v-if="fileMediatype == 'video'" name="play" :size="50" :color="'#AC936B'"></base-icon>
            <view class="cui-upload__icon-add">上传{{ fileMediatype == "image" ? "图片" : "视频" }}</view>
        </div>
    </div>
</template>

<script>
    import { fileUpload } from "@/http/fileUpload";

    export default defineComponent({
        name: "BaseUpload",
        props: {
            modelValue: { default: () => [], type: Array },
            fileMediatype: { default: "image", type: String },
            sourceType: { default: () => ["album", "camera"], type: Array },
            limit: { default: 9, type: Number },
            disabled: { default: false, type: Boolean },
            url: { type: String, default: import.meta.env.VITE_BASE_URL }
        },

        emits: ["update:modelValue"],

        setup(props, { emit }) {
            const fileList = ref([]);

            watch(
                () => props.modelValue,
                data => {
                    for (let i = 0, item; (item = data[i++]); ) {
                        const target = fileList.value.find(it => it.url == item.url);
                        !target && fileList.value.push(item);
                    }
                },
                { immediate: true }
            );

            const choiceFile = () => {
                uni.chooseMedia({
                    count: props.limit,
                    mediaType: [props.fileMediatype],
                    sourceType: props.sourceType,
                    maxDuration: 30,
                    success: async files => {
                        const len = fileList.value.length;
                        const _files = files.tempFiles.slice(0, props.limit - len);
                        for (let i = 0, file; (file = _files[i++]); ) {
                            const { tempFilePath, fileType, thumbTempFilePath } = file;
                            fileUpload(`${props.url}/resource/oss/minappUpload`, "file", tempFilePath)
                                .then(res => {
                                    fileList.value.push({
                                        thumb: fileType == "video" ? thumbTempFilePath : tempFilePath,
                                        url: res.url,
                                        status: "success"
                                    });
                                    onChange();
                                })
                                .catch(err => {
                                    console.log(err);
                                    fileList.value.push({
                                        thumb: fileType == "video" ? thumbTempFilePath : tempFilePath,
                                        url: tempFilePath,
                                        status: "fail"
                                    });
                                });
                        }
                    },
                    fail: () => {},
                    complete: () => {}
                });
            };

            const previewMedia = idx => {
                uni.previewMedia({
                    sources: fileList.value.map(it => ({
                        url: props.fileMediatype == "image" ? it.thumb : it.url,
                        type: props.fileMediatype
                    })),
                    current: idx
                });
            };

            const onChange = () => {
                emit(
                    "update:modelValue",
                    fileList.value.filter(v => v.status === "success")
                );
            };

            const del = idx => {
                const _list = Array.from(fileList.value);
                const [data] = _list.splice(idx, 1);
                fileList.value = _list;
                data.status == "success" && onChange();
            };

            const uploadAgain = async idx => {
                const _list = Array.from(fileList.value);
                const file = _list[idx];
                const res = await fileUpload(`${props.url}/resource/oss/minappUpload`, "file", file.url);
                _list[idx] = { thumb: file.thumb, url: res.url, status: "success" };
                fileList.value = _list;
                onChange();
            };

            return { choiceFile, previewMedia, onChange, del, uploadAgain, fileList };
        }
    });
</script>

<style scoped lang="scss">
    .cui-upload {
        @apply size-100 flex-center flex-col color-#ac936b border-rd-8 border-#AC936B border-1 border-solid box-border relative overflow-hidden;

        &__icon-add {
            @apply font-size-14 mt-10;
        }

        &__upload-again {
            @apply absolute;
        }

        &__del-icon {
            @apply absolute flex-center border-rd-50% top-3 right-3;
            background-color: rgba(0, 0, 0, 0.5);
        }

        &__img-warp {
            @apply size-100%;
        }

        &__video-warp {
            @apply size-100% relative;
            background-color: rgba(0, 0, 0, 0.5);
            .play-icon {
                @apply size-40 absolute top-50% left-50% z-10;
                transform: translate(-50%, -50%);
            }
            .image {
                @apply size-100%;
            }
        }

        .video-warp {
        }
    }
</style>
