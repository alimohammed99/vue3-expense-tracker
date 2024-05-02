<template>

  <!-- Header component -->
  <SiteHeader />

  <div class="container">

    <h1 style="margin-bottom:3rem; margin-top: 3rem; text-decoration:underline"><span style="color:blue">Expense</span>
      <span style="color:red">Tracker</span>
    </h1>

    <!-- Balance component -->
    <TotalBalance :total="+total" />

    <!-- Income & Expenses component -->
    <IncomeExpenses :income="+income" :expenses="-expenses" />
    <!-- Sending our income and expenses to this component -->
    <!-- Added the + and - so as to make them 'Numbers'. They are accepted as numbers in the 'IncomeExpenses' component but were passed from here as strings. Those signs enable us pass them as numbers even from here... -->

    <!-- TransactionList component -->
    <TransactionList :transactions="state.transactions" @transactionDeleted="handleTransactionDeleted" />
    <!-- Sending all our transactions to the TransactionList components as props -->
    <!-- "transactionDeleted" is the custom event I emitted from TransactionList component  -->

    <!-- AddTransaction component -->
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
    <!-- transactionSubmitted is the custom event I sent from the AddTransaction component -->

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
import { reactive, computed, onMounted } from "vue";


import { useToast } from 'vue-toastification'; // Importing the useToast function from vue-toastification

// Accessing the toast functionality from the vue-toastification plugin
const toast = useToast();


// Made this reactive so as our data/input changes, it reflects automatically here.
const state = reactive({
  transactions: [], 
  // Set to empty array at first so as we add items, they save to local storage
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


// Function to add & calculate transactions

const handleTransactionSubmitted = (transactionData) => {
  // Remember we passed 'transactionData' along with the custom event. It's the one holding our new incoming data


  // Generating a unique ID to be used when pushing new data into our array.
  // Each transaction in the transactions array up there has a unique ID so we have to handle that for incoming datas...........I'm generating a unique ID.
  const generateUniqueId = () => {
    return Math.floor(Math.random() * 10000000);
  }

  // Add new transactions to our transactions array
  state.transactions.push({
      id: generateUniqueId(),
      text: transactionData.text,
      amount: transactionData.amount
  });

  saveTransactionsToLocalStorage();
  // This is a fucntion to save our transactions to local storage.  


  toast.success('Transaction added successfully   :)');

};


const handleTransactionDeleted = (id) => {

  // Remember we passed 'id' along with the custom event. It's the one holding each particular transaction we wanna delete

  state.transactions = state.transactions.filter((transaction) => transaction.id !== id);


  saveTransactionsToLocalStorage();
  // This is a fucntion to save our transactions to local storage.


  toast.success('Transaction deleted successfully!')

}


// Checking if there's any saved transactions in the local storage. If there is, they should still be saved.....since I wanna be using the local storage for storage now.
onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('state.transactions'));
  // I used JSON.parse coz I have to convert the items from local storage into our normal array.

  if (savedTransactions) {
    state.transactions = savedTransactions;
  }
});


// Save items/transactions to local storage
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem('state.transactions', JSON.stringify(state.transactions));
  // I used JSON.stringify coz localstorage deals with strings so I have to convert our own normal array to string.
}
// Now I have to call this function when we add or delete stuffs

</script>
