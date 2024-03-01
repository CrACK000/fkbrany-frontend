<script setup lang="ts">
import {FwbButton, FwbInput, FwbSelect, FwbTextarea, FwbToggle} from "flowbite-vue";
import Footer from "@/views/layout/Footer.vue";
import {ref} from "vue";
import axios from "axios";
import {useMeta} from "vue-meta";
import Container from "@/components/Container.vue";
import Panel from "@/components/Panel.vue";
import PanelItem from "@/components/PanelItem.vue";
import ContainerHeader from "@/components/ContainerHeader.vue";
import ContainerGrid from "@/components/ContainerGrid.vue";

useMeta({title: 'Žiadosť o nacenenie brány'});

const form = ref<Offer>({
  name: '',
  surname: '',
  email: '',
  mobile: '',
  gate: '',
  styleGate: '',
  widthGate: '',
  heightGate: '',
  entryGate: false,
  widthEntryGate: '',
  heightEntryGate: '',
  montage: false,
  montagePlace: '',
  fenceParts: false,
  fencePartsList: [],
  motor: false,
  msg: '',
})
const fencePartsForm = ref<FenceParts>({
  count: 0,
  width: '',
  height: '',
})

const step = ref<number>(1)
const steps = ref<any>({
  1: {
    title: 'Kontaktné informácie',
    description: 'Údaje pomocou ktorých Vás spätne budeme informovať o ponuke.'
  },
  2: {
    title: 'Brána',
    description: 'Typ, vzhľad a rozmery brány. Rozmery zadajte v milimetroch'
  },
  3: {
    title: 'Služby k ponuke',
    description: 'Vyberte služby o ktoré máte záujem.'
  },
  4: {
    title: 'Dokončiť a odoslať',
    description: 'Posledný krok'
  }
})

const styleGate = ref([
  { value: "Ťahokov", name: "Ťahokov" },
  { value: "Lamely (hliníkové)", name: "Lamely (hliníkové)" },
  { value: "Lamely (pozinkované)", name: "Lamely (pozinkované)" },
  { value: "Ploché lamely (hliníkové)", name: "Ploché lamely (hliníkové)" },
  { value: "Ploché lamely (pozinkované)", name: "Ploché lamely (pozinkované)" },
  { value: "3D Plech", name: "3D Plech" },
  { value: "Vypaľované vzory do plechu", name: "Vypaľované vzory do plechu" },
])

const errors = ref<any>([])
const loading = ref<boolean>(false)
const success = ref<boolean>(false)
const fail = ref<boolean>(false)
const status = ref<string>('')

const options = Array.from({length: 20}, (_, i) => ({name: i + 1, value: i + 1}));

const sendOffer = () => {

  fail.value = false

  if (!formCheck()) return false

  loading.value = true

  axios.post(`${import.meta.env.VITE_BACKEND}/create-offer-gate`, form.value, { withCredentials: true })
    .then(response => {
      if (response.data.success) {
        success.value = true
        status.value = response.data.message
      } else {
        errors.value = response.data.errors
        fail.value = true
        status.value = response.data.message
      }
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      loading.value = false
  })
}
const formCheck = () => {
  errors.value = [];

  // Check step One
  if (step.value === 1) {
    validName()
    validSurname()
    validEmail()
    validMobile()
  }

  // Check step Two
  if (step.value === 2) {
    validGate()
    validStyleGate()
    validWidthGate()
    validHeightGate()
  }

  // Check step Three
  if (step.value === 3) {
    validEntryGate()
    validMontage()
    validFenceParts()
  }

  // Check step Four
  if (step.value === 4) {
    validMessage()
  }

  if(!errors.value.length) return true;
}

