import {inject} from "vue";
import axios from "axios";

export async function logout() {

  const auth = await inject<any>('auth')

  await axios.get(`${import.meta.env.VITE_BACKEND}/logout`, { withCredentials: true })
    .then(response => {
      if (response.data.success) {

        auth.loggedIn.value = false
        auth.userData.value = null

      }
    })
}