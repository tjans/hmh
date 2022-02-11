import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
    .use(router)
    .use(store);

//app.component("font-awesome-icon", FontAwesomeIcon);
app.mount('#app')



