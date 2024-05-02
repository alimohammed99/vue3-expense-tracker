// import { createApp } from 'vue'
// import App from './App.vue'

// // Importing the stylesheet
// import './assets/style.css';

// // Setting up our toast for notification
// import Toast from 'vue-toastification';
// import 'vue-toastification/dist/index.css'

// createApp(App).mount('#app');

// app.use(Toast);


import { createApp } from 'vue'
import App from './App.vue'

// Importing the stylesheet
import './assets/style.css';

// Setting up our toast for notification
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'

const app = createApp(App);

// Mounting the app
app.mount('#app');

// Using the Toast plugin
app.use(Toast);