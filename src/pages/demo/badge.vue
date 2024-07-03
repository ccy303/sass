<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-badge :value="16">
                <base-button>消息</base-button>
            </base-badge>
        </base-card>

        <base-card label="自定义内容">
            <base-badge value="NEW">
                <base-button>自定义内容</base-button>
            </base-badge>
        </base-card>

        <base-card label="自定义内容">
            <base-badge :value="132" :max="99">
                <base-button>最大</base-button>
            </base-badge>
        </base-card>

        <base-card label="点形状">
            <base-badge :value="132" is-dot>
                <base-button>点形状</base-button>
            </base-badge>
        </base-card>

        <base-card label="不同样式">
            <base-badge :value="132" plain>
                <base-button>不同样式</base-button>
            </base-badge>
        </base-card>

        <base-card label="不同状态">
            <base-row>
                <base-col :span="6">
                    <base-badge type="primary" is-dot>
                        <base-button>主要</base-button>
                    </base-badge>
                </base-col>

                <base-col :span="6">
                    <base-badge type="success" value="Hot">
                        <base-button>成功</base-button>
                    </base-badge>
                </base-col>

                <base-col :span="6">
                    <base-badge type="error" is-dot>
                        <base-button>失败</base-button>
                    </base-badge>
                </base-col>

                <base-col :span="6">
                    <base-badge type="warning" :value="20">
                        <base-button>警告</base-button>
                    </base-badge>
                </base-col>
            </base-row>
        </base-card>
    </base-page>
</template>
