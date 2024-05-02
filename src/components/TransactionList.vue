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
        <button @click="deleteTransaction(transaction.id)" class="delete-btn">X</button>
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

// Since I need to emit to the App.vue where everything is taking place
const emit = defineEmits(['transactionDeleted'])


// Remember we have our id (transaction.id) passed with this function
const deleteTransaction = (id) => {
  emit('transactionDeleted', id)
}


</script>
