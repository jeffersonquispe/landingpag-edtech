# Animaciones GSAP - Net Academy

## Resumen de Animaciones Añadidas

Se ha integrado **GSAP (GreenSock Animation Platform)** con ScrollTrigger para añadir dinamismo y micro-interacciones al landing page.

### 🎬 Animaciones del Hero

#### Aparición Escalonada al Cargar
- **Badge**: Fade-in + slide down (0.6s)
- **Título (h1)**: Fade-in + slide up (0.8s, -300ms delay)
- **Descripción**: Fade-in + slide up (0.7s, -400ms delay)
- **Botones**: Fade-in + slide up escalonado (0.6s, stagger 120ms, -300ms delay)
- **Trust Badges**: Scale-in con back.out easing (0.5s, stagger 80ms, -200ms delay)
- **Terminal Gráfico**: Scale-in + fade-in (0.8s, starts at 0ms)

**Archivo**: `src/hooks/useGSAPAnimations.ts::useHeroEntrance()`

---

### 📜 Scroll Reveals

#### Benefit Cards (Sección de Beneficios)
- Aparecen al scrollear con fade-in + slide up
- **Trigger**: Cuando el card entra en el viewport (top 80%)
- **Duration**: 0.7s por card
- **Easing**: power2.out
- **Selector**: `.benefit-card`

#### Pricing Cards (Sección de Planes)
- Aparecen escalonados al scrollear
- **Trigger**: Cuando la sección pricing entra en viewport (top 70%)
- **Duration**: 0.8s
- **Stagger**: 150ms entre cards
- **Easing**: power3.out
- **Selector**: `.pricing-card`

#### CTA Section Glow
- El fondo (glow) se anima al scrollear la sección
- **Trigger**: Cuando CTA está en el center
- **Animation**: Opacity y scale
- **Duration**: Scrubbed (tied to scroll)
- **Selector**: `.cta-glow`

**Archivo**: `src/hooks/useGSAPAnimations.ts::useScrollReveals()`

---

### 🎯 Micro-Interacciones

#### Hover Effects en Cards y Botones
- Todos los elementos con `data-interactive` tienen:
  - **Mouse Enter**: Slide up (-4px) suave
  - **Mouse Leave**: Vuelve a posición original
  - **Duration**: 300ms
  - **Easing**: power2.out

#### Click Effects en Botones
- **Mouse Down**: Scale 0.97 (15ms)
- **Mouse Up**: Scale 1.0 (15ms)
- Crea un efecto de "press" natural

**Archivo**: `src/hooks/useGSAPAnimations.ts::useCardMicroInteractions()`

---

### 🖥️ Terminal Lines Animation

Cada línea del terminal aparece con:
- **Delay**: i * 50ms (cascada)
- **Duration**: 0.4s
- **Animation**: Fade-in + slide left
- **Easing**: power2.out
- **Selector**: `.terminal-line`

**Archivo**: Animación inline en `src/app/page.tsx`

---

## 📦 Estructura de Archivos

```
src/
├── hooks/
│   └── useGSAPAnimations.ts      # Custom hooks para todas las animaciones
├── lib/
│   └── gsapConfig.ts             # Configuración centralizada de GSAP
├── app/
│   ├── page.tsx                  # Implementación de hooks
│   └── globals.css               # Estilos para animaciones y will-change
└── components/
    └── (Componentes sin cambios significativos)
```

---

## 🎨 Clases CSS Añadidas

### Elementos con Animaciones
- `.hero-badge` - Badge de hero
- `.hero-title` - Título principal
- `.hero-desc` - Descripción del hero
- `.hero-button` - Botones de acción (CTA)
- `.hero-terminal` - Gráfico de terminal
- `.trust-badge` - Badges de métricas
- `.benefit-card` - Cards de beneficios
- `.pricing-card` - Cards de precios
- `.cta-glow` - Glow del CTA section
- `.terminal-line` - Líneas del terminal
- `[data-interactive]` - Selector para micro-interacciones

---

## ⚙️ Configuración GSAP

### Plugins Registrados
- **ScrollTrigger**: Para animaciones ligadas al scroll

### Features Utilizados
- `gsap.timeline()` - Timelines sequenciales
- `gsap.from()` - Animaciones desde valores iniciales
- `gsap.to()` - Animaciones hacia valores finales
- `gsap.fromTo()` - Animaciones completas
- `ScrollTrigger` - Animaciones al scroll
- `stagger` - Cascadas de animaciones
- `overwrite: "auto"` - Manejo de tweens conflictivos

---

## 🚀 Performance

### Optimizaciones Implementadas
- `will-change: transform, opacity` en elementos animados
- `backface-visibility: hidden` para cards
- Uso de `transform` y `opacity` (GPU-accelerated)
- `scrub: 0.5` para smooth scroll animations
- Cleanup automático con `useGSAP` hook

### Recursos Añadidos
- `gsap` v3+ (último)
- `@gsap/react` - Hook wrapper para React/Next.js

---

## 🔄 Uso de Hooks

### En `page.tsx`

```typescript
const heroRef = useHeroEntrance();        // Hero animations
const scrollRef = useScrollReveals();      // Scroll reveals
const interactiveRef = useCardMicroInteractions(); // Hover/click

// Los refs se aplican a los elementos principales
<section ref={heroRef}> ... </section>
<div ref={scrollRef}> ... </div>
<div ref={interactiveRef}> ... </div>
```

---

## 🎨 Three.js 3D Element (Hero Background)

### Características
- **Geometría**: Icosaedro con material neon
- **Materiales**: Gradient de neon (Cyan → Magenta → Green)
- **Efectos de Luz**:
  - Ambient light (0.5 intensidad)
  - Point light cyan (1.0 intensidad)
  - Point light magenta (0.8 intensidad)
  - Point light green (0.6 intensidad)
- **Animaciones**:
  - Rotación continua en Z (12s cycle)
  - Pulsing emissive (3s, sine.inOut)
  - Scale breathing (Math.sin based)
  - Mouse tracking interactivo

### Características de Renderizado
- **Responsive**: Se redimensiona con la ventana
- **GPU Optimizado**: WebGL con antialias
- **Transparency**: Alpha blending para overlay
- **Wireframe Glow**: Bordes neon para profundidad
- **Performance**: requestAnimationFrame + GSAP

### Archivos
- `src/components/Hero3DScene.tsx` - Componente React
- Integrado en `src/app/page.tsx` (hero section background)

### Interactividad
- Mouse tracking: Rotación responsiva al cursor
- Resizable: Adapta resolution a viewport
- Continuous animation: Loop infinito suave

---

## 📋 Próximas Mejoras (Opcionales)

- [x] Three.js 3D element en hero (geometry/mesh paralax) ✅ **IMPLEMENTADO**
- [ ] Parallax float section con cursor tracking
- [ ] Video scroll scrub (con ffmpeg)
- [ ] SplitText animation para typography
- [ ] Más refinamiento en timing de stagger
- [ ] Mobile responsiveness ajustes
- [ ] Bloom/Glow post-processing effects (EffectComposer)

---

## 🧪 Testing

El proyecto ha sido compilado exitosamente:
- ✅ Build: Sin errores críticos
- ✅ Linting: Warnings limpiados
- ✅ Type Checking: Correcto
- ✅ All plugins registered: Sí

Para probar localmente:
```bash
npm run dev  # http://localhost:3000
```

Scroll por la página para ver todas las animaciones en acción.
