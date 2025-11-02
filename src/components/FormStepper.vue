<template>
  <div>
    <PersonaForm
      v-if="step === 1"
      :formData="formData"
      @next="step++"
    />
    <PersonaPsychologie
      v-if="step === 2"
      :formData="formData"
      @prev="step--"
      @next="step++"
    />
    <PersonaContexte
      v-if="step === 3"
      :formData="formData"
      @prev="step--"
      @submit="handleSubmit"
    />

    <div v-if="personaResult" class="mt-4 p-4 border rounded">
      <h3>🎉 Persona généré :</h3>
      <pre>{{ personaResult }}</pre>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import PersonaForm from './PersonaForm.vue'
import PersonaPsychologie from './PersonaPsychologie.vue'
import PersonaContexte from './PersonaContexte.vue'

const step = ref(1)

const formData = reactive({
  name: '',
  age: '',
  profession: '',
  objectives: '',
  frustrations: '',
  motivations: '',
  citation: '',
  niveauTech: '',
  contexte: '',
  appareil: '',
  business: ''
})

const personaResult = ref(null)

async function handleSubmit() {
  console.log("🎯 Données complètes :", formData)

  try {
    const response = await fetch('http://localhost:3000/api/persona', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (!response.ok) throw new Error('Erreur backend')

    const data = await response.json()
    console.log('✅ Persona généré :', data)
    personaResult.value = data
  } catch (error) {
    console.error('❌ Erreur pendant la soumission :', error)
  }
}
</script>
