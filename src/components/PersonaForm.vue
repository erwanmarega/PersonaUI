<template>
  <Navbar />
    <div class="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div class="w-full max-w-sm bg-[#111] border border-[#2a2a2a] rounded-2xl px-6 py-8 shadow-lg relative">
        <h2 class="text-2xl font-bold text-white text-center mb-2">Créez un persona</h2>
        <p class="text-sm text-[#888] text-center mb-6">
          Remplissez les informations ci-dessous pour commencer
        </p>
  
        <form class="space-y-4" @submit.prevent="$emit('next')">
          <input
            v-model="formData.name"
            type="text"
            required
            placeholder="Nom"
            class="w-full px-4 py-2.5 rounded-md bg-black border border-[#333] text-white placeholder:text-[#666] focus:outline-none focus:border-[#40c9ff] transition"
          />
          <input
            v-model="formData.age"
            type="number"
            required
            placeholder="Âge"
            class="w-full px-4 py-2.5 rounded-md bg-black border border-[#333] text-white placeholder:text-[#666] focus:outline-none focus:border-[#40c9ff] transition"
          />
          <input
            v-model="formData.profession"
            type="text"
            required
            placeholder="Profession"
            class="w-full px-4 py-2.5 rounded-md bg-black border border-[#333] text-white placeholder:text-[#666] focus:outline-none focus:border-[#40c9ff] transition"
          />
          <textarea
            v-model="formData.objectives"
            rows="4"
            required
            placeholder="Objectifs de l'utilisateur"
            class="w-full px-4 py-2.5 rounded-md bg-black border border-[#333] text-white placeholder:text-[#666] focus:outline-none focus:border-[#40c9ff] resize-none transition"
          ></textarea>
  
          <button
            type="submit"
            class="w-full py-2.5 mt-2 rounded-md bg-white text-black font-medium hover:bg-[#e81cff] hover:text-white transition"
          >
            Continuer
          </button>
        </form>
  
        <!-- ✅ Bulles étapes -->
        <div class="mt-6 flex flex-col items-center gap-2">
          <div class="flex gap-2">
            <div class="w-6 h-1.5 rounded-full bg-[#e81cff] animate-pulse"></div>
            <div class="w-6 h-1.5 rounded-full bg-[#414141]"></div>
            <div class="w-6 h-1.5 rounded-full bg-[#414141]"></div>
          </div>
          <p class="text-xs text-[#717171]">Étape 1 sur 3 — Informations de base</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps(['formData'])
  defineEmits(['next'])
  import Navbar from './Navbar.vue';
  </script>
  
  <style scoped>
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  .animate-pulse {
    animation: pulse 2s ease-in-out infinite;
  }
  </style>
  