<template>
    <div
      v-if="isDesktop"
      ref="cursor"
      class="fixed top-0 left-0 w-5 h-5 pointer-events-none z-[9999] transition-transform duration-150 ease-out"
      :style="{
        transform: `translate3d(${coords.x}px, ${coords.y}px, 0) scale(${scale})`,
        opacity: opacity
      }"
    >
      <!-- Minimal neon ring -->
      <div
        class="w-full h-full rounded-full border-2 border-[#40c9ff]"
        style="box-shadow: 0 0 8px rgba(64, 201, 255, 0.4), 0 0 20px rgba(232, 28, 255, 0.2);"
      ></div>
  
      <!-- Simplified particle trail -->
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="absolute w-0.5 h-0.5 rounded-full"
        :style="{
          left: `${particle.x}px`,
          top: `${particle.y}px`,
          background: particle.color,
          opacity: particle.opacity,
          transform: `scale(${particle.scale})`,
          transition: 'all 0.6s ease-out'
        }"
      ></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const coords = ref({ x: 0, y: 0 })
  const scale = ref(1)
  const opacity = ref(1)
  const particles = ref([])
  const isDesktop = ref(true)
  
  function updatePosition(e) {
    if (!isDesktop.value) return
  
    const prevX = coords.value.x
    const prevY = coords.value.y
  
    const newX = e.clientX - 10
    const newY = e.clientY - 10
  
    coords.value.x += (newX - coords.value.x) * 0.2
    coords.value.y += (newY - coords.value.y) * 0.2
  
    if (Math.abs(coords.value.x - prevX) > 1 || Math.abs(coords.value.y - prevY) > 1) {
      particles.value.push({
        id: Date.now() + Math.random(),
        x: coords.value.x + 8,
        y: coords.value.y + 8,
        color: Math.random() > 0.5 ? '#e81cff' : '#40c9ff',
        opacity: 0.7,
        scale: Math.random() * 0.3 + 0.3,
      })
  
      if (particles.value.length > 8) particles.value.shift()
      particles.value.forEach(p => {
        p.opacity -= 0.04
        p.scale -= 0.04
      })
      particles.value = particles.value.filter(p => p.opacity > 0 && p.scale > 0)
    }
  
    const elements = document.elementsFromPoint(e.clientX, e.clientY)
    scale.value = elements.some(el =>
      ['BUTTON', 'INPUT', 'TEXTAREA', 'A'].includes(el.tagName)
    ) ? 1.3 : 1
  }
  
  function checkScreenSize() {
    isDesktop.value = window.innerWidth >= 768
  }
  
  onMounted(() => {
    checkScreenSize()
    if (isDesktop.value) {
      window.addEventListener('mousemove', updatePosition)
    }
    window.addEventListener('resize', checkScreenSize)
  
    document.addEventListener('mouseover', (e) => {
      if (['BUTTON', 'INPUT', 'TEXTAREA', 'A'].includes(e.target.tagName)) {
        opacity.value = 0.9
      }
    })
  
    document.addEventListener('mouseout', (e) => {
      if (['BUTTON', 'INPUT', 'TEXTAREA', 'A'].includes(e.target.tagName)) {
        opacity.value = 1
      }
    })
  })
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', updatePosition)
    window.removeEventListener('resize', checkScreenSize)
  })
  </script>
  
  <style scoped>
  body {
    cursor: none;
  }
  </style>