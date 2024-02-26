import { ref } from 'vue';
import axios from 'axios';

const data = ref<Settings>({} as Settings);

const loading = ref<boolean>(true)

async function load(): Promise<void> {
  loading.value = true
  const response = await axios.get(`${import.meta.env.VITE_BACKEND}/settings`, { withCredentials: true })
  data.value = response.data
  loading.value = false
}

const settings = {
  data,
  loading,
  load
};

export default settings;