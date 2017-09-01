<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      USERS
    </h1>
    <ul class="users">
      <li v-for="user in users" :key="user.id" class="user">
        <nuxt-link :to="{ name: 'id', params: { id: user.id }}">
          {{ user.firstName }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import gql from 'graphql-tag';

const usersQuery = gql`
  query users {
    users {
      firstName
      id
    }
  }
`;

export default {
  data: () => ({
    users: [],
    loading: 0
  }),
  apollo: {
    users: {
      query: usersQuery,
      loadingKey: 'loading'
    }
  },
  head () {
    return {
      title: 'Users'
    };
  }
};
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
