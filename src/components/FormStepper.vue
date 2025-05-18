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
  
  function handleSubmit() {
    console.log("🎯 Données complètes :", formData)
  }
  </script>
  