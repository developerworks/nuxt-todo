<template>
  <div class="container">
    <Todos :todos="todos" />
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Todos from '~/components/Todos.vue';

export default {
  data () {
    return {
      todos: [],
      loading: 0
    };
  },
  components: {
    Todos
  },
  apollo: {
    todos: {
      query: gql`
        query todos {
          todos {
            id
            title
            text
          }
        }
      `,
      loadingKey: 'loading',
      prefetch: true
    }
  },
  head () {
    return {
      title: 'Todos list'
    };
  }
};
</script>