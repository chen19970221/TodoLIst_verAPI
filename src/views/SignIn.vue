<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import router from '@/router';
const email = ref('')
const password = ref('')
const nickname = ref('')
const props = defineProps({
  apiUrl: String,
});

function signUp(email, nickname, password) {
  axios.post(`${props.apiUrl}/users`, {
    "user": {
      "email": email,
      "nickname": nickname,
      "password": password
    }
  }).then(res => {
    if (res.status === 201) {
      console.log(res)
      alert('成功註冊')
      router.push('/')
      sessionStorage.setItem("token", res.data.token)
      sessionStorage.setItem("nickame",res.data.nickname)
    }
  }).catch((err) => {
    if (err.response.status === 422) {
      alert(err.response.data.error)
    }
  });
}

</script>



<template>
  <div class="container">
    <h1 class="fw-bold text-center mb-3 mb-md-5 py-3">TODO LIST</h1>
    <div class="row justify-content-center">
      <div class="d-none d-md-block col-6 col-md-4">
        <img src="../img/logo.jpg" style="max-width: 100%;" alt="logo" >
      </div>
      <form class="col-6 col-md-4 d-flex flex-column justify-content-center text-secondary" id="signIn" @submit.prevent="signUp(email, nickname, password)">
        <label for="email">Email</label>
        <input class="form-control mb-3" type="text" id="signInEmail" name="signInEmail" placeholder="Email" v-model="email" required>
        <label for="nickname">Nick Name</label>
        <input class="form-control mb-3" type="text" id="nickname" name="nickname" v-model="nickname" required>
        <label for="pwd">Password</label>
        <input class="form-control mb-3" type="text" id="signInPwd" name="signInPwd" v-model="password" required>
        <button type="submit" class="btn btn-primary" id="signUpBtn">sign up</button>
        <div class="text-end">
          <RouterLink to="/" class="text-decoration-none link-secondary">Login</RouterLink>
        </div>
      </form> 
    </div>
  </div>
</template>