function checkFencePartsForm() {

  errors.value = errors.value.filter((error: any) => error.where !== 'fencePartsCount');
  errors.value = errors.value.filter((error: any) => error.where !== 'fencePartsWidth');
  errors.value = errors.value.filter((error: any) => error.where !== 'fencePartsHeight');

  if (fencePartsForm.value.count === 0) errors.value.push({ where: 'fencePartsCount', message: 'Vyberte počet plotových dielcov.' })
  if (!fencePartsForm.value.width) errors.value.push({ where: 'fencePartsWidth', message: 'Zadajte šírku otvoru pre plotový dielec.' })
  if (!fencePartsForm.value.height) errors.value.push({ where: 'fencePartsHeight', message: 'Zadajte výšku otvoru pre plotový dielec.' })

  if(!errors.value.length) return true;

}
function addFenceParts() {

  if (!checkFencePartsForm()) return false

  form.value.fencePartsList.push({
    count: fencePartsForm.value.count,
    width: fencePartsForm.value.width,
    height: fencePartsForm.value.height,
  })

  fencePartsForm.value.count = 0;
  fencePartsForm.value.width = '';
  fencePartsForm.value.height = '';

}
function removeFenceParts(key: number) {
  form.value.fencePartsList.splice(key, 1)
}

const validName = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'name');
  if (form.value.name.length < 3)
    errors.value.push({ where: "name", message: "Meno musí obsahovať minimálne 3 znaky."})
  if (form.value.name.length > 30)
    errors.value.push({ where: "name", message: "Meno je príliš dlhé."})
}
const validSurname = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'surname');
  if (!form.value.surname)
    errors.value.push({ where: "surname", message: "Vyplňte priezvisko."})
  if (form.value.surname.length > 40)
    errors.value.push({ where: "surname", message: "Priezvisko je príliš dlhé."})
}
const validEmail = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'email');
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  if (!emailRegex.test(form.value.email)) {
    errors.value.push({ where: "email", message: "Nesprávny formát emailu." })
  }
}
const validMobile = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'mobile');
  if (form.value.mobile) {
    const mobileRegex = /^[+]\+?[1-9][0-9]{11,15}$/
    if (!mobileRegex.test(form.value.mobile)) {
      errors.value.push({where: 'mobile', message: 'Nesprávny formát tel. čísla.'})
    }
  }
}
const validGate = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'gate');
  if (!form.value.gate)
    errors.value.push({ where: "gate", message: "Vyberte typ brány." });
}
const validStyleGate = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'styleGate');
  if (!form.value.styleGate)
    errors.value.push({ where: "styleGate", message: "Vyberte vzor brány." });
}
const validWidthGate = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'widthGate');
  if (!form.value.widthGate)
    errors.value.push({ where: "widthGate", message: "Zadajte šírku otvoru pre bránu." });
}
const validHeightGate = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'heightGate');
  if (!form.value.heightGate)
    errors.value.push({ where: "heightGate", message: "Zadajte výšku otvoru pre bránu." });
}
const validEntryGate = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'widthEntryGate');
  errors.value = errors.value.filter((error: any) => error.where !== 'heightEntryGate');
  if (form.value.entryGate) {
    if (!form.value.widthEntryGate) {
      errors.value.push({ where: "widthEntryGate", message: "Zadajte šírku otvoru pre vstupnú bránku." });
    }
    if (!form.value.heightEntryGate) {
      errors.value.push({ where: "heightEntryGate", message: "Zadajte výšku otvoru pre vstupnú bránku." });
    }
  }
}
const validMontage = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'montagePlace');
  if (form.value.montage) {
    if (!form.value.montagePlace) {
      errors.value.push({ where: "montagePlace", message: "Zadajte lokalitu montáže." });
    }
  }
}
const validFenceParts = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'fenceParts');
  if (form.value.fenceParts) {
    if (!form.value.fencePartsList.length) errors.value.push({ where: "fenceParts", message: "Pridajte rozmery a počty plotových dielcov." });
  }
}
const validMessage = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'msg');
  if (!form.value.msg) {
    errors.value.push({ where: "msg", message: "Zadajte pár slov o vašej predstave." });
  }
}

const getError = (search: any) => {
  const emailError = errors.value.find((error: any) => error.where === search);
  return emailError ? emailError.message : '';
}
const nextButton = async () => {
  fail.value = false
  if (!formCheck()) return false
  step.value++
}
const prevButton = () => {
  step.value--
}
</script>

