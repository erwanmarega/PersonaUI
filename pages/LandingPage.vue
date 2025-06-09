<template>
  <WavyComponent>
    <section class="bg-transparent text-white px-4 sm:px-6 py-16 space-y-16">
      <Navbar />

      <div class="text-center max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[100vh] 
  mt-[22rem] sm:mt-[8rem] md:mt-[12rem] lg:mt-[16rem] 
  pt-[22rem] sm:pt-64 md:pt-72 lg:pt-80">


        <p class="text-xs sm:text-sm bg-[#2a2a2a] border border-[#414141] text-[#e81cff] px-4 py-2 rounded-full inline-block mb-6">
          🚀 Générez vos personas en quelques clics
        </p>
        <h1 class="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Créez des Personas UX propulsés par l'IA
        </h1>
        <p class="text-base sm:text-lg md:text-xl mb-10 font-light max-w-xl mx-auto">
          PersonaUI vous aide à concevoir des personas clairs, convaincants et exportables en PDF, pour améliorer vos projets UX sans prise de tête.
        </p>
        <router-link
          to="/form"
          class="inline-block px-8 py-4 rounded-full font-semibold text-base bg-[#313131] border border-[#414141] text-[#717171] hover:bg-[#e81cff] hover:text-white hover:border-[#e81cff] transition-all shadow-lg hover:shadow-[#e81cff]/30 transform hover:-translate-y-1"
        >
          Créer un persona maintenant
        </router-link>
      </div>

      <section id="features" class="max-w-5xl mx-auto text-center space-y-12 px-4 sm:px-0">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">Fonctionnalités</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          <div class="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-xl">
            <h3 class="text-base sm:text-lg font-semibold mb-2 text-[#e81cff]">Formulaire en 3 étapes</h3>
            <p class="text-[#aaa] text-sm">Un parcours guidé pour saisir toutes les données essentielles d'un persona : infos, psychologie, contexte.</p>
          </div>
          <div class="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-xl">
            <h3 class="text-base sm:text-lg font-semibold mb-2 text-[#40c9ff]">Génération par IA</h3>
            <p class="text-[#aaa] text-sm">Les données saisies sont transformées en un persona complet, rédigé automatiquement grâce à l'IA.</p>
          </div>
          <div class="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-xl">
            <h3 class="text-base sm:text-lg font-semibold mb-2 text-white">Export PDF stylé</h3>
            <p class="text-[#aaa] text-sm">Téléchargez votre persona sous forme de document clair et design, prêt à intégrer vos livrables ou présentations UX.</p>
          </div>
        </div>
      </section>

      <section id="about" class="max-w-3xl mx-auto text-center px-4 sm:px-0">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-6">Pourquoi PersonaUI ?</h2>
        <p class="text-[#888] text-sm sm:text-base leading-relaxed">
          En UX design, les personas sont souvent négligés ou trop génériques. PersonaUI rend cette étape rapide, utile et agréable.
          Il ne s'agit pas seulement de remplir un document, mais de clarifier les besoins réels de vos utilisateurs et de rendre vos
          décisions plus centrées humainement. Simple à utiliser, complet, exportable : idéal pour les freelances, UX designers ou
          étudiants UX.
        </p>
      </section>

      <div class="text-center">
        <router-link
          to="/form"
          class="inline-block px-8 sm:px-10 py-4 mt-12 rounded-full font-semibold text-base bg-white text-black hover:bg-[#e81cff] hover:text-white transition"
        >
          Commencer maintenant →
        </router-link>
      </div>
    </section>
  </WavyComponent>
</template>

<script setup>
import Navbar from '../src/components/Navbar.vue';
import WavyComponent from '../src/components/WavyComponent.vue';
</script>

<style>
@keyframes float {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-5px) rotate(2deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
}

.logo-animation {
  animation: float 3s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(232, 28, 255, 0.3));
}

.logo-animation:hover {
  filter: drop-shadow(0 0 15px rgba(232, 28, 255, 0.5));
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 1.2s ease-out forwards;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
.animate-pulse {
  animation: pulse 2s infinite ease-in-out;
}

:root {
  background-color: black;
}

body {
  margin: 0;
  padding: 0;
  background-color: black;
  min-height: 100vh;
}
</style>
