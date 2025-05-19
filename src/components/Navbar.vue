<template>
<section class="bg-black text-white px-6 py-16 space-y-32">
    <nav class="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-6 bg-black z-50 border-b border-[#1e1e1e]"> 
      <div class="flex items-center gap-3">
        <img src="/LogoPersonaUi.png" alt="Logo" class="w-14 h-14 logo-animation hover:scale-110 transition-transform duration-300" />
        <div class="text-2xl font-bold tracking-tight">PersonaUI</div>
      </div>
      <div class="space-x-6">
        <a href="#features" class="text-[#717171] hover:text-[#e81cff] transition">Fonctionnalités</a>
        <a href="#about" class="text-[#717171] hover:text-[#e81cff] transition">À propos</a>
        <router-link
          to="/form"
          class="px-5 py-2 bg-[#313131] text-[#717171] rounded-full hover:bg-[#e81cff] hover:text-white transition shadow-md"
        >
          Commencer
        </router-link>
      </div>
    </nav>
</section>
</template>
