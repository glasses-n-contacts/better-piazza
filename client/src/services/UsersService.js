import Api from '@/services/Api'

export default {
  fetchUsers () {
    return Api().get('users/all')
  },
  addUser (params) {
    return Api().post('users/create', params)
  },
  updateUser (params) {
    return Api().put('users/' + params.id, params)
  },
  getUser (params) {
    return Api().get('users/user/' + params.id)
  },
  deleteUser (id) {
    return Api().delete('users/' + id)
  }
}
