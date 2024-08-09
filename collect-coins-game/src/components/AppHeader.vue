<template>
    <div class="flex align-items-center justify-content-evenly">
        <div class="card w-9rem md:w-56">
            <label for="dd-points" class="block w-full">Grid size</label>
            <Select v-model="selectedSize" inputId="dd-points" :options="sizes" optionLabel="size" class="w-full" />
        </div>
        <div class="card w-9rem md:w-56">
            <label for="dd-points" class="block w-full">Select points to win</label>
            <Select v-model="selectedPointsToWin" inputId="dd-points" :options="pointsToWin" optionLabel="number" class="w-full" />
        </div>
        <div class="card w-9rem md:w-56">
            <label for="dd-points" class="block w-full">Select points to loose</label>
            <Select v-model="selectedPointsToLose" inputId="dd-points" :options="pointsToLose" optionLabel="number" class="w-full" />
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";

    const selectedPointsToWin = ref();
    const selectedPointsToLose = ref();
    const pointsToWin = ref([
        { number: 10, code: '1' },
        { number: 20, code: '2' },
        { number: 30, code: '3' },
        { number: 40, code: '4' },
        { number: 50, code: '5' }
    ]);

    const pointsToLose = ref([
        { number: 10, code: '1' },
        { number: 20, code: '2' },
        { number: 30, code: '3' },
        { number: 40, code: '4' },
        { number: 50, code: '5' }
    ]);

    const selectedSize = ref();
    const sizes = ref([
        { size: '4x4', code: '1' },
        { size: '5x5', code: '2' },
        { size: '6x6', code: '3' },
    ])
</script>
