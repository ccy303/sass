<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-search placeholder="搜索图片、文章、链接"></base-search>
        </base-card>

        <base-card label="不显示按钮">
            <base-search placeholder="搜索图片、文章、链接" :show-search-button="false"></base-search>
        </base-card>

        <base-card label="追加内容">
            <base-search placeholder="搜索图片、文章、链接">
                <template #append>
                    <base-avatar :size="60" src=""></base-avatar>
                </template>
            </base-search>
        </base-card>
    </base-page>
</template>
