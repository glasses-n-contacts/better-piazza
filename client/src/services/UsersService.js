import Api from '@/services/Api'

export default {
  fetchUsers () {
    return Api().get('users/all')
  },
  addUser (params) {
    return Api().post('users/create', params)
  }
}
