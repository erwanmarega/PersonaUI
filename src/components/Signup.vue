<template>
  <div class="min-h-screen bg-black px-4 py-20 flex items-center justify-center relative">
    <div class="absolute top-4 left-4">
        <router-link to="/" class="text-[#717171] hover:text-[#e81cff] transition inline-flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à l'accueil
        </router-link>
  </div>
    <div class="login-container w-full max-w-md">
      <div class="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl p-8 shadow-2xl">
        <form @submit.prevent="handleLogin">
            <div>
                <H1 class="text-white text-2xl font-bold mb-4">Signup</H1>
            </div>
          <div class="mb-6">
            <label for="email" class="block text-sm font-medium text-[#717171] mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="votre@email.com"
              class="w-full px-4 py-3 bg-[#131313] border border-[#1e1e1e] rounded-lg text-white placeholder-[#4a4a4a] focus:outline-none focus:border-[#e81cff] focus:ring-2 focus:ring-[#e81cff]/20 transition-all"
            />
          </div>

          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-[#717171] mb-2">
              Mot de passe
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="w-full px-4 py-3 bg-[#131313] border border-[#1e1e1e] rounded-lg text-white placeholder-[#4a4a4a] focus:outline-none focus:border-[#e81cff] focus:ring-2 focus:ring-[#e81cff]/20 transition-all"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-[#717171] hover:text-[#e81cff] transition"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between mb-6">
            <label class="flex items-center cursor-pointer">
              <input
                v-model="rememberMe"
                type="checkbox"
                class="w-4 h-4 bg-[#131313] border-[#1e1e1e] rounded text-[#e81cff] focus:ring-[#e81cff] focus:ring-2"
              />
              <span class="ml-2 text-sm text-[#717171]">Se souvenir de moi</span>
            </label>
            <a href="#" class="text-sm text-[#e81cff] hover:underline">
              Mot de passe oublié ?
            </a>
          </div>

          <button
            type="submit"
            class="w-full py-3 bg-[#131313] text-white font-semibold rounded-lg hover:bg-[#1a1a1a] hover:border-[#e81cff] transition-all duration-300"
          >
            S'inscrire
          </button>
        </form>

        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-[#1e1e1e]"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-[#0a0a0a] text-[#717171]">ou</span>
          </div>
        </div>

        <button
          type="button"
          @click="handleGoogleLogin"
          class="w-full py-3 bg-[#131313] border border-[#1e1e1e] text-white font-medium rounded-lg hover:bg-[#1a1a1a] hover:border-[#e81cff] transition-all duration-300 flex items-center justify-center gap-3"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuer avec Google
        </button>

        <div class="text-center mt-6">
          <p class="text-[#717171]">
            Vous avez un compte ?
            <router-link to="/login" class="text-[#e81cff] hover:underline font-medium">
              Connectez-vous
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);

const handleLogin = () => {
  console.log('Login:', {
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value
  });

  router.push('/form');
};

const handleGoogleLogin = () => {
  console.log('Google login');
};
</script>

<style scoped>
.login-container {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-animation {
  animation: float 3s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(232, 28, 255, 0.3));
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

input[type="checkbox"]:checked {
  background-color: #e81cff;
  border-color: #e81cff;
}
</style>
