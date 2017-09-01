<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      User
    </h1>
    <h2 class="info" v-if="user">
      {{user.firstName}} {{user.lastName}}
    </h2>
    <nuxt-link class="button" to="/">
      Users
    </nuxt-link>
  </section>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'id',
  data () {
    return {
      user: null,
      loading: 0,
      id: this.$route.params.id
    };
  },
  apollo: {
    user: {
      query: gql`
        query user($id: ID!) {
          user(id: $id) {
            firstName
            lastName
          }
        }
      `,
      loadingKey: 'loading',
      prefetch ({ route }) {
        return {
          id: route.params.id
        };
      },
      variables () {
        return {
          id: this.id
        };
      }
    }
  },
  head () {
    return {
      title: `Users`
    };
  }
};
</script>

<style scoped>
.title
{
  margin-top: 30px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 30px;
}
</style>
