<template>
    <div class="text-center">
        <v-divider class="my-4 mx-12"></v-divider>
        <v-pagination v-model="page" size="small" :length="Math.ceil(total / limit)" :total-visible="6"
            show-first-last-page @update:modelValue="goToPage" class="align-center justify-end" active-color="primary"
            rounded="lg">
            <template #next="{ onClick, disabled }">
                <v-btn class="text-capitalize text-weight-bold" rounded="lg" variant="outlined" :disabled="disabled"
                    color="grey" @click="onClick">
                    <span class="text-black">{{ $t("common.action.next") }}</span>
                    <v-icon class="text-black ml-2">mdi-arrow-right</v-icon>
                </v-btn>
            </template>

            <template #prev="{ onClick, disabled }">
                <v-btn class="text-capitalize text-weight-bold" rounded="lg" variant="outlined" :disabled="disabled"
                    color="grey" @click="onClick">
                    <v-icon class="text-black mr-2">mdi-arrow-left</v-icon>
                    <span class="text-black">{{ $t("common.action.previous") }}</span>
                </v-btn>
            </template>

            <template #first="{ onClick, disabled }">
                <v-btn class="text-capitalize text-weight-bold" rounded="lg" variant="text" :disabled="disabled"
                    color="grey" @click="onClick">
                    <span class="text-primary">{{ $t("common.action.first_page") }}</span>
                </v-btn>
            </template>

            <template #last="{ onClick, disabled }">
                <v-btn class="text-capitalize text-weight-bold" rounded="lg" variant="text" :disabled="disabled"
                    color="grey" @click="onClick">
                    <span class="text-primary">{{ $t("common.action.last_page") }}</span>
                </v-btn>
            </template>
        </v-pagination>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineModel } from "vue";

const { t } = useI18n();

const { total, limit, fetchFn } = defineProps({
    total: {
        type: Number,
        required: true,
    },
    limit: {
        type: Number,
        required: true,
    },
    fetchFn: {
        type: Function,
        required: true,
    },
});

const filters = defineModel();

const page = ref(1);

const goToPage = () => {
    filters.value.offset = limit * (page.value - 1);
    filters.value.limit = limit;
    fetchFn();
};
</script>