<template>
    <div class="flex align-items-center justify-content-evenly">
        <div class="card flex align-items-center justify-content-center">
        <FloatLabel class="w-9rem md:w-56">
            <label for="dd-points" class="block w-full">Grid size</label>
            <Select v-model="selectedSize" inputId="dd-points" :options="sizes" optionLabel="size" class="w-full" />
        </FloatLabel>
    </div>
        <div class="card flex align-items-center justify-content-center">
        <FloatLabel class="w-9rem md:w-56">
            <label for="dd-points" class="block w-full">Select points to win</label>
            <Select v-model="selectedPoints" inputId="dd-points" :options="points" optionLabel="number" class="w-full" />
        </FloatLabel>
    </div>
    <div class="card flex align-items-center justify-content-center">
        <FloatLabel class="w-9rem md:w-56">
            <label for="dd-points" class="block w-full">Select points to loose</label>
            <Select v-model="selectedPoints" inputId="dd-points" :options="points" optionLabel="number" class="w-full" />
        </FloatLabel>
    </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Select from 'primevue/select';


const selectedPoints = ref();
const points = ref([
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
