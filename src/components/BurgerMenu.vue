<template>
  <div>
    <button
      @click="toggleMenu"
      :class="{ 'burger-active': isOpen }"
      class="relative p-2 focus:outline-none z-50 focus:ring-2 focus:ring-purple-500 rounded-lg transition-all"
      aria-label="Toggle menu"
      aria-expanded="isOpen"
    >
      <div class="w-6 h-5 flex flex-col justify-between">
        <span class="burger-line line-1 block w-full h-0.5 bg-white rounded-full transition-all duration-300"></span>
        <span class="burger-line line-2 block w-full h-0.5 bg-white rounded-full transition-all duration-300"></span>
        <span class="burger-line line-3 block w-full h-0.5 bg-white rounded-full transition-all duration-300"></span>
      </div>
    </button>

    <transition name="fade">
      <div
        v-if="isOpen"
        @click="closeMenu"
      ></div>
    </transition>

    <transition name="slide">
      <nav
        v-if="isOpen"
        class="fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl transform transition-transform duration-300 flex flex-col"
      >
        <div class="p-8 pt-20 flex-1">
          <ul class="space-y-2">
            <li
              v-for="(item, index) in menuItems"
              :key="index"
              :style="{ transitionDelay: `${index * 100}ms` }"
              class="menu-item opacity-0 translate-x-4"
              :class="{ 'opacity-100 translate-x-0': isOpen }"
            >
              <a
                :href="item.url"
                @click="handleMenuClick"
                class="block px-4 py-3 text-lg text-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white rounded-lg transition-all duration-300 transform hover:translate-x-2"
              >
                <span class="flex items-center gap-3">
                  <span v-if="item.icon" v-html="item.icon"></span>
                  {{ item.label }}
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div class="p-8 border-t border-gray-200">
          <button
            @click="openModal"
            class="flex items-center gap-3 w-full px-4 py-3 text-lg text-gray-800 hover:bg-[#5d5d5d] hover:text-white rounded-lg transition-all duration-300"
          >
            <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
            </svg>
            <span>Paramètres</span>
          </button>
        </div>
      </nav>
    </transition>

    <transition name="modal-fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click="closeModal"
      >
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>

        <div
          class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all"
          @click.stop
        >
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Paramètres</h2>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fermer"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <p class="text-gray-600">Contenu de la modale des paramètres</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BurgerMenu',

  props: {
    menuItems: {
      type: Array,
      default: () => [

      ]
    }
  },

  data() {
    return {
      isOpen: false,
      isModalOpen: false
    }
  },

  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
      this.toggleBodyScroll()
    },

    closeMenu() {
      this.isOpen = false
      this.toggleBodyScroll()
    },

    handleMenuClick(event) {
      setTimeout(() => {
        this.closeMenu()
      }, 300)
    },

    toggleBodyScroll() {
      if (this.isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },

    handleEscape(event) {
      if (event.key === 'Escape') {
        if (this.isModalOpen) {
          this.closeModal()
        } else if (this.isOpen) {
          this.closeMenu()
        }
      }
    },

    openModal() {
      this.isModalOpen = true
      document.body.style.overflow = 'hidden'
    },

    closeModal() {
      this.isModalOpen = false
      if (!this.isOpen) {
        document.body.style.overflow = ''
      }
    }
  },

  mounted() {
    window.addEventListener('keydown', this.handleEscape)
  },

  beforeUnmount() {
    window.removeEventListener('keydown', this.handleEscape)
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
.burger-active .line-1 {
  transform: translateY(8.5px) rotate(45deg);
}

.burger-active .line-2 {
  opacity: 0;
}

.burger-active .line-3 {
  transform: translateY(-8.5px) rotate(-45deg);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.menu-item {
  transition: all 0.3s ease;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .relative,
.modal-fade-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-fade-enter-from .relative {
  transform: scale(0.9);
  opacity: 0;
}

.modal-fade-leave-to .relative {
  transform: scale(0.9);
  opacity: 0;
}
</style>
