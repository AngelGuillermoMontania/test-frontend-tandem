<script setup>
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import axios from "axios";
import router from "../router/index"



let users = ref(null)

onMounted(async () => {
    console.log(localStorage.getItem("token"))
    try {
        const data = await axios.get("http://localhost:3001/user", {
            headers: {
                "Authorization": JSON.parse(localStorage.getItem("token"))
            }
        })
        console.log(data)
        users.value = data.data
        console.log(users.value)
    } catch (error) {
        console.log(users.value)
        router.push("/login")
    }
})


</script>

<template>
    <Header />
    <div v-if="users === null" d-flex>
        <v-progress-circular indeterminate color="primary" model-value="20" :size="62" :width="12"></v-progress-circular>
    </div>
    <div v-else class="mt-16 pt-2">
        <p>{{ users }}</p>
    </div>
</template>
