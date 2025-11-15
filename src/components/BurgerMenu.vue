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
        class="fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl transform transition-transform duration-300"
      >
        <div class="p-8 pt-20">
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
      </nav>
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
      isOpen: false
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
      if (event.key === 'Escape' && this.isOpen) {
        this.closeMenu()
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
</style>