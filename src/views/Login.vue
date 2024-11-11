<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter();
const loginEmail = ref('')
const loginPassword = ref('')
let token = sessionStorage.getItem("token")
const props = defineProps({
  apiUrl: String,
});

function login(loginEmail, loginPassword) {
  axios.post(`${props.apiUrl}/users/sign_in`, {
    "user": {
      "email": loginEmail,
      "password": loginPassword
    }
  })
    .then(res => {
      if (res.status === 200) {
        console.log(res);
        sessionStorage.setItem("token", res.headers.authorization);
        router.push('/list')
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      }
    });
}




</script>


<template>
  
  <div class="container">
    <h1 class="fw-bold text-center mb-3 mb-md-5 py-3">TODO LIST</h1>
    <div class="row justify-content-center">
      <div class="d-none d-md-block col-6 col-md-4 ">
        <img src="../img/logo.jpg" style="max-width: 100%;" alt="logo" >
      </div>
      <form class="col-6 col-md-4 d-flex flex-column justify-content-center text-secondary"  @submit.prevent="login(loginEmail, loginPassword)">
        <label for="email" >Account</label>
        <input class="form-control mb-3" type="text" id="logInEmail" name="logInEmail" placeholder="Email" v-model="loginEmail" required>
        <label for="pwd">Password</label>
        <input class="form-control mb-3" type="text" id="logInPwd" name="logInPwd" v-model="loginPassword" required>
        <button type="submit" class="btn btn-primary" id="loginBtn">Login</button>
        <div class="text-end link-primary">
          <RouterLink to="/sign_in" class="text-decoration-none link-secondary">Sign in</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>