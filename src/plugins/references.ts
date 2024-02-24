import { reactive } from 'vue';
import axios from 'axios';

const data: ReferencesData = reactive({
  references: [],
  referencesLoading: true,

  reference: null,
  referenceLoading: true,
});

async function all(): Promise<void> {
  data.referencesLoading = true
  const response = await axios.get(`${import.meta.env.VITE_BACKEND}/references`, { withCredentials: true })
  data.references = response.data
  data.references.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  data.referencesLoading = false
}

async function view(_id: string): Promise<void> {
  data.referenceLoading = true
  const response = await axios.get(`${import.meta.env.VITE_BACKEND}/reference/view/${_id}`, { withCredentials: true })
  data.reference = response.data
  data.referenceLoading = false
}

const references = {
  data,
  all,
  view
};

export default references;