import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import i18n from './i18n'; // Import the i18n instance

// Create the app instance
const app = createApp(App);

// Use the router and i18n instances
app.use(router);
app.use(i18n);

// Mount the app to the DOM
app.mount('#app');

