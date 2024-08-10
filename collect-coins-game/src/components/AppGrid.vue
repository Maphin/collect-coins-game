<template>
    <table v-if="gridSize" class="grid my-4 mx-2">
        <tr v-for="row in gridSize.rowsCount" :key="row" class="grid-row">
            <td v-for="column in gridSize.columnsCount" :key="column" class="grid-cell border-3 border-red-500 w-9rem h-8rem m-1 surface-overlay font-bold flex align-items-center justify-content-center">
                <div v-if="isPlayerHere(row - 1, column - 1)">
                    <Avatar class="p-overlay-badge" image="https://img.icons8.com/?size=100&id=54270&format=png&color=000000" size="xlarge" />
                </div>
            </td>
        </tr>
    </table>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { type IGridSizes } from '../stores/gameSettings'

    const props = defineProps<{
        gridSize: IGridSizes;
        coordinates: Object
    }>()

    const isPlayerHere = (row : number, col : number) => props.coordinates.firstPlayer.y === row && props.coordinates.firstPlayer.x === col;
</script>

<style scoped>
</style>