<template>
    <div class="todos">
        <Todo v-for="todo in todos" :key="todo.id"></Todo>
    </div>
</template>

<script>
import Todo from './Todo.vue';

export default {
  props: {
    todos: {
      required: true
    }
  },
  components: {
    Todo
  }
};
</script>
