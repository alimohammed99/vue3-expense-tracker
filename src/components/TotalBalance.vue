<template>
    <div>
        <h4>Your Balance:</h4>
        <h1 id="balance">${{ total }}</h1>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';


// Accepting the total as props
const props = defineProps({
    total: {
        type: Number,
        required: true,
    },
});
</script>