<template>

  <Container>

    <container-header>
      <template #title>Žiadosť o nacenenie brány</template>
      <template #description>
        Nacenenie brány je nezáväzné a zadarmo. Pre spresnenie ceny, zadajte čo najpresnejšie rozmery.
      </template>
    </container-header>

    <container-grid width="4xl">

      <div class="lg:col-span-12">
        <div class="fk__form-card">

          <panel>
            <panel-item>
              <div class="text-lg sm:text-xl">Žiadosť o nacenenie brány</div>
            </panel-item>
            <panel-item :padding="false">
              <div class="w-full h-auto px-4 xs:px-6 lg:px-8 py-4 md:py-6 bg-gray-700/15 border-b border-gray-700">
                <div class="font-semibold text-lg">{{ steps[step].title }}</div>
                <div class="text-xs md:text-sm text-gray-500">{{ steps[step].description }}</div>
              </div>
            </panel-item>
            <panel-item v-if="success || fail" :padding="false">
              <div class="w-full h-auto px-4 xs:px-6 lg:px-8 py-4 md:py-6 border-b" :class="{ 'bg-green-900/50 border-green-400/50 text-green-400': success, 'bg-red-900/50 border-red-400/50 text-red-400': fail }">
                <svg v-if="success" class="w-6 h-6 inline -mt-1 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <svg v-if="fail" class="w-6 h-6 inline -mt-1 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                {{ status }}
              </div>
            </panel-item>

            <template v-if="step === 1">
              <panel-item>

                <div class="flex flex-col gap-6 md:p-6">
                  <fwb-input label="Vaše meno" :validation-status="getError('name') && 'error'" size="lg" v-model="form.name" @keyup="validName" class="max-w-lg">
                    <template #validationMessage>{{ getError('name') }}</template>
                  </fwb-input>
                  <fwb-input label="Vaše priezvisko" :validation-status="getError('surname') && 'error'" size="lg" v-model="form.surname" @keyup="validSurname" class="max-w-lg">
                    <template #validationMessage>{{ getError('surname') }}</template>
                  </fwb-input>
                  <fwb-input label="Emailová adresa" :validation-status="getError('email') && 'error'" placeholder="vas@email.com" size="lg" v-model="form.email" @keyup="validEmail" class="max-w-lg">
                    <template #validationMessage>{{ getError('email') }}</template>
                  </fwb-input>
                  <fwb-input label="Telefónne číslo" :validation-status="getError('mobile') && 'error'" placeholder="+421" size="lg" v-model="form.mobile" @keyup="validMobile" class="max-w-lg">
                    <template #validationMessage>{{ getError('mobile') }}</template>
                  </fwb-input>
                </div>

              </panel-item>
              <panel-item>
                <div class="flex flex-col md:flex-row justify-between md:items-center gap-y-3">
                  <div class="ms-auto">
                    <fwb-button type="button" @click="nextButton()">Pokračovať</fwb-button>
                  </div>
                </div>
              </panel-item>
            </template>

            <template v-if="step === 2">
              <panel-item>

                <div class="flex flex-col gap-6 md:p-6">
                  <div>
                    <div class="text-sm mb-4" :class="{'text-red-500': getError('gate')}">Vyberte typ brány</div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-8 w-full" @click="validGate">
                      <div>
                        <button type="button" @click="form.gate = 'Krídlová brána'"
                                :class="[ form.gate === 'Krídlová brána' ? 'ring-[6px] ring-blue-500' : 'hover:ring-4 hover:ring-gray-600' ]"
                                class="bg-gray-700 h-full rounded-lg lg:rounded-xl p-4 transition cursor-pointer flex flex-row lg:flex-col items-center gap-4">
                          <img src="/img/gate-kridlova_240x135.png" class="w-3/12 lg:w-full" alt="Krídlová brána">
                          <div class="lg:text-center leading-none text-sm">Krídlová brána</div>
                        </button>
                      </div>
                      <div>
                        <button type="button" @click="form.gate = 'Posuvná brána po koľajnici'"
                                :class="[ form.gate === 'Posuvná brána po koľajnici' ? 'ring-[6px] ring-blue-500' : 'hover:ring-4 hover:ring-gray-600' ]"
                                class="bg-gray-700 h-full rounded-lg lg:rounded-xl p-4 transition cursor-pointer flex flex-row lg:flex-col items-center gap-4">
                          <img src="/img/gate-samostatna_240x135.png" class="w-3/12 lg:w-full" alt="Posuvná brána po koľajnici">
                          <div class="lg:text-center leading-none text-sm">Posuvná brána po koľajnici</div>
                        </button>
                      </div>
                      <div>
                        <button type="button" @click="form.gate = 'Posuvná brána samonosná'"
                                :class="[ form.gate === 'Posuvná brána samonosná' ? 'ring-[6px] ring-blue-500' : 'hover:ring-4 hover:ring-gray-600' ]"
                                class="bg-gray-700 h-full rounded-lg lg:rounded-xl p-4 transition cursor-pointer flex flex-row lg:flex-col items-center gap-4">
                          <img src="/img/gate-posuvna_240x135.png" class="w-3/12 lg:w-full" alt="Posuvná brána samonosná">
                          <div class="lg:text-center leading-none text-sm">Posuvná brána samonosná</div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <fwb-select @change="validStyleGate" v-model="form.styleGate" :options="styleGate" :validation-status="getError('styleGate') && 'error'" label="Vzor brány" placeholder="Vyberte vzor" size="lg" class="max-w-lg">
                    <template #validationMessage>{{ getError('styleGate') }}</template>
                  </fwb-select>
                  <div>
                    <div class="text-sm mb-4">Rozmery brány</div>
                    <div class="grid grid-cols-2 gap-4">
                      <fwb-input v-model="form.widthGate" :validation-status="getError('widthGate') && 'error'" label="Šírka otvoru" placeholder="mm" size="lg" @keyup="validWidthGate">
                        <template #validationMessage>{{ getError('widthGate') }}</template>
                      </fwb-input>
                      <fwb-input v-model="form.heightGate" :validation-status="getError('heightGate') && 'error'" label="Výška otvoru" placeholder="mm" size="lg" @keyup="validHeightGate">
                        <template #validationMessage>{{ getError('heightGate') }}</template>
                      </fwb-input>
                    </div>
                  </div>
                </div>

              </panel-item>
              <panel-item>
                <div class="flex flex-col md:flex-row justify-between md:items-center gap-y-3">
                  <div>
                    <fwb-button type="button" color="alternative" @click="prevButton()">Späť</fwb-button>
                  </div>
                  <div class="ms-auto">
                    <fwb-button type="button" @click="nextButton()">Pokračovať</fwb-button>
                  </div>
                </div>
              </panel-item>
            </template>

            <template v-if="step === 3">
              <panel-item>

                <div class="flex flex-col gap-6 md:p-6">
                  <div class="shadow rounded-lg overflow-hidden">
                    <div class="bg-gray-800 px-6 py-5 w-full" :class="{ 'border-b border-gray-700': form.entryGate }">
                      <div class="flex items-center">
                        Vstupná bránka
                        <fwb-toggle v-model="form.entryGate" class="ms-auto"/>
                      </div>
                    </div>
                    <div v-if="form.entryGate" class="bg-gray-800 p-4 md:p-8">
                      <div class="text-sm mb-4">Rozmery vstupnej bránky</div>
                      <div class="grid grid-cols-2 gap-4">
                        <fwb-input v-model="form.widthEntryGate" :validation-status="getError('widthEntryGate') && 'error'" @keyup="validEntryGate" label="Šírka otvoru" placeholder="mm" size="lg">
                          <template #validationMessage><span class="text-xs" v-text="getError('widthEntryGate')"></span></template>
                        </fwb-input>
                        <fwb-input v-model="form.heightEntryGate" :validation-status="getError('heightEntryGate') && 'error'" @keyup="validEntryGate" label="Výška otvoru" placeholder="mm" size="lg">
                          <template #validationMessage><span class="text-xs" v-text="getError('heightEntryGate')"></span></template>
                        </fwb-input>
                      </div>
                    </div>
                  </div>
                  <div class="shadow rounded-lg overflow-hidden">
                    <div class="bg-gray-800 px-6 py-5 w-full" :class="{ 'border-b border-gray-700': form.montage }">
                      <div class="flex items-center">
                        Montáž brány
                        <fwb-toggle v-model="form.montage" class="ms-auto"/>
                      </div>
                    </div>
                    <div v-if="form.montage" class="bg-gray-800 p-4 md:p-8">
                      <fwb-input label="Miesto montáže" :validation-status="getError('montagePlace') && 'error'" size="lg" v-model="form.montagePlace" @keyup="validMontage">
                        <template #validationMessage>{{ getError('montagePlace') }}</template>
                      </fwb-input>
                    </div>
                  </div>
                  <div class="shadow rounded-lg overflow-hidden">
                    <div class="bg-gray-800 px-6 py-5 w-full" :class="{ 'border-b border-gray-700': form.fenceParts }">
                      <div class="flex items-center">
                        Plotové dielce
                        <fwb-toggle v-model="form.fenceParts" class="ms-auto"/>
                      </div>
                    </div>
                    <div v-if="form.fenceParts" class="bg-gray-800 p-4 md:p-8">

                      <div class="grid grid-cols-4 md:grid-cols-7 items-end gap-4 p-4 rounded-xl border border-gray-700 mb-6">
                        <div class="col-span-4 md:col-span-2">
                          <fwb-select v-model="fencePartsForm.count" :validation-status="getError('fencePartsCount') && 'error'" @change="checkFencePartsForm" label="Počet dielcov" :options="options" placeholder="Vyberte počet"/>
                        </div>
                        <div class="col-span-2 md:col-span-2">
                          <fwb-input v-model="fencePartsForm.width" :validation-status="getError('fencePartsWidth') && 'error'" @keyup="checkFencePartsForm" label="Šírka otvoru" placeholder="mm"></fwb-input>
                        </div>
                        <div class="col-span-2 md:col-span-2">
                          <fwb-input v-model="fencePartsForm.height" :validation-status="getError('fencePartsHeight') && 'error'" @keyup="checkFencePartsForm" label="Výška otvoru" placeholder="mm"></fwb-input>
                        </div>
                        <div class="col-span-4 md:col-span-1">
                          <fwb-button type="button" class="w-full" @click="addFenceParts">Pridať</fwb-button>
                        </div>
                      </div>

                      <div>
                        <div class="mb-2 font-semibold">Plotové dielce</div>
                        <div class="flex flex-col gap-y-3">
                          <div v-for="(part, key) in form.fencePartsList" class="grid grid-cols-7 items-center bg-gray-900/30 p-4 rounded-lg">
                            <div class="col-span-2 text-xl">
                              <div class="text-xs opacity-75">Počet</div>
                              <div class="text-base md:text-xl">{{ part.count }}</div>
                            </div>
                            <div class="col-span-2 text-xl">
                              <div class="text-xs opacity-75">Šírka otvoru</div>
                              <div class="text-base md:text-xl">{{ part.width }}</div>
                            </div>
                            <div class="col-span-2 text-xl">
                              <div class="text-xs opacity-75">Výška otvoru</div>
                              <div class="text-base md:text-xl">{{ part.height }}</div>
                            </div>
                            <div class="text-xl text-end md:text-center">
                              <button type="button" @click="removeFenceParts(key)" class="hover:text-white transition">
                                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6m0 12L6 6"/>
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div v-if="!form.fencePartsList.length" class="flex items-center justify-center bg-gray-900/30 p-4 rounded-lg text-sm opacity-75" :class="[ (getError('fenceParts') || getError('fencePartsList')) ? 'border border-red-700 text-red-500' : '']">
                            Zatiaľ neboli pridané žiadne plotové dielce.
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="shadow rounded-lg overflow-hidden">
                    <div class="bg-gray-800 px-6 py-5 cursor-pointer user-select-none">
                      <div class="flex items-center">
                        Motor
                        <fwb-toggle v-model="form.motor" class="ms-auto"/>
                      </div>
                    </div>
                  </div>
                </div>

              </panel-item>
              <panel-item>
                <div class="flex flex-col md:flex-row justify-between md:items-center gap-y-3">
                  <div>
                    <fwb-button type="button" color="alternative" @click="prevButton()">Späť</fwb-button>
                  </div>
                  <div class="ms-auto">
                    <fwb-button type="button" @click="nextButton()">Pokračovať</fwb-button>
                  </div>
                </div>
              </panel-item>
            </template>

            <template v-if="step === 4">
              <panel-item>

                <div class="flex flex-col gap-6 md:p-6">

                  <div class="bg-gray-700/50 p-4 rounded-xl">
                    <div class="bg-gray-700/50 shadow-md rounded-xl text-gray-300 mb-6">
                      <div class="p-6 grid grid-cols-12 items-center">
                        <div class="col-span-12 sm:col-span-8">
                          <div class="grid grid-cols-12 gap-x-2 gap-y-1 text-sm">
                            <div class="col-span-12 text-lg font-semibold mb-2">Brána</div>

                            <div class="col-span-4">Typ brány</div>
                            <div class="col-span-8 font-semibold">{{ form.gate }}</div>

                            <div class="col-span-4">Vzor</div>
                            <div class="col-span-8 font-semibold">{{ form.styleGate }}</div>

                            <div class="col-span-4">Širka otvoru</div>
                            <div class="col-span-8 font-semibold">{{ form.widthGate }}</div>

                            <div class="col-span-4">Výška otvoru</div>
                            <div class="col-span-8 font-semibold">{{ form.heightGate }}</div>

                          </div>
                        </div>
                        <div class="col-span-12 sm:col-span-4 pe-9 pb-9 ps-6 pt-6">
                          <div class="relative">
                            <img src="/img/gate-kridlova_240x135.png" class="w-full" alt="Gate">
                            <div class="absolute top-1/2 w-44 text-center left-full -translate-y-1/2 -translate-x-1/2 rotate-90 text-sm ms-6 font-bold">
                              <i class="fa-solid fa-arrows-left-right me-1"></i> {{ form.widthGate }}
                            </div>
                            <div class="absolute top-full inset-x-0 text-center text-sm mt-3 font-bold">
                              <i class="fa-solid fa-arrows-left-right me-1"></i> {{ form.heightGate }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 items-stretch gap-6" v-if="form.entryGate || form.montage || form.fenceParts || form.motor">
                      <div v-if="form.entryGate" class="bg-gray-700/50 shadow-md rounded-xl text-gray-300">
                        <div class="p-4 font-semibold text-center">Vstupná bránka</div>
                        <div class="grid grid-cols-2 gap-x-2 gap-y-1 text-sm px-1 pb-4">

                          <div class="text-end">Šírka</div>
                          <div class="text-start font-semibold truncate">{{ form.widthEntryGate }}</div>

                          <div class="text-end">Výška</div>
                          <div class="text-start font-semibold truncate">{{ form.heightEntryGate }}</div>

                        </div>
                      </div>
                      <div v-if="form.montage" class="bg-gray-700/50 shadow-md rounded-xl text-gray-300">
                        <div class="p-4 pb-2 font-semibold text-center">Montáž</div>
                        <div class="px-4 text-xs text-center mb-2">Lokalita</div>
                        <div class="px-4 pb-3 text-center truncate"><i class="fa-solid fa-location-dot me-1"></i> {{ form.montagePlace }}</div>
                      </div>
                      <div v-if="form.fenceParts" class="bg-gray-700/50 shadow-md rounded-xl text-gray-300">
                        <div class="p-4 pb-2 font-semibold text-center">Plotové dielce</div>
                        <div class="p-4 pt-2 text-center text-2xl">
                          {{ form.fencePartsList.reduce((accum, current) => accum + current.count, 0) }}
                        </div>
                      </div>
                      <div v-if="form.motor" class="bg-gray-700/50 shadow-md rounded-xl text-gray-300">
                        <div class="p-4 pb-2 font-semibold text-center">Motor</div>
                        <div class="p-4 pt-2 text-center">
                          <i class="fa-solid fa-plug fa-2xl"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-6">
                    <fwb-textarea label="Poznámka" size="lg" v-model="form.msg" rows="5" placeholder="Pár slovami popíšte vašu predstavu.." @keyup="validMessage"/>
                    <div v-if="getError('msg')" class="text-sm text-red-500 mt-2" v-text="getError('msg')"></div>
                  </div>
                </div>

              </panel-item>
              <panel-item>
                <div class="flex flex-col md:flex-row justify-between md:items-center gap-y-3">
                  <div>
                    <fwb-button type="button" color="alternative" @click="prevButton()">Späť</fwb-button>
                  </div>
                  <div class="ms-auto">
                    <fwb-button type="button" @click="sendOffer()" :loading="loading" :disabled="loading || success">Odoslať</fwb-button>
                  </div>
                </div>
              </panel-item>
            </template>

          </panel>

        </div>
      </div>

    </container-grid>

  </Container>

  <Footer/>

</template>