<template>
    <table v-if="gridSize" class="grid my-4 mx-2">
        <tr v-for="row in gridSize.rowsCount" :key="row" class="grid-row">
            <td v-for="column in gridSize.columnsCount" :key="column" class="grid-cell border-3 border-red-500 w-9rem h-8rem m-1 surface-overlay font-bold flex align-items-center justify-content-center">
                {{ column }}-{{ row }}
            </td>
        </tr>
    </table>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { type IGridSizes } from '../stores/gameSettings'

    const props = defineProps<{
        gridSize: IGridSizes
    }>()


</script>

<style scoped>
</style>