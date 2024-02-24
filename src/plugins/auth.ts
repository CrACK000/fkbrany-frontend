import axios from "axios";
import { ref } from "vue";

export function useAuth() {

  const loggedIn = ref<boolean>(false)
  const userData = ref<any>(null)
  const loading = ref<any>(false)

  const checkAuth = async () => {
    loading.value = true
    await axios.get(`${import.meta.env.VITE_BACKEND}/check-auth`, { withCredentials: true })
      .then(response => {
        if (response.data.loggedIn) {
          loggedIn.value = true
          userData.value = response.data.user
        } else {
          loggedIn.value = false
          userData.value = null
        }
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    loggedIn,
    userData,
    loading,
    checkAuth
  }
}