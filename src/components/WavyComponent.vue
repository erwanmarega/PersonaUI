<template>
    <div :class="['h-screen flex flex-col items-center justify-center', containerClassName]">
      <canvas
        class="absolute inset-0 z-0"
        ref="canvasRef"
        id="canvas"
        :style="isSafari ? { filter: `blur(${blur}px)` } : {}"
      ></canvas>
      <div :class="['relative z-10', className]" v-bind="$attrs">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted, computed } from 'vue';
  import { createNoise3D } from 'simplex-noise';
  
  const props = withDefaults(defineProps<{
    className?: string;
    containerClassName?: string;
    colors?: string[];
    waveWidth?: number;
    backgroundFill?: string;
    blur?: number;
    speed?: 'slow' | 'fast';
    waveOpacity?: number;
  }>(), {
    className: '',
    containerClassName: '',
    colors: () => ['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee'],
    waveWidth: 50,
    backgroundFill: 'black',
    blur: 10,
    speed: 'fast',
    waveOpacity: 0.5,
  });
  
  const canvasRef = ref<HTMLCanvasElement | null>(null);
  let ctx: CanvasRenderingContext2D | null = null;
  let w: number, h: number, nt: number;
  const noise = createNoise3D();
  
  let animationId: number;
  
  const isSafari = computed(() => {
    if (typeof window === 'undefined') return false;
    return navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
  });
  
  const getSpeed = () => {
    switch (props.speed) {
      case 'slow':
        return 0.001;
      case 'fast':
        return 0.002;
      default:
        return 0.001;
    }
  };
  
  const init = () => {
    if (!canvasRef.value) return;
    ctx = canvasRef.value.getContext('2d');
    if (!ctx) return;
  
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${props.blur}px)`;
    nt = 0;
  
    const onResize = () => {
      if (!ctx) return;
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${props.blur}px)`;
    };
    window.addEventListener('resize', onResize);
  
    onUnmounted(() => {
      window.removeEventListener('resize', onResize);
    });
  
    render();
  };
  
  const drawWave = (n: number) => {
    if (!ctx) return;
    nt += getSpeed();
    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = props.waveWidth;
      ctx.strokeStyle = props.colors[i % props.colors.length];
      for (let x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };
  
  const render = () => {
    if (!ctx) return;
    ctx.fillStyle = props.backgroundFill;
    ctx.globalAlpha = props.waveOpacity;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };
  
  onMounted(() => {
    init();
  });
  
  onUnmounted(() => {
    cancelAnimationFrame(animationId);
  });
  </script>
  
  <style scoped>
  </style>