<template>
  <div class="users">
    This file will list all the users.

    <div v-if="users.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewUser' }" class="">Add User</router-link>
      </div>
      <table>
        <tr>
          <td>Title</td>
          <td width="550">Description</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="user in users">
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'EditUser', params: { id: user._id } }">Edit</router-link> |
            <a href="#">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no users... Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'NewUser' }" class="add_user_link">Add User</router-link>
    </div>

  </div>
</template>

<script>
import UsersService from '@/services/UsersService'
export default {
  name: 'users',
  data () {
    return {
      users: []
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      const response = await UsersService.fetchUsers()
      this.users = response.data.users
    }
  }
}
</script>
