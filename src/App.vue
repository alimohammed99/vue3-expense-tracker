<template>

  <!-- Header component -->
  <SiteHeader />

  <div class="container">

    <h1 style="margin-bottom:3rem; margin-top: 3rem; text-decoration:underline"><span style="color:blue">Expense</span> <span style="color:red">Tracker</span></h1>

    <!-- Balance component -->
    <TotalBalance :total="total" />

    <!-- Income & Expenses component -->
    <IncomeExpenses :income="+income" :expenses="-expenses" />
    <!-- Sending our income and expenses to this component -->
    <!-- Added the + and - so as to make them 'Numbers'. They are accepted as numbers in the 'IncomeExpenses' component but were passed from here as strings. Those signs enable us pass them as numbers even from here... -->

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


// This is our transaction list. It's now in this 'app.vue', therefore, it'll be global, to all the pages.
import { reactive, computed } from "vue";


// Made this reactive so as our data/input changes, it reflects automatically here.
const state = reactive({
  transactions: [
    { id: 1, text: "Flower", amount: -19.99 },
    { id: 2, text: "Cars", amount: 399.87 },
    { id: 3, text: "Tea", amount: -10 },
    { id: 4, text: "Camera", amount: 150 },
  ],
});


// Get the total balance
const total = computed(() => {
  return state.transactions.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
});


// Get income
// Using the filter function to sum up only the amounts greater than zero and give the answer in two decimal places
const income = computed(() => {
  return state.transactions.filter((transaction) => transaction.amount > 0).reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0).toFixed(2);
});


// Get expenses
// Using the filter function to sum up only the amounts less than zero and give the answer in two decimal places
const expenses = computed(() => {
  return state.transactions.filter((transaction) => transaction.amount < 0).reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0).toFixed(2);
});

</script>
