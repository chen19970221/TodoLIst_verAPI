<script setup>
import { ref, defineProps, computed } from 'vue';
import axios from 'axios'
import router from '@/router';
const todoTxt = ref('')
const props = defineProps({
  apiUrl: String,
});
const todosList = ref([]);
const filterType = ref('all');
const editContent = ref("")
let token = sessionStorage.getItem('token')



getTodos()
function getTodos() {
  axios.get(`${props.apiUrl}/todos`, {
    headers: {
      "Authorization": token
    }
  })
    .then(res => {
      todosList.value = res.data.todos
    })
    .catch((err) => {
      if (err.response.status === 401) {
        console.log(err.response)
        alert(err.response)
      }
    })
}

function addTodo() {
  axios.post(`${props.apiUrl}/todos`, {
    todo: {
      "content": todoTxt.value
    }
  }, {
    headers: {
      "Authorization": token
    }
  }
  )
    .then(res => {
      if (res.status == 201) {
        todoTxt.value = ""
        getTodos()
      }
    })
    .catch(error => console.log(error.response))
}

function editTodo(todoId) {
  axios.put(`${props.apiUrl}/todos/${todoId}`, {
    todo: {
      "content": editContent.value
    }
  }, {
    headers: {
      "Authorization": token
    }
  }
  ).then(res => {
    if (res.status == 200) {
      alert('成功修改')
      getTodos()
      editContent.value = ""
    }
  })
    .catch(error => console.log(error.response))
}

// 刪除 todo
function deleteTodo(todoId) {
  axios.delete(`${props.apiUrl}/todos/${todoId}`, {
    headers: {
      "Authorization": token
    }
  }).then(res => {
    if (res.status == 200) {
      console.log(res)
      getTodos()
      alert(res.data.message)
    }
  })
    .catch(error => console.log(error.response))

}

// 完成 todo
function completeTodo(todoId) {
  axios.patch(`${props.apiUrl}/todos/${todoId}/toggle`, {}, {
    headers: {
      "Authorization": token
    }
  }).then(res => {
    console.log(res)
    if (res.status == 200) {
      console.log(res)
      getTodos()

    }
  })
    .catch(error => console.log(error.response))
}

function logOut() { 
  axios.delete(`${props.apiUrl}/users/sign_out`,  {
    headers: {
      "Authorization": token
    }
  }).then(res => {
    console.log(res);
    router.push('/')
  })
  .catch(error => console.log(error))
}

const filteredTodos = computed(() => {
  if (filterType.value === 'pending') {
    return todosList.value.filter(todo => todo.completed_at === null);
  } else if (filterType.value === 'completed') {
    return todosList.value.filter(todo => todo.completed_at !== null);
  }
  return todosList.value;
});

function all() {
  filterType.value = 'all';
}

function pending() {
  filterType.value = 'pending';
}

function completed() {
  filterType.value = 'completed';
}


</script>



<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-6 pt-4">
        <div class="d-flex justify-content-between border-bottom mb-4 pb-4 border-primary">
          <h1 class="mb-0">ToDo List </h1>
          <button class="btn btn-primary" @click="logOut">Log Out</button>
        </div>
        
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="todoTxt">
          <button type="submit" class="btn btn-primary" id="addTodo" @click="addTodo">Add</button>
        </div>
        <div class="row row-cols-3 btn-group g-1 mb-3 w-100">
          <button class="btn btn-outline-primary col text-dark" @click="all()">All</button>
          <button class="btn btn-outline-primary col text-dark" @click="pending()">Pending</button>
          <button class="btn btn-outline-primary col text-dark" @click="completed()">Completed</button>
        </div>
        <ul id="list" class="list-unstyled accordion">
          <li class="accordion-item" v-for="todo in filteredTodos" :key="todo.id">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                :data-bs-target="'#' + todo.id" aria-expanded="false" :aria-controls="todo.id">
                <span class="me-5">{{ todo.content }}</span>
                <span class="d-none d-md-block" v-if="todo.completed_at != null">Completed at：{{ todo.completed_at }}</span>
              </button>
            </h2>
            <div :id="todo.id" class="accordion-collapse collapse" data-bs-parent="#list">
              <div class="accordion-body">
                <input type="text" class="form-control mb-2" v-model="editContent">
                <button class="btn btn-warning me-2" @click="editTodo(todo.id, editContent)"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-success me-2" v-if="todo.completed_at != null"
                  @click="completeTodo(todo.id)">目前尚未完成</button>
                <button class="btn btn-success me-2" v-else @click="completeTodo(todo.id)"><i class="bi bi-check-lg"></i></button>
                <button class="btn btn-danger" @click="deleteTodo(todo.id)"><i class="bi bi-trash"></i></button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>