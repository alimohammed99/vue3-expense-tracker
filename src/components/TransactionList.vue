<template>
  <div>
    <h3>History</h3>
    <ul class="list" id="list">
      <li
        v-for="transaction in transactions"
        :key="transaction.id"
        :class="{
          plus: transaction.amount > 0,
          minus: transaction.amount < 0,
        }"
      >
        {{ transaction.text }}
        <span>
          {{ transaction.amount > 0 ? "+" : "-" }}${{ Math.abs(transaction.amount) }}
        </span>
        <button class="delete-btn">X</button>
      </li>
    </ul>
  </div>
</template>


<style scoped>
.plus {
  color: green;
}

.minus {
  color: red;
}
</style>

<script setup>
import { defineProps } from "vue";

// Accepting the transactions as props
const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});
</script>
