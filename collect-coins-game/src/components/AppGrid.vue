<template>
    <Button @click="startGame" label="Start Game" severity="success" raised class="block mx-auto mt-4"></Button>
    <table v-if="gridSize" class="grid my-4 mx-2">
        <tr v-for="row in gridSize.rowsCount" :key="row" class="grid-row">
            <td 
                v-for="column in gridSize.columnsCount" 
                :key="column" 
                class="grid-cell border-3 border-red-500 w-9rem h-8rem m-1 surface-overlay font-bold flex align-items-center justify-content-center"
            >
                <Avatar
                    v-if="getEntityInCell(row - 1, column - 1)"
                    class="p-overlay-badge"
                    :image="getEntityInCell(row - 1, column - 1)?.image"
                    size="xlarge"
                />
            </td>
        </tr>
    </table>
</template>

<script setup lang="ts">
    import { onBeforeUnmount, watch } from 'vue';
    import { useGameLogic } from '../services/gameLogic';
    import { type IGridSizes, type IPoints } from '../stores/gameSettings'

    const props = defineProps<{
        gridSize: IGridSizes;
        pointsToLose: IPoints;
        pointsToWin: IPoints;
    }>()

    let { startGame, handleKeydown, getEntityInCell } = useGameLogic(props.gridSize, props.pointsToLose, props.pointsToWin);

    watch(() => [props.gridSize, props.pointsToLose, props.pointsToWin],
        ([newGridSize, newPointsToLose, newPointsToWin]) => {
            ({ startGame, handleKeydown, getEntityInCell } = useGameLogic(newGridSize, newPointsToLose, newPointsToWin));
        }, { deep: true }
    );

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', handleKeydown);
    })
    
</script>

<style scoped>
</style>