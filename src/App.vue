<template>

  <!-- Header component -->
  <SiteHeader />

  <div class="container">

    <!-- Balance component -->
    <TotalBalance />

    <!-- Income Expenses component -->
    <IncomeExpenses />

    <!-- TransactionList component -->
    <TransactionList :transactions="state.transactions" />
    <!-- Sending all our transactions to the TransactionList components as props -->

    <!-- AddTransaction component -->
    <AddTransaction />

  </div>

</template>


<script setup>

// Importing our components
import SiteHeader from '@/components/SiteHeader.vue';
import TotalBalance from '@/components/TotalBalance.vue';
import IncomeExpenses from '@/components/IncomeExpenses.vue';
import TransactionList from '@/components/TransactionList.vue';
import AddTransaction from '@/components/AddTransaction.vue';


// This is our transaction list. It's now in this 'app.vue', therefore, it'll be global to all the pages.
import { reactive } from "vue";

const state = reactive({
  transactions: [
    { id: 1, text: "Flower", amount: -19.99 },
    { id: 2, text: "Cars", amount: 299.87 },
    { id: 3, text: "Tea", amount: -10 },
    { id: 4, text: "Camera", amount: 150 },
  ],
});

</script>