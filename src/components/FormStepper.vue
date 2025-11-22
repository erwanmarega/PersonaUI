<template>
  <div>
    <div class="px-4">
      <burger-menu :menuItems="menuItems"/>
    </div>
    <div v-if="step === 1 && !personaResult" class="min-h-screen flex items-center justify-center bg-black px-4">
      <div class="w-full max-w-sm bg-[#111] border border-[#2a2a2a] rounded-2xl px-6 py-8 shadow-lg relative">
        <h2 class="text-2xl font-bold text-white text-center mb-2">Créez un persona avec l'IA</h2>
        <p class="text-sm text-[#888] text-center mb-6">
          Définissez les critères de votre projet
        </p>

        <form class="space-y-4" @submit.prevent="handleGenerate">
          <input
            v-model="criteria.projectType"
            type="text"
            required
            placeholder="Type de projet (ex: application mobile)"
            class="w-full px-4 py-2.5 rounded-md bg-black border border-[#333] text-white placeholder:text-[#666] focus:outline-none focus:border-[#40c9ff] transition"
          />
          <input
            v-model="criteria.targetAudience"
            type="text"
            required
            placeholder="Audience cible (ex: jeunes professionnels)"
            class="w-full px-4 py-2.5 rounded-md bg-black border border-[#333] text-white placeholder:text-[#666] focus:outline-none focus:border-[#40c9ff] transition"
          />
          <input
            v-model="criteria.industry"
            type="text"
            required
            placeholder="Secteur d'activité (ex: finance)"
            class="w-full px-4 py-2.5 rounded-md bg-black border border-[#333] text-white placeholder:text-[#666] focus:outline-none focus:border-[#40c9ff] transition"
          />
          <textarea
            v-model="criteria.goals"
            rows="4"
            required
            placeholder="Objectifs du projet (ex: simplifier la gestion de budget)"
            class="w-full px-4 py-2.5 rounded-md bg-black border border-[#333] text-white placeholder:text-[#666] focus:outline-none focus:border-[#40c9ff] resize-none transition"
          ></textarea>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-2.5 mt-2 rounded-md bg-white text-black font-medium hover:bg-[#e81cff] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Génération en cours...' : 'Générer le persona' }}
          </button>
        </form>

        <div v-if="error" class="mt-4 p-3 rounded-md bg-red-500/10 border border-red-500/30">
          <p class="text-red-400 text-sm">{{ error }}</p>
        </div>
      </div>
    </div>

    <div v-if="personaResult && personaResult.success" class="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 py-8">
      <div class="w-full max-w-3xl bg-[#111] border border-[#2a2a2a] rounded-2xl px-10 py-10 shadow-lg">
        <h2 class="text-3xl font-bold text-white text-center mb-3">Persona généré</h2>
        <p class="text-sm text-[#888] text-center mb-8">
          Vous pouvez éditer les informations ci-dessous
        </p>

        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-5">
            <div>
              <label class="text-sm font-medium text-[#888] mb-2 block">Nom</label>
              <input
                v-model="editablePersona.nom"
                type="text"
                class="w-full px-4 py-3 rounded-lg bg-black border border-[#333] text-white focus:outline-none focus:border-[#40c9ff] transition"
              />
            </div>
            <div>
              <label class="text-sm font-medium text-[#888] mb-2 block">Âge</label>
              <input
                v-model="editablePersona.age"
                type="number"
                class="w-full px-4 py-3 rounded-lg bg-black border border-[#333] text-white focus:outline-none focus:border-[#40c9ff] transition"
              />
            </div>
          </div>

          <div>
            <label class="text-sm font-medium text-[#888] mb-2 block">Profession</label>
            <input
              v-model="editablePersona.profession"
              type="text"
              class="w-full px-4 py-3 rounded-lg bg-black border border-[#333] text-white focus:outline-none focus:border-[#40c9ff] transition"
            />
          </div>

          <div class="border-t border-[#2a2a2a] my-6"></div>

          <div>
            <label class="text-sm font-medium text-[#888] mb-2 block">Objectif utilisateur</label>
            <textarea
              v-model="editablePersona.objectifUtilisateur"
              rows="3"
              class="w-full px-4 py-3 rounded-lg bg-black border border-[#333] text-white focus:outline-none focus:border-[#40c9ff] resize-none transition"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="text-sm font-medium text-[#888] mb-2 block">Frustrations</label>
              <textarea
                v-model="frustrationsText"
                rows="4"
                class="w-full px-4 py-3 rounded-lg bg-black border border-[#333] text-white focus:outline-none focus:border-[#40c9ff] resize-none transition"
                placeholder="Une frustration par ligne"
              ></textarea>
            </div>

            <div>
              <label class="text-sm font-medium text-[#888] mb-2 block">Motivations</label>
              <textarea
                v-model="motivationsText"
                rows="4"
                class="w-full px-4 py-3 rounded-lg bg-black border border-[#333] text-white focus:outline-none focus:border-[#40c9ff] resize-none transition"
                placeholder="Une motivation par ligne"
              ></textarea>
            </div>
          </div>

          <div>
            <label class="text-sm font-medium text-[#888] mb-2 block">Citation</label>
            <input
              v-model="editablePersona.citation"
              type="text"
              class="w-full px-4 py-3 rounded-lg bg-black border border-[#333] text-white italic focus:outline-none focus:border-[#40c9ff] transition"
            />
          </div>

          <div class="border-t border-[#2a2a2a] my-6"></div>

          <div class="grid grid-cols-2 gap-5">
            <div>
              <label class="text-sm font-medium text-[#888] mb-2 block">Niveau technique</label>
              <select
                v-model="editablePersona.niveauTechnique"
                class="w-full px-4 py-3 rounded-lg bg-black border border-[#333] text-white focus:outline-none focus:border-[#40c9ff] transition"
              >
                <option value="débutant">Débutant</option>
                <option value="intermédiaire">Intermédiaire</option>
                <option value="avancé">Avancé</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-medium text-[#888] mb-2 block">Appareil préféré</label>
              <select
                v-model="editablePersona.appareilPrefere"
                class="w-full px-4 py-3 rounded-lg bg-black border border-[#333] text-white focus:outline-none focus:border-[#40c9ff] transition"
              >
                <option value="mobile">Mobile</option>
                <option value="desktop">Desktop</option>
                <option value="tablette">Tablette</option>
              </select>
            </div>
          </div>

          <div>
            <label class="text-sm font-medium text-[#888] mb-2 block">Contexte d'utilisation</label>
            <textarea
              v-model="editablePersona.contexteUtilisation"
              rows="3"
              class="w-full px-4 py-3 rounded-lg bg-black border border-[#333] text-white focus:outline-none focus:border-[#40c9ff] resize-none transition"
            ></textarea>
          </div>

          <div>
            <label class="text-sm font-medium text-[#888] mb-2 block">Objectif business</label>
            <input
              v-model="editablePersona.objectifBusiness"
              type="text"
              class="w-full px-4 py-3 rounded-lg bg-black border border-[#333] text-white focus:outline-none focus:border-[#40c9ff] transition"
            />
          </div>

          <div class="border-t border-[#2a2a2a] my-6"></div>

          <div class="space-y-4 pt-2">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                @click="resetForm"
                type="button"
                class="py-3 rounded-lg bg-[#1e1e1e] text-[#aaa] border border-[#333] hover:bg-[#2a2a2a] hover:border-[#444] transition font-medium"
              >
                Créer un nouveau persona
              </button>
              <button
                @click="savePersona"
                type="button"
                class="py-3 rounded-lg bg-white text-black font-medium hover:bg-[#40c9ff] hover:text-white transition"
              >
                Sauvegarder
              </button>
            </div>
            <button
              @click="generateUxTemplate"
              type="button"
              :disabled="isGeneratingTemplate"
              class="w-full py-3 rounded-lg bg-gradient-to-r from-[#40c9ff] to-[#e81cff] text-white font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {{ isGeneratingTemplate ? 'Génération du template...' : '✨ Transformer en template UX (SVG)' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import apiService from '../services/api.js'
import authService from '../services/authService.js'
import BurgerMenu from './BurgerMenu.vue'

const step = ref(1)
const isLoading = ref(false)
const isGeneratingTemplate = ref(false)
const error = ref(null)

const menuItems = [
  {
    label: 'Accueil',
    url: '/',
    icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>'
  },
  {
    label: 'Créer un persona',
    url: '/form',
    icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>'
  },
  {
    label: 'Mes personas',
    url: '/saved-personas',
    icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>'
  }
]

const criteria = reactive({
  projectType: '',
  targetAudience: '',
  industry: '',
  goals: ''
})

const personaResult = ref(null)
const editablePersona = ref({})

const frustrationsText = computed({
  get: () => editablePersona.value.frustrations?.join('\n') || '',
  set: (val) => {
    editablePersona.value.frustrations = val.split('\n').filter(line => line.trim())
  }
})

const motivationsText = computed({
  get: () => editablePersona.value.motivations?.join('\n') || '',
  set: (val) => {
    editablePersona.value.motivations = val.split('\n').filter(line => line.trim())
  }
})

async function handleGenerate() {
  isLoading.value = true
  error.value = null

  try {
    const result = await apiService.generatePersona(criteria)

    if (result.success) {
      personaResult.value = result
      editablePersona.value = { ...result.persona }
      step.value = 2
    } else {
      error.value = result.error || 'Erreur lors de la génération'
    }
  } catch (err) {
    error.value = err.message || 'Impossible de générer le persona. Vérifiez que le backend est démarré.'
  } finally {
    isLoading.value = false
  }
}

async function savePersona() {
  // Vérifier que l'utilisateur est connecté
  if (!authService.isAuthenticated()) {
    error.value = 'Vous devez être connecté pour sauvegarder un persona'
    setTimeout(() => {
      window.location.href = '/login'
    }, 2000)
    return
  }

  isLoading.value = true
  error.value = null

  try {
    // Debug: voir les données du persona
    console.log('💾 editablePersona.value:', editablePersona.value)

    // Préparer les données du persona pour la sauvegarde
    const personaData = {
      name: editablePersona.value.nom || 'Persona sans nom',
      description: `${editablePersona.value.profession || 'Profession inconnue'} - ${editablePersona.value.age || 'N/A'} ans`,
      tone: editablePersona.value.niveauTechnique || '',
      style: editablePersona.value.appareilPrefere || '',
      context: editablePersona.value.contexteUtilisation || '',
      keywords: [
        editablePersona.value.profession,
        editablePersona.value.appareilPrefere,
        editablePersona.value.niveauTechnique
      ].filter(Boolean)
    }

    console.log('📤 Données à envoyer:', personaData)

    const result = await apiService.savePersona(personaData)

    if (result.success) {
      alert('✅ Persona sauvegardé avec succès !')
      console.log('💾 Persona sauvegardé:', result.data)
    } else {
      error.value = result.error || 'Erreur lors de la sauvegarde'
    }
  } catch (err) {
    console.error('Erreur lors de la sauvegarde:', err)
    error.value = err.message || 'Impossible de sauvegarder le persona. Vérifiez votre connexion.'
  } finally {
    isLoading.value = false
  }
}

function resetForm() {
  personaResult.value = null
  editablePersona.value = {}
  criteria.projectType = ''
  criteria.targetAudience = ''
  criteria.industry = ''
  criteria.goals = ''
  step.value = 1
  error.value = null
}

async function generateUxTemplate() {
  isGeneratingTemplate.value = true
  error.value = null

  try {
    const result = await apiService.generateUxTemplate(editablePersona.value)

    if (result.success) {
      const blob = new Blob([result.svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = result.filename || 'persona-template.svg'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url)

      alert('Template UX généré avec succès ! Le fichier SVG a été téléchargé.')
    } else {
      error.value = result.error || 'Erreur lors de la génération du template'
    }
  } catch (err) {
    error.value = err.message || 'Impossible de générer le template UX'
  } finally {
    isGeneratingTemplate.value = false
  }
}
</script>
