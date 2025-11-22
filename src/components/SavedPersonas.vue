<template>
  <div class="min-h-screen bg-black px-4 py-20">
    <div class="max-w-6xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Mes personas sauvegardés</h1>
        <p class="text-[#888]">Gérez vos personas créés</p>
      </div>

      <div v-if="isLoading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e81cff]"></div>
        <p class="text-[#888] mt-4">Chargement des personas...</p>
      </div>

      <div v-else-if="error" class="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
        {{ error }}
      </div>

      <div v-else-if="personas.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">📝</div>
        <p class="text-[#888] text-lg mb-6">Vous n'avez pas encore de personas sauvegardés</p>
        <router-link
          to="/form"
          class="inline-block px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-[#e81cff] hover:text-white transition"
        >
          Créer un persona
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="persona in personas"
          :key="persona._id"
          class="bg-[#111] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#e81cff] transition group"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <h3 class="text-xl font-bold text-white mb-2 group-hover:text-[#e81cff] transition">
                {{ persona.name }}
              </h3>
              <p class="text-[#888] text-sm">{{ persona.description }}</p>
            </div>
            <div
              class="w-3 h-3 rounded-full"
              :class="persona.isActive ? 'bg-green-500' : 'bg-gray-500'"
              :title="persona.isActive ? 'Actif' : 'Inactif'"
            ></div>
          </div>

          <div class="space-y-2 mb-4">
            <div v-if="persona.tone" class="flex items-center gap-2 text-sm">
              <span class="text-[#666]">Ton:</span>
              <span class="text-white">{{ persona.tone }}</span>
            </div>
            <div v-if="persona.style" class="flex items-center gap-2 text-sm">
              <span class="text-[#666]">Style:</span>
              <span class="text-white">{{ persona.style }}</span>
            </div>
            <div v-if="persona.keywords && persona.keywords.length > 0" class="flex flex-wrap gap-2 mt-3">
              <span
                v-for="keyword in persona.keywords"
                :key="keyword"
                class="px-2 py-1 bg-[#1a1a1a] border border-[#333] rounded text-xs text-[#888]"
              >
                {{ keyword }}
              </span>
            </div>
          </div>

          <div class="text-xs text-[#666] mb-4">
            Créé le {{ formatDate(persona.createdAt) }}
          </div>

          <div class="flex gap-2">
            <button
              @click="toggleActive(persona)"
              class="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition"
              :class="persona.isActive
                ? 'bg-[#1e1e1e] text-[#888] hover:bg-[#2a2a2a]'
                : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'"
            >
              {{ persona.isActive ? 'Désactiver' : 'Activer' }}
            </button>
            <button
              @click="deletePersona(persona._id)"
              class="py-2 px-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 text-sm font-medium transition"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import apiService from '../services/api.js'
import authService from '../services/authService.js'

const router = useRouter()
const personas = ref([])
const isLoading = ref(false)
const error = ref(null)

onMounted(() => {
  if (!authService.isAuthenticated()) {
    router.push('/login')
    return
  }
  loadPersonas()
})

async function loadPersonas() {
  isLoading.value = true
  error.value = null

  try {
    const result = await apiService.getSavedPersonas()
    if (result.success) {
      personas.value = result.data
    } else {
      error.value = result.error || 'Erreur lors du chargement'
    }
  } catch (err) {
    console.error('Erreur lors du chargement des personas:', err)
    error.value = err.message || 'Impossible de charger les personas'
  } finally {
    isLoading.value = false
  }
}

async function toggleActive(persona) {
  try {
    const result = await apiService.updateSavedPersona(persona._id, {
      ...persona,
      isActive: !persona.isActive
    })

    if (result.success) {
      persona.isActive = !persona.isActive
    }
  } catch (err) {
    console.error('Erreur lors de la mise à jour:', err)
    error.value = 'Impossible de mettre à jour le persona'
  }
}

async function deletePersona(id) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce persona ?')) {
    return
  }

  try {
    const result = await apiService.deleteSavedPersona(id)
    if (result.success) {
      personas.value = personas.value.filter(p => p._id !== id)
    }
  } catch (err) {
    console.error('Erreur lors de la suppression:', err)
    error.value = 'Impossible de supprimer le persona'
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
