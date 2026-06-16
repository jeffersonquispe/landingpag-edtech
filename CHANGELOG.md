# Registro de Cambios (Changelog) - Net Academy

Este archivo documenta los cambios recientes y las actualizaciones realizadas en la plataforma de **Net Academy**.

---

## [1.1.0] - 2026-06-06

### Añadido
- **Nuevos Cursos de Inteligencia Artificial**: Se han integrado tres nuevos programas avanzados y de alta demanda al catálogo de cursos en `src/app/page.tsx`:
  1. **MLOps e Infraestructura de IA** (Nivel Avanzado): Enfocado en el despliegue, escalado y monitoreo de modelos y LLMs en la nube usando Kubernetes y pipelines de CI/CD.
  2. **Fine-Tuning y Personalización de LLMs** (Nivel Avanzado): Centrado en la personalización de modelos de lenguaje de código abierto mediante técnicas avanzadas como LoRA y QLoRA.
  3. **Gobernanza, Ética y Privacidad en IA** (Nivel Principiante): Orientado a marcos regulatorios internacionales (como la Ley de IA de la UE), mitigación de sesgos y privacidad corporativa.
- **Nuevos Assets Visuales**: Almacenamiento de imágenes de la mascota **Nano Banana** en el directorio `public/` para los nuevos cursos:
  - `public/nano_banana_mlops.png` (Mascota constructora de MLOps)
  - `public/nano_banana_finetuning.png` (Mascota experta en hardware para fine-tuning)
  - `public/nano_banana_ethics.png` (Mascota oficial protectora para ética y gobernanza)

### Modificado
- **Página de Inicio (`src/app/page.tsx`)**:
  - Se expandió la cuadrícula de cursos destacados para incluir las tres nuevas ofertas educativas, aumentando el catálogo a un total de 6 cursos.
  - Se mantuvo la coherencia visual con el diseño de neon branding, tarjetas de glassmorphism y microanimaciones interactivas.
- **Componente de Tarjeta de Cursos (`src/components/CourseCard.tsx`)**:
  - Ajustes sutiles para adaptar dinámicamente el estilo y color de los niveles de dificultad (Verde para *Principiante*, Cian para *Intermedio*, Rosa para *Avanzado*) y las categorías de los nuevos cursos.

---

## [1.0.0] - Lanzamiento Inicial

- **Estructura Base del Proyecto**: Proyecto desarrollado en Next.js con Tailwind CSS y TypeScript.
- **Diseño Premium**: Interfaz moderna basada en un tema oscuro, gradientes de neón fluorescentes y efecto de glassmorphism.
- **Secciones Principales**:
  - **Hero**: Con una simulación de terminal interactiva para el compilador de Nano Banana.
  - **Cursos Destacados**: Cuadrícula inicial con tres cursos esenciales (Fundamentos de IA, Desarrollo de Agentes con LLMs y Productividad Empresarial).
  - **Beneficios**: Tarjetas enfocadas en tres perfiles clave (Reconversión Laboral, Estudiantes y Equipos Corporativos).
  - **Planes de Precios**: Opciones flexibles (Curso Individual, Suscripción Anual Pro y Bootcamp/Enterprise).
  - **Lead Capture**: Formulario interactivo con suscripción de correo para obtener un minicurso gratuito.
