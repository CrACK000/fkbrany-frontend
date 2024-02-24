import {inject} from "vue";
import axios from "axios";
import router from "@/router";

export async function logout() {

  const auth = inject<Auth>('auth')

  // @todo Užívateľa odhlási ale nezmení auth hodnoty loggedIn a userData

  await axios.get(`${import.meta.env.VITE_BACKEND}/logout`, { withCredentials: true })
    .then(response => {
      if (response.data.success) {
        if (auth) {
          auth.loggedIn = false;
          auth.userData = null;
        }
        router.push({ name: 'home' })
      } else {
        console.log('Failed to logout user');
        router.push({ name: 'dashboard' });
      }
    })

  return {
    //
  }
}