<template>
    <h3>Add new transaction</h3>
    <form id="form" @submit.prevent="onSubmit">
        <div class="form-control">
            <label for="text">Text</label>
            <input type="text" id="text" placeholder="Enter text..." v-model="text" />
        </div>
        <div class="form-control">
            <label for="amount">Amount <br />
                (negative - expense, positive - income)</label>
            <input type="text" id="amount" placeholder="Enter amount..." v-model="amount" />
        </div>
        <button class="btn">Add transaction</button>
    </form>
</template>  


<script setup>
import { useToast } from 'vue-toastification'; // Importing the useToast function from vue-toastification
import { ref } from 'vue'; // Importing the ref function from Vue

// Variables for managing form inputs using v-model
const text = ref(''); 
const amount = ref(''); 

// Accessing the toast functionality from the vue-toastification plugin
const toast = useToast();

// Define emits to declare custom events
const emit = defineEmits(['transactionSubmitted']);

// Function to handle form submission
const onSubmit = () => {

    // Check if either field is empty
    // I am accessing their value attributes since they are both REFs
    if (!text.value && !amount.value) { 
        toast.error('Both fields are required.'); 
        return; // Exit the function early
    } else if (!text.value) { 
        toast.error('Text field is required.');
        return; // Exit the function early
    } else if (!amount.value) { 
        toast.error('Amount field is required.'); 
        return; // Exit the function early
    }

    // Create an object with the transaction data that's gonna hold our data
    const transactionData = {
        text: text.value, // Assigning the value of the text input to the 'text' property
        amount: parseFloat(amount.value), // Parsing and assigning the value of the amount input to the 'amount' property
    };

    // Emit the 'transactionSubmitted' event with the transaction data
    emit('transactionSubmitted', transactionData);
    // I am emitting so I can listen to the event in the App.vue where the data changing occurs

    // Clear the form fields after submission
    text.value = ''; 
    amount.value = ''; 

};
</script>
