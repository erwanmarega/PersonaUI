<template>
  <nav class="fixed top-0 left-0 w-full flex justify-between items-center px-4 sm:px-8 py-6 bg-black z-50 border-b border-[#1e1e1e]">
    <div class="flex items-center gap-3">
      <router-link to="/">
        <img src="/LogoPersonaUi.png" alt="Logo" class="w-12 h-12 sm:w-14 sm:h-14 logo-animation hover:scale-110 transition-transform duration-300" />
      </router-link>
      <div class="text-xl sm:text-2xl font-bold tracking-tight">PersonaUI</div>
    </div>

    <div class="hidden md:flex items-center space-x-6">
      <a href="#features" class="text-[#717171] hover:text-[#e81cff] transition">Fonctionnalités</a>
      <a href="#about" class="text-[#717171] hover:text-[#e81cff] transition">À propos</a>
      <router-link
        to="/login"
        class="px-5 py-2 bg-[#313131] text-[#717171] rounded-full hover:bg-[#e81cff] hover:text-white transition shadow-md"
      >
        Commencer
      </router-link>
    </div>

    <button
      class="md:hidden text-[#717171] hover:text-[#e81cff] focus:outline-none"
      @click="toggleMenu"
      aria-label="Toggle navigation menu"
    >
      <svg
        class="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          v-if="!isMenuOpen"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <div
      v-if="isMenuOpen"
      class="md:hidden absolute top-full left-0 w-full bg-black border-b border-[#1e1e1e] shadow-lg z-40"
    >
      <div class="flex flex-col items-center py-4 space-y-4">
        <a
          href="#features"
          class="text-[#717171] hover:text-[#e81cff] transition text-lg"
          @click="toggleMenu"
        >
          Fonctionnalités
        </a>
        <a
          href="#about"
          class="text-[#717171] hover:text-[#e81cff] transition text-lg"
          @click="toggleMenu"
        >
          À propos
        </a>
        <router-link
          to="/login"
          class="px-5 py-2 bg-[#313131] text-[#717171] rounded-full hover:bg-[#e81cff] hover:text-white transition text-lg"
          @click="toggleMenu"
        >
          Commencer
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
.logo-animation {
  animation: float 3s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(232, 28, 255, 0.3));
}
.logo-animation:hover {
  filter: drop-shadow(0 0 15px rgba(232, 28, 255, 0.5));
}
</style>