<template>
  <Navbar />
    <div class="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div class="w-full max-w-sm bg-[#111] border border-[#2a2a2a] rounded-2xl px-6 py-8 shadow-lg text-white">
        <h2 class="text-xl font-bold text-center mb-1">Contexte d’usage</h2>
        <p class="text-sm text-[#888] text-center mb-6">
          Terminez le profil en précisant son environnement
        </p>
  
        <form class="space-y-4" @submit.prevent="$emit('submit')">
          <textarea
            v-model="formData.contexte"
            required
            rows="4"
            placeholder="Contexte d’utilisation..."
            class="w-full px-4 py-2.5 rounded-md bg-black border border-[#333] text-white placeholder:text-[#666] focus:outline-none focus:border-[#40c9ff] resize-none transition"
          ></textarea>
  
          <select
            v-model="formData.appareil"
            required
            class="w-full px-4 py-2.5 rounded-md bg-black border border-[#333] text-white focus:outline-none focus:border-[#40c9ff] transition"
          >
            <option disabled value="">Appareil préféré</option>
            <option value="Mobile">Mobile</option>
            <option value="Desktop">Desktop</option>
            <option value="Tablette">Tablette</option>
          </select>
  
          <input
            v-model="formData.business"
            type="text"
            required
            placeholder="Objectif business (ex : rétention)"
            class="w-full px-4 py-2.5 rounded-md bg-black border border-[#333] text-white placeholder:text-[#666] focus:outline-none focus:border-[#40c9ff] transition"
          />
  
          <div class="flex justify-between gap-4 pt-2">
            <button
              type="button"
              @click="$emit('prev')"
              class="w-1/2 py-2 rounded-md bg-[#1e1e1e] text-[#aaa] border border-[#333] hover:bg-[#2a2a2a] transition"
            >
              Retour
            </button>
            <button
              type="submit"
              class="w-1/2 py-2 rounded-md bg-white text-black font-medium hover:bg-[#e81cff] hover:text-white transition"
            >
              Générer
            </button>
          </div>
        </form>
  
        <!-- Bulles étape -->
        <div class="mt-6 flex flex-col items-center gap-2">
          <div class="flex gap-2">
            <div class="w-6 h-1.5 rounded-full bg-[#414141]"></div>
            <div class="w-6 h-1.5 rounded-full bg-[#414141]"></div>
            <div class="w-6 h-1.5 rounded-full bg-[#e81cff] animate-pulse"></div>
          </div>
          <p class="text-xs text-[#717171]">Étape 3 sur 3 — Contexte d’usage</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps(['formData'])
  defineEmits(['submit', 'prev'])
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
  