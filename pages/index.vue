<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      USERS
    </h1>
    <ul class="users">
      <li v-for="user in users" :key="user.id" class="user">
        <nuxt-link :to="{ name: 'id', params: { id: user.id }}">
          {{ user.firstName }} {{user.lastName}}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import gql from 'graphql-tag';

export default {
  data: () => ({
    users: [],
    loading: 0
  }),
  apollo: {
    users: {
      query: gql`
        query users {
          users {
            firstName
            id
            lastName
          }
        }
      `,
      loadingKey: 'loading',
      prefetch: true
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